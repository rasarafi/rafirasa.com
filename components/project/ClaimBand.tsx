import Composite from '@/components/project/Composite';
import type { CompositePair } from '@/lib/composites';
import { cn } from '@/lib/utils';

/**
 * One claim paired with a composited mockup — the page's argument is "look at
 * the actual product", so no claim appears without its screen.
 *
 * Bands alternate side by index. Copy always comes first in the DOM so the
 * reading order is claim-then-picture on a screen reader and on mobile,
 * regardless of which side the picture sits on visually.
 */
export default function ClaimBand({
  pair,
  index,
  eyebrow,
}: {
  pair: CompositePair;
  index: number;
  eyebrow?: string;
}) {
  const flipped = index % 2 === 1;

  return (
    <section
      data-band
      className="grid items-center gap-9 pt-16 sm:pt-20 lg:grid-cols-[1fr_1.15fr] lg:gap-16 lg:pt-[96px]"
    >
      <div className={cn('min-w-0', flipped && 'lg:order-2')}>
        {eyebrow && (
          <p className="mb-3 font-mono text-[11.5px] tracking-[0.6px] text-text-3">{eyebrow}</p>
        )}
        <h2 className="font-display text-[26px] font-bold leading-[1.12] tracking-[-0.9px] sm:text-[31px] lg:text-[34px] lg:tracking-[-1.1px]">
          {pair.base.title}
        </h2>
        <p className="mt-4 max-w-[46ch] text-[16.5px] text-text-2">{pair.base.caption}</p>
      </div>

      <div className={cn('min-w-0', flipped && 'lg:order-1')}>
        <Composite pair={pair} size="band" />
      </div>
    </section>
  );
}
