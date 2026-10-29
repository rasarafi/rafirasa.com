import Card from '@/components/ui/Card';
import type { Project } from '@/lib/types';
import { cn } from '@/lib/utils';

/** Previous/next across the visible projects only — hidden sub-apps are skipped. */
export default function CaseStudyNav({
  prev,
  next,
}: {
  prev: Project | null;
  next: Project | null;
}) {
  if (!prev && !next) return null;

  return (
    <nav aria-label="More projects" className="mt-20 grid gap-5 sm:grid-cols-2">
      {prev ? (
        <Card href={`/projects/${prev.slug}`} className="p-6">
          <p className="mb-[7px] font-mono text-[11.5px] text-text-3">← PREVIOUS</p>
          <p className="font-display text-[19px] font-bold tracking-[-0.4px] text-text">
            {prev.name}
          </p>
          <p className="mt-1 text-[13.5px] text-text-2">{prev.type}</p>
        </Card>
      ) : (
        <span aria-hidden="true" className="hidden sm:block" />
      )}

      {next && (
        <Card
          href={`/projects/${next.slug}`}
          className={cn('p-6 sm:text-right', !prev && 'sm:col-start-2')}
        >
          <p className="mb-[7px] font-mono text-[11.5px] text-text-3">NEXT →</p>
          <p className="font-display text-[19px] font-bold tracking-[-0.4px] text-text">
            {next.name}
          </p>
          <p className="mt-1 text-[13.5px] text-text-2">{next.type}</p>
        </Card>
      )}
    </nav>
  );
}
