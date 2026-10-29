import Image from 'next/image';

import CropFrame from '@/components/project/CropFrame';
import type { CompositePair } from '@/lib/composites';
import { cn } from '@/lib/utils';

/**
 * A base screen with one cropped detail from a *different* screen floating over
 * it — the signature element of the v5 case study.
 *
 * The float stacks below the base under 960px rather than overlapping: it must
 * stay `relative` there, never `static`. Going static removes the containing
 * block and the absolutely-positioned crop re-anchors to the section, escaping
 * its frame and blowing the page out horizontally.
 */
export default function Composite({
  pair,
  size = 'band',
  priority,
}: {
  pair: CompositePair;
  size?: 'hero' | 'band';
  priority?: boolean;
}) {
  const { base, float } = pair;

  return (
    <div className={cn('relative', float && 'md:pb-10')}>
      <div className="overflow-hidden rounded-[var(--radius)] border border-line bg-surface-2 shadow-[var(--shadow-lift)]">
        <Image
          src={base.src}
          alt={base.alt}
          width={base.width}
          height={base.height}
          priority={priority}
          sizes={size === 'hero' ? '(max-width: 960px) 100vw, 880px' : '(max-width: 960px) 100vw, 620px'}
          className="h-auto w-full"
        />
      </div>

      {float && (
        <CropFrame
          src={float.src}
          srcWidth={float.srcWidth}
          srcHeight={float.srcHeight}
          rect={float.rect}
          alt={float.alt}
          className={cn(
            'relative mt-4 rounded-[var(--radius-md)] border border-line shadow-[var(--shadow-lift)]',
            'md:absolute md:mt-0 md:w-[46%]',
            size === 'hero' ? 'md:-left-[6%] md:bottom-0' : 'md:-left-[8%] md:-bottom-2',
          )}
        />
      )}
    </div>
  );
}
