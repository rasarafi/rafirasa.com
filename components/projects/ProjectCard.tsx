import Image from 'next/image';

import Card from '@/components/ui/Card';
import Chip from '@/components/ui/Chip';
import ProjectPlaceholder from '@/components/ui/ProjectPlaceholder';
import StatusPill from '@/components/ui/StatusPill';
import type { Project } from '@/lib/types';
import { cn } from '@/lib/utils';

type Variant = 'lead' | 'flagship' | 'standard' | 'minor';

/**
 * Gallery card. Three visual weights plus a full-width "lead" used for the first
 * flagship so three flagships tile cleanly across a six-column grid (6 + 3 + 3);
 * hanging them all at span-3 left the third stranded beside a large gap.
 *
 * Minor projects intentionally have no thumbnail area — they are real work but
 * not worth a screenshot's worth of attention.
 */
export default function ProjectCard({
  project,
  variant,
}: {
  project: Project;
  variant: Variant;
}) {
  const showVisual = variant !== 'minor';
  const hasThumb = Boolean(project.images.thumbnail);
  const isLead = variant === 'lead';

  return (
    <Card
      href={`/projects/${project.slug}`}
      className={cn(
        'flex min-w-0 flex-col overflow-hidden !p-0',
        isLead && 'lg:flex-row',
      )}
    >
      {showVisual && (
        <div
          className={cn(
            'relative shrink-0 overflow-hidden border-line',
            isLead
              ? 'aspect-[16/9] border-b lg:aspect-auto lg:w-[46%] lg:border-b-0 lg:border-r'
              : 'aspect-[16/9] border-b',
          )}
        >
          {hasThumb ? (
            <Image
              src={project.images.thumbnail}
              alt={`${project.name} interface`}
              fill
              className="object-cover"
              style={{ objectPosition: project.images.objectPosition ?? 'center' }}
              sizes="(min-width: 1024px) 520px, 100vw"
            />
          ) : (
            <ProjectPlaceholder
              name={project.name}
              slug={project.slug}
              size={isLead ? 'large' : 'default'}
            />
          )}
        </div>
      )}

      <div
        className={cn(
          'flex min-w-0 flex-1 flex-col',
          isLead ? 'p-7 sm:p-9 lg:justify-center' : variant === 'minor' ? 'p-5' : 'p-5 sm:p-[22px]',
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <h3
            className={cn(
              'min-w-0 font-display font-bold tracking-[-0.4px] text-text',
              isLead
                ? 'text-[23px] leading-[1.15] sm:text-[27px] sm:tracking-[-0.7px]'
                : variant === 'flagship'
                  ? 'text-[20px] leading-[1.2]'
                  : 'text-[16.5px] leading-[1.25]',
            )}
          >
            {project.name}
          </h3>
          <StatusPill status={project.status} size="small" />
        </div>

        <p className="mt-[6px] font-mono text-[11px] text-text-3">{project.type}</p>

        <p
          className={cn(
            'mt-3 text-text-2',
            isLead ? 'text-[15.5px]' : variant === 'minor' ? 'text-[13.5px]' : 'text-[14px]',
          )}
        >
          {project.oneLiner}
        </p>

        <div className="mt-auto flex flex-wrap gap-[6px] pt-4">
          {project.techTags.slice(0, isLead ? 6 : 3).map((tag) => (
            <Chip key={tag} size="small">
              {tag}
            </Chip>
          ))}
        </div>
      </div>
    </Card>
  );
}
