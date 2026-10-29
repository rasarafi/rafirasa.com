const LIMITS = {
  minute: { window: 60_000, max: 10 },
  hour: { window: 3_600_000, max: 50 },
  day: { window: 86_400_000, max: 200 },
};

// Backstop across all visitors, so rotating IPs cannot run up the API bill.
const GLOBAL_LIMITS = {
  hour: { window: 3_600_000, max: 300 },
  day: { window: 86_400_000, max: 1000 },
};

const store = new Map<string, number[]>();
let globalTimestamps: number[] = [];

// Clean up stale entries every 5 minutes
setInterval(() => {
  const cutoff = Date.now() - LIMITS.day.window;
  for (const [ip, timestamps] of store) {
    const filtered = timestamps.filter((t) => t > cutoff);
    if (filtered.length === 0) {
      store.delete(ip);
    } else {
      store.set(ip, filtered);
    }
  }
}, 300_000).unref?.();

// Production runs behind Cloudflare -> host Nginx -> this container (bound to
// 127.0.0.1). Nginx resolves the real client from Cloudflare's ranges and
// overwrites X-Real-IP, so that header is trusted. The first X-Forwarded-For
// entry is whatever the client sent, so it is never used; the last entry is
// the hop our own proxy appended.
export function getClientIP(request: Request): string {
  const headers = request.headers;
  const realIp = headers.get('x-real-ip');
  if (realIp) return realIp.trim();
  const forwarded = headers.get('x-forwarded-for');
  if (forwarded) {
    const hops = forwarded.split(',').map((h) => h.trim()).filter(Boolean);
    if (hops.length > 0) return hops[hops.length - 1];
  }
  return 'unknown';
}

type RateLimitResult = {
  allowed: boolean;
  retryAfter?: number;
};

export function checkRateLimit(ip: string): RateLimitResult {
  const now = Date.now();
  const timestamps = store.get(ip) ?? [];

  globalTimestamps = globalTimestamps.filter((t) => t > now - GLOBAL_LIMITS.day.window);
  for (const { window, max } of Object.values(GLOBAL_LIMITS)) {
    const recent = globalTimestamps.filter((t) => t > now - window);
    if (recent.length >= max) {
      const retryAfter = Math.ceil((recent[0] + window - now) / 1000);
      return { allowed: false, retryAfter: Math.max(retryAfter, 1) };
    }
  }

  // Check each window
  for (const [, { window, max }] of Object.entries(LIMITS)) {
    const cutoff = now - window;
    const recent = timestamps.filter((t) => t > cutoff);
    if (recent.length >= max) {
      const oldest = recent[0];
      const retryAfter = Math.ceil((oldest + window - now) / 1000);
      return { allowed: false, retryAfter: Math.max(retryAfter, 1) };
    }
  }

  // Allowed — record timestamp
  timestamps.push(now);
  globalTimestamps.push(now);

  // Trim timestamps older than 24h
  const dayCutoff = now - LIMITS.day.window;
  const cleaned = timestamps.filter((t) => t > dayCutoff);
  store.set(ip, cleaned);

  return { allowed: true };
}
