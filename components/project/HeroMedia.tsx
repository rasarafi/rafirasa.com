'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Play } from 'lucide-react';

/**
 * Case-study hero media. With a `video`, the thumbnail doubles as the poster
 * and a click swaps in a self-hosted, muted, captioned MP4 — nothing autoplays,
 * so reduced-motion readers and mobile data plans are both respected.
 */
export default function HeroMedia({
  name,
  thumbnail,
  objectPosition,
  video,
}: {
  name: string;
  thumbnail: string;
  objectPosition?: string;
  video?: string;
}) {
  const [playing, setPlaying] = useState(false);

  if (video && playing) {
    return (
      <video
        src={video}
        poster={thumbnail}
        autoPlay
        muted
        controls
        playsInline
        loop
        className="h-full w-full bg-black object-contain"
        aria-label={`${name} walkthrough`}
      />
    );
  }

  const img = (
    <Image
      src={thumbnail}
      alt={`${name} interface`}
      width={1200}
      height={675}
      priority
      className="h-full w-full object-cover"
      style={{ objectPosition: objectPosition ?? 'center' }}
    />
  );

  if (!video) return img;

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="group relative block h-full w-full cursor-pointer"
      aria-label={`Play ${name} walkthrough`}
    >
      {img}
      <span className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors group-hover:bg-black/25">
        <span className="flex items-center gap-2 rounded-full bg-bg/95 py-3 pl-4 pr-5 font-mono text-[13px] text-text shadow-[var(--shadow-lift)] transition-transform group-hover:scale-105">
          <Play size={16} className="fill-current" />
          Watch a 30-second walkthrough
        </span>
      </span>
    </button>
  );
}
