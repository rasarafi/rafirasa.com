'use client';

import { useEffect, useState } from 'react';

/**
 * Follows the reader down a long page so the primary action is always one click
 * away. Appears only once the hero's own actions have left the viewport, so the
 * two are never on screen together.
 *
 * The label matches the hero button exactly — one label per intent.
 */
export default function StickyActionBar({
  name,
  liveHref,
  watchSelector,
}: {
  name: string;
  liveHref?: string;
  watchSelector: string;
}) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const target = document.querySelector(watchSelector);
    if (!target) return;
    const io = new IntersectionObserver(
      ([entry]) => setShown(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { rootMargin: '-8px 0px 0px 0px' },
    );
    io.observe(target);
    return () => io.disconnect();
  }, [watchSelector]);

  if (!liveHref) return null;

  return (
    <div
      data-sticky-bar
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-[var(--nav-bg)] backdrop-blur-[14px] transition-transform duration-300"
      style={{ transform: shown ? 'none' : 'translateY(102%)' }}
      aria-hidden={!shown}
    >
      <div className="mx-auto flex max-w-[1120px] items-center gap-4 px-5 py-3 sm:px-6 lg:px-10">
        <span className="min-w-0 truncate font-display text-[15px] font-semibold">{name}</span>
        <a
          href={liveHref}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={shown ? 0 : -1}
          className="ml-auto shrink-0 rounded-full bg-coral px-[22px] py-[10px] text-[14.5px] font-semibold text-white transition-opacity hover:opacity-90"
        >
          Visit the live site
        </a>
      </div>
    </div>
  );
}
