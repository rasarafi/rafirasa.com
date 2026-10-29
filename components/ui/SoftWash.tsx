import { cn } from '@/lib/utils';

type WashSpec = {
  className: string;
  color: string;
  /** Seconds — staggered so the blobs never drift in lockstep. */
  duration: number;
};

const WASHES: Record<'page' | 'section' | 'mesh', WashSpec[]> = {
  page: [
    { className: 'w-[620px] h-[460px] -top-[180px] left-[52%]', color: 'var(--wash-coral)', duration: 18 },
    { className: 'w-[520px] h-[400px] top-[60px] -left-[160px]', color: 'var(--wash-blue)', duration: 22 },
    { className: 'w-[460px] h-[380px] top-[620px] -right-[140px]', color: 'var(--wash-amber)', duration: 26 },
  ],
  section: [
    { className: 'w-[520px] h-[380px] -top-[140px] left-[46%]', color: 'var(--wash-blue)', duration: 20 },
    { className: 'w-[420px] h-[320px] top-[120px] -left-[140px]', color: 'var(--wash-coral)', duration: 24 },
  ],
  mesh: [
    { className: 'w-[720px] h-[520px] -top-[190px] -left-[90px]', color: 'var(--wash-coral)', duration: 19 },
    { className: 'w-[640px] h-[480px] -top-[140px] left-[34%]', color: 'var(--wash-violet)', duration: 23 },
    { className: 'w-[560px] h-[460px] top-[60px] -right-[140px]', color: 'var(--wash-blue)', duration: 27 },
    { className: 'w-[520px] h-[380px] top-[330px] left-[8%]', color: 'var(--wash-amber)', duration: 31 },
  ],
};

/**
 * Slow-drifting blurred colour washes behind the page — the warm counterpart to
 * the neon glows in the rejected dark "Aurora" direction.
 *
 * Purely decorative and `pointer-events-none`. Motion is disabled under
 * `prefers-reduced-motion` unless the reader opted back in with `?motion=force`
 * (see globals.css).
 */
export default function SoftWash({
  variant = 'page',
  className,
}: {
  variant?: 'page' | 'section' | 'mesh';
  className?: string;
}) {
  return (
    <div
      className={cn('pointer-events-none absolute inset-0 -z-10 overflow-hidden', className)}
      aria-hidden="true"
    >
      {WASHES[variant].map((wash, i) => (
        <span
          key={i}
          className={cn('absolute block rounded-full blur-[100px] wash-drift', wash.className)}
          style={{ background: wash.color, animationDuration: `${wash.duration}s` }}
        />
      ))}
    </div>
  );
}
