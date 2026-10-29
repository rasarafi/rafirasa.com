import { ACCENT_TEXT } from '@/lib/accent-classes';
import type { Accent } from '@/lib/project-display';
import { cn } from '@/lib/utils';

/**
 * A single headline number with its label. Used in the home stat band and the
 * case-study "at a glance" figures.
 */
export default function StatTile({
  value,
  label,
  accent,
  bare = false,
  className,
}: {
  value: string;
  label: string;
  accent: Accent;
  /** Drop the card chrome — for tiles already inside a panel. */
  bare?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        !bare && 'rounded-[var(--radius)] border border-line bg-surface px-[22px] py-5',
        className,
      )}
    >
      <div
        className={cn(
          'font-display text-[34px] font-bold leading-[1.1] tracking-[-1px]',
          ACCENT_TEXT[accent],
        )}
      >
        {value}
      </div>
      <div className="mt-[2px] text-[13.5px] text-text-2">{label}</div>
    </div>
  );
}
