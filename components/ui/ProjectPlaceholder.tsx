import { ACCENT_GRADIENT, ACCENT_TEXT } from '@/lib/accent-classes';
import { accentFor, monogram } from '@/lib/project-display';
import { cn } from '@/lib/utils';

/**
 * Stand-in for a project with no screenshot.
 *
 * Ten of the twenty-four projects — including all three flagships — have
 * `thumbnail: ''`, so this is a default state rather than a rare fallback. It is
 * deliberately designed: a diagonal accent tint, a faint dot grid, and the
 * project's monogram in a raised badge. Bare oversized initials were tried and
 * read as an unfinished page.
 *
 * The accent is derived from the slug, so a project keeps its colour across
 * builds.
 */
export default function ProjectPlaceholder({
  name,
  slug,
  size = 'default',
  className,
}: {
  name: string;
  slug: string;
  size?: 'default' | 'large';
  className?: string;
}) {
  const accent = accentFor(slug);

  return (
    <div
      className={cn(
        'relative grid h-full w-full place-items-center bg-gradient-to-br to-surface-2',
        ACCENT_GRADIENT[accent],
        className,
      )}
      aria-hidden="true"
    >
      {/* Dot grid — pure decoration, keeps large empty tiles from looking blank. */}
      <span
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(var(--placeholder-dot) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      />
      <span
        className={cn(
          'relative grid place-items-center rounded-[16px] border border-line bg-surface font-display font-bold tracking-[-0.5px] shadow-[0_2px_10px_rgba(46,42,36,0.06)]',
          size === 'large' ? 'size-[78px] text-[27px]' : 'size-[62px] text-[22px]',
          ACCENT_TEXT[accent],
        )}
      >
        {monogram(name)}
      </span>
    </div>
  );
}
