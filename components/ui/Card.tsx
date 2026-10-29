import Link from 'next/link';

import { cn } from '@/lib/utils';

type CardProps = {
  children: React.ReactNode;
  className?: string;
  /** Renders the card as a link and enables the hover lift. */
  href?: string;
  /** Hover lift without a link — for cards whose action lives inside. */
  interactive?: boolean;
  as?: 'div' | 'article' | 'section';
};

const BASE =
  'rounded-[var(--radius-lg)] border border-line bg-surface shadow-[var(--shadow)]';

const HOVER =
  'transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-[3px] hover:border-line-strong hover:shadow-[var(--shadow-lift)] motion-reduce:hover:translate-y-0';

/**
 * The surface every panel on the site is built from — see the Biscuit Aurora
 * spec. Pass `href` for a whole-card link, `interactive` for hover feedback
 * without navigation.
 */
export default function Card({
  children,
  className,
  href,
  interactive = false,
  as = 'div',
}: CardProps) {
  if (href) {
    return (
      <Link href={href} className={cn(BASE, HOVER, 'block', className)}>
        {children}
      </Link>
    );
  }

  const Tag = as;
  return <Tag className={cn(BASE, interactive && HOVER, className)}>{children}</Tag>;
}
