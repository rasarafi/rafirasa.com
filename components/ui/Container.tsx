import { cn } from '@/lib/utils';

/** The single page gutter. Every full-width section wraps its content in this. */
export default function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('mx-auto w-full max-w-[1120px] px-5 sm:px-6 lg:px-7', className)}>
      {children}
    </div>
  );
}
