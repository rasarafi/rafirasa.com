import { TONE_BG, TONE_DOT, TONE_TEXT } from '@/lib/accent-classes';
import { statusLabel, statusTone } from '@/lib/project-display';
import type { ProjectStatus } from '@/lib/types';
import { cn } from '@/lib/utils';

/**
 * Honest lifecycle label. Colour comes from the status' tone, so "live" can
 * never accidentally render in the same green as "demo".
 */
export default function StatusPill({
  status,
  size = 'default',
  className,
}: {
  status: ProjectStatus;
  size?: 'default' | 'small';
  className?: string;
}) {
  const tone = statusTone(status);

  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center gap-[6px] whitespace-nowrap rounded-full font-mono font-medium',
        size === 'small' ? 'px-[9px] py-[3px] text-[10.5px]' : 'px-[11px] py-[4px] text-[11.5px]',
        TONE_BG[tone],
        TONE_TEXT[tone],
        className,
      )}
    >
      <span className={cn('block size-[6px] shrink-0 rounded-full', TONE_DOT[tone])} />
      {statusLabel(status)}
    </span>
  );
}
