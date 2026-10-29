import { cn } from '@/lib/utils';

/** Neutral tech-stack tag. Deliberately quiet — accents are for status and kind. */
export default function Chip({
  children,
  size = 'default',
  className,
}: {
  children: React.ReactNode;
  size?: 'default' | 'small';
  className?: string;
}) {
  return (
    <span
      className={cn(
        'whitespace-nowrap rounded-[6px] bg-surface-2 font-mono text-text-2',
        size === 'small' ? 'px-[9px] py-[3px] text-[10.5px]' : 'px-[11px] py-[4px] text-[11.5px]',
        className,
      )}
    >
      {children}
    </span>
  );
}
