import Card from '@/components/ui/Card';
import StatusPill from '@/components/ui/StatusPill';
import { TONE_DOT } from '@/lib/accent-classes';
import { STATUS_LEGEND } from '@/lib/project-display';
import type { Project } from '@/lib/types';
import { cn } from '@/lib/utils';

/**
 * The "and more" grid beneath the flagships, plus the status legend.
 *
 * The legend is the only place status honesty is stated — the section copy
 * shows it instead of announcing it.
 */
export default function ProjectIndexGrid({
  projects,
  total,
}: {
  projects: Project[];
  total: number;
}) {
  return (
    <div>
      <ul className="mb-6 flex flex-wrap gap-x-5 gap-y-2 text-[13.5px] text-text-2">
        {STATUS_LEGEND.map((entry) => (
          <li key={entry.tone} className="flex items-center gap-[7px]">
            <span className={cn('block size-2 shrink-0 rounded-full', TONE_DOT[entry.tone])} />
            {entry.label}
          </li>
        ))}
      </ul>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {projects.map((project) => (
          <Card
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="flex flex-col p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="min-w-0 font-display text-[16.5px] font-semibold leading-[1.25] tracking-[-0.3px] text-text">
                {project.name}
              </h3>
              <StatusPill status={project.status} size="small" />
            </div>
            <p className="mt-2 text-[13.5px] text-text-2">{project.type}</p>
            {/*
              Without this line the card is name + category: navigational, but no
              reason to click. Hooks are written short enough to land in two lines
              in a four-column row; the third line is headroom for a long project
              name pushing the card taller, not a licence to write longer hooks —
              a hook that truncates loses the number at its end, which was the
              whole point of it.
            */}
            {project.hook && (
              <p className="mt-2 line-clamp-3 text-[13px] leading-[1.45] text-text-3">
                {project.hook}
              </p>
            )}
            <p className="mt-auto pt-3 font-mono text-[11px] text-text-3">
              {project.techTags.slice(0, 3).join(' · ')}
            </p>
          </Card>
        ))}

        <Card
          href="/projects"
          className="flex flex-col justify-between bg-surface-2 p-5"
        >
          <h3 className="font-display text-[16.5px] font-semibold tracking-[-0.3px] text-text">
            All {total} projects
          </h3>
          <p className="mt-2 text-[13.5px] text-text-2">
            The full index, filterable by stack.
          </p>
          <span className="mt-auto pt-3 font-mono text-[11px] text-coral">browse →</span>
        </Card>
      </div>
    </div>
  );
}
