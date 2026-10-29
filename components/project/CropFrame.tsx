import Image from 'next/image';

import { cn } from '@/lib/utils';
import type { CropRect } from '@/lib/types';

/**
 * Shows one rectangle of a source image, scaled to fill the frame.
 *
 * The maths: to show `rect` of a `srcWidth`-wide image, the image is blown up to
 * `srcWidth / rect.w` of the frame and shifted left/up by the rect's origin
 * expressed as a fraction of the rect — so both offsets are percentages of the
 * frame's own box, which CSS resolves for us.
 *
 * `max-w-none` is load-bearing: the global `img { max-width: 100% }` reset
 * silently clamps the deliberately oversized image and the crop renders short.
 */
export default function CropFrame({
  src,
  srcWidth,
  srcHeight,
  rect,
  alt,
  className,
  priority,
}: {
  src: string;
  srcWidth: number;
  srcHeight: number;
  rect: CropRect;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={cn('relative overflow-hidden bg-surface-2', className)}
      style={{ aspectRatio: `${rect.w} / ${rect.h}` }}
    >
      <Image
        src={src}
        alt={alt}
        width={srcWidth}
        height={srcHeight}
        priority={priority}
        className="absolute max-w-none"
        style={{
          width: `${(srcWidth / rect.w) * 100}%`,
          height: 'auto',
          left: `${-(rect.x / rect.w) * 100}%`,
          top: `${-(rect.y / rect.h) * 100}%`,
        }}
      />
    </div>
  );
}
