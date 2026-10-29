import { ACCENT_TEXT } from '@/lib/accent-classes';
import type { Accent } from '@/lib/project-display';
import { cn } from '@/lib/utils';

/**
 * Eyebrow + heading + optional intro. The eyebrow is a mono accent label; it
 * exists to name the section, not to decorate it, so it carries real words
 * ("THE HARD PARTS") rather than a number.
 */
export default function SectionHeading({
  eyebrow,
  title,
  intro,
  accent = 'coral',
  align = 'left',
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  accent?: Accent;
  align?: 'left' | 'center';
  className?: string;
}) {
  return (
    <div className={cn(align === 'center' && 'text-center', className)}>
      {eyebrow && (
        <p
          className={cn(
            'mb-[10px] font-mono text-[12px] tracking-[0.6px]',
            ACCENT_TEXT[accent],
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-[28px] font-bold leading-[1.1] tracking-[-1px] sm:text-[33px] lg:text-[38px] lg:tracking-[-1.2px]">
        {title}
      </h2>
      {intro && (
        <p
          className={cn(
            'mt-[10px] text-[16.5px] text-text-2',
            align === 'center' ? 'mx-auto max-w-[62ch]' : 'max-w-[68ch]',
          )}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
