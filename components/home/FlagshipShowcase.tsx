import Image from 'next/image';
import Link from 'next/link';

import Card from '@/components/ui/Card';
import Chip from '@/components/ui/Chip';
import ProjectPlaceholder from '@/components/ui/ProjectPlaceholder';
import StatusPill from '@/components/ui/StatusPill';
import TintedTag from '@/components/ui/TintedTag';
import { ACCENT_TEXT } from '@/lib/accent-classes';
import { accentFor, needsPlaceholder } from '@/lib/project-display';
import type { Project } from '@/lib/types';
import { cn } from '@/lib/utils';

/** Two or three headline figures pulled per flagship. Hand-picked, not derived. */
const METRICS: Record<string, { value: string; label: string }[]> = {
  // Deliberately not "1M+ records" or "106K+ lines" — the stat band directly
  // above already says those, and a flagship card repeating one reads as padding.
  // Outcome numbers only — no LOC/commit/test counts; the audience includes
  // non-technical clients and recruiters.
  'mis-dash-web': [
    { value: '2 → 6', label: 'field programmes served' },
    { value: '62', label: 'real questions in its release test' },
    { value: '0', label: 'numbers written by the AI' },
  ],
  'titan-platform': [
    { value: '3', label: 'audiences, one system' },
    { value: '19', label: 'real projects migrated' },
    { value: 'Jul 2026', label: 'live since' },
  ],
  jarvis: [
    { value: '25', label: 'projects tracked' },
    { value: '5 min', label: 'two-way phone sync' },
    { value: '3', label: 'other projects reuse its skills' },
  ],
};

function Visual({ project }: { project: Project }) {
  if (needsPlaceholder(project)) {
    return <ProjectPlaceholder name={project.name} slug={project.slug} size="large" />;
  }
  return (
    <Image
      src={project.images.thumbnail}
      alt={`${project.name} interface`}
      width={1200}
      height={675}
      className="h-full w-full object-cover"
      style={{ objectPosition: project.images.objectPosition ?? 'center' }}
    />
  );
}

/**
 * One flagship per row, alternating which side the visual sits on.
 *
 * Digital Evidence Centre and Titan have real screenshots; Jarvis has none yet, so the
 * designed placeholder is a normal path here rather than a gap to apologise for.
 */
export default function FlagshipShowcase({
  project,
  flip,
}: {
  project: Project;
  flip: boolean;
}) {
  const accent = accentFor(project.slug);
  const metrics = METRICS[project.slug] ?? [];

  return (
    <Card
      as="article"
      interactive
      className="grid gap-8 p-6 sm:p-9 lg:grid-cols-2 lg:items-center lg:gap-11"
    >
      <div className={cn('min-w-0', flip && 'lg:order-2')}>
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <TintedTag accent={accent}>{project.type}</TintedTag>
          <StatusPill status={project.status} size="small" />
        </div>

        <h3 className="font-display text-[24px] font-bold leading-[1.1] tracking-[-0.7px] sm:text-[29px]">
          <Link href={`/projects/${project.slug}`} className="text-text hover:text-coral">
            {project.name}
          </Link>
        </h3>

        <p className="mt-3 text-[15.5px] text-text-2">{project.oneLiner}</p>

        {project.statusNote && (
          <p className="mt-3 font-mono text-[12.5px] text-text-3">{project.statusNote}</p>
        )}

        {metrics.length > 0 && (
          <dl className="mt-5 flex flex-wrap gap-x-7 gap-y-3">
            {metrics.map((m) => (
              <div key={m.label}>
                <dt className="sr-only">{m.label}</dt>
                <dd>
                  <span
                    className={cn(
                      'block font-display text-[22px] font-bold leading-[1.2]',
                      ACCENT_TEXT[accent],
                    )}
                  >
                    {m.value}
                  </span>
                  <span className="text-[12.5px] text-text-3">{m.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        )}

        <div className="mt-5 flex flex-wrap gap-[7px]">
          {project.techTags.slice(0, 6).map((tag) => (
            <Chip key={tag}>{tag}</Chip>
          ))}
        </div>

        <Link
          href={`/projects/${project.slug}`}
          className="mt-6 inline-flex items-center gap-2 font-mono text-[13px] text-coral hover:underline hover:underline-offset-4"
        >
          Read the case study
          <span aria-hidden="true">→</span>
        </Link>
      </div>

      <div
        className={cn(
          'aspect-[16/10] overflow-hidden rounded-[var(--radius)] border border-line',
          flip && 'lg:order-1',
        )}
      >
        <Visual project={project} />
      </div>
    </Card>
  );
}
