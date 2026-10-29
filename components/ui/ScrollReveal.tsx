'use client';

import { motion } from 'framer-motion';

import { useMotionEnabled } from '@/lib/use-motion';

/**
 * Fades and lifts its children into view once.
 *
 * Two failure modes this guards against, both found by rendering the real page:
 *
 * 1. **Content stuck invisible.** The previous version used `useInView` with a
 *    negative root margin and drove `animate` from its result, so anything the
 *    observer never reported — the section just below the hero on load, a
 *    full-page screenshot, a crawler or print run that never scrolls, or a JS
 *    failure after hydration — stayed at `opacity: 0` permanently. `whileInView`
 *    performs an intersection check on mount, so above-the-fold content reveals
 *    immediately, and `once` keeps it revealed.
 * 2. **Frozen motion for the author.** `prefers-reduced-motion` is honoured via
 *    useMotionEnabled(), which also respects the `?motion=force` override.
 *
 * A small positive `amount` (rather than a negative margin) means an element only
 * needs to be slightly visible to reveal, which keeps the effect from feeling
 * laggy on tall sections.
 */
export default function ScrollReveal({
  children,
  delay = 0,
  width = 'full',
}: {
  children: React.ReactNode;
  delay?: number;
  width?: 'full' | 'auto';
}) {
  const motionEnabled = useMotionEnabled();
  const className = width === 'full' ? 'w-full' : '';

  if (!motionEnabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
