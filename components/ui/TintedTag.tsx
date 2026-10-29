import { ACCENT_BG, ACCENT_TEXT } from '@/lib/accent-classes';
import type { Accent } from '@/lib/project-display';
import { cn } from '@/lib/utils';

/**
 * Accent-tinted label for a project's kind (e.g. "analytics platform · live").
 * Distinct from StatusPill: this describes what a thing *is*, not its lifecycle.
 */
export default function TintedTag({
  children,
  accent,
  className,
}: {
  children: React.ReactNode;
  accent: Accent;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-[7px] rounded-full px-[13px] py-[5px] font-mono text-[12px]',
        ACCENT_BG[accent],
        ACCENT_TEXT[accent],
        className,
      )}
    >
      {children}
    </span>
  );
}
