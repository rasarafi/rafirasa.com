/**
 * Placeholder shaped like the screen it replaces, so nothing shifts when the
 * image lands. `ratio` is required, not defaulted: screen windows are no
 * longer a uniform 16:9 now that the capture padding is gone — the real data
 * splits between 1200×675 (1.778) and 956×576 (1.660) captures, so any
 * default would be wrong for a real fraction of screens and would itself
 * cause the layout shift this component exists to prevent. Callers always
 * have the real `Screenshot`'s `width`/`height` and must pass `width /
 * height`.
 *
 * Not yet wired into a live loading path — it is built and shown in
 * `/design-system` per the brief, but nothing in the case-study template
 * renders it during an actual load today. Its presence here is not evidence
 * that a loading state is handled.
 */
export default function ScreenSkeleton({ ratio }: { ratio: number }) {
  return (
    <div
      className="w-full animate-pulse rounded-[var(--radius)] border border-line bg-surface-2 motion-reduce:animate-none"
      style={{ aspectRatio: String(ratio) }}
      aria-hidden="true"
    />
  );
}
