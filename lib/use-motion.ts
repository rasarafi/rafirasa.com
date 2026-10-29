'use client';

import { useSyncExternalStore } from 'react';
import { useReducedMotion } from 'framer-motion';

/** The attribute is set once by the boot script and never changes afterwards. */
const subscribe = () => () => {};

const readForced = () =>
  typeof document !== 'undefined' &&
  document.documentElement.getAttribute('data-motion') === 'force';

/**
 * Whether Framer Motion animations should play.
 *
 * Framer's own `useReducedMotion()` only reads the media query, so on this
 * machine — whose OS reports `prefers-reduced-motion: reduce` — every animation
 * stays frozen and the author can never see their own work. This ORs in the
 * `?motion=force` override that the boot script records on <html>.
 *
 * `useSyncExternalStore` is used rather than an effect so there is no setState
 * during render, no cascading re-render, and a defined server snapshot (false),
 * which keeps hydration stable.
 */
export function useMotionEnabled(): boolean {
  const forced = useSyncExternalStore(subscribe, readForced, () => false);
  const prefersReduced = useReducedMotion();
  return forced || !prefersReduced;
}
