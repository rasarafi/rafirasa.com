import { createHash } from 'node:crypto';

const SUSPICIOUS_PATTERNS: { pattern: RegExp; label: string }[] = [
  { pattern: /ignore\s+(previous|your|all)\s+instructions/i, label: 'ignore-instructions' },
  { pattern: /forget\s+(your|all)\s+rules/i, label: 'forget-rules' },
  { pattern: /system\s*prompt/i, label: 'system-prompt-probe' },
  { pattern: /you\s+are\s+now/i, label: 'persona-override' },
  { pattern: /pretend\s+(you\s+are|to\s+be)/i, label: 'pretend-as' },
  { pattern: /act\s+as\s+(a|an|if)/i, label: 'act-as' },
  { pattern: /\bDAN\b/, label: 'DAN-jailbreak' },
  { pattern: /jailbreak/i, label: 'jailbreak' },
  { pattern: /what\s+are\s+your\s+instructions/i, label: 'instructions-probe' },
  { pattern: /reveal\s+(your|the)\s+(prompt|instructions|rules)/i, label: 'reveal-prompt' },
  { pattern: /repeat\s+(your|the)\s+(instructions|prompt|rules)/i, label: 'repeat-prompt' },
];

// Logs keep a short one-way hash of the IP and the message length, not the
// message itself, so abuse can be spotted without storing visitors' words.
export function pseudonymise(ip: string): string {
  return createHash('sha256')
    .update(ip + (process.env.LOG_SALT ?? ''))
    .digest('hex')
    .slice(0, 12);
}

export function checkSuspiciousInput(content: string, ip: string): void {
  for (const { pattern, label } of SUSPICIOUS_PATTERNS) {
    if (pattern.test(content)) {
      console.warn(
        `[CHAT-MONITOR] ${new Date().toISOString()} client:${pseudonymise(ip)} pattern:${label} len:${content.length}`
      );
      return; // Log only the first match
    }
  }
}
