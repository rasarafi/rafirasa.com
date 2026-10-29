import Link from 'next/link';

import EcosystemMiniPipeline from './EcosystemMiniPipeline';
import Card from '@/components/ui/Card';
import StatusPill from '@/components/ui/StatusPill';
import TintedTag from '@/components/ui/TintedTag';
import { impactStats } from '@/data/ecosystem';
import type { Project } from '@/lib/types';

/**
 * Full-width feature tile for the ecosystem, sitting above the filtered grid.
 *
 * It gets its own treatment because it is not one project — it is five
 * applications over six years, and the only entry with child case studies.
 */
export default function EcosystemFeature({ project }: { project: Project }) {
  return (
    <Card
      as="section"
      interactive
      className="grid grid-cols-1 items-center gap-7 p-6 sm:p-9 lg:grid-cols-[1fr_440px] lg:gap-11"
    >
      <div>
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <TintedTag accent="amber">{project.type}</TintedTag>
          <StatusPill status={project.status} size="small" />
        </div>

        <h2 className="font-display text-[24px] font-bold leading-[1.1] tracking-[-0.7px] sm:text-[30px]">
          <Link href={`/projects/${project.slug}`} className="text-text hover:text-coral">
            {project.name}
          </Link>
        </h2>

        <p className="mt-3 max-w-[76ch] text-[15.5px] text-text-2">{project.oneLiner}</p>

        {project.statusNote && (
          <p className="mt-2 font-mono text-[12px] text-amber">{project.statusNote}</p>
        )}

        <dl className="mt-6 flex flex-wrap gap-x-6 gap-y-4">
          {impactStats.map((stat) => (
            <div key={stat.label}>
              <dd className="font-display text-[22px] font-bold leading-[1.15] text-amber">
                {stat.value}
              </dd>
              <dt className="mt-[2px] text-[12.5px] text-text-3">{stat.label}</dt>
            </div>
          ))}
        </dl>

        <Link
          href={`/projects/${project.slug}`}
          className="mt-6 inline-flex items-center gap-2 font-mono text-[13px] text-coral hover:underline hover:underline-offset-4"
        >
          {/*
            Not "all five applications": the case study and the duel card now span
            both eras, so a bare count contradicts whichever surface you read second.
          */}
          Explore the full pipeline
          <span aria-hidden="true">→</span>
        </Link>
      </div>

      {/* The drawing leads on narrow screens, as in the approved mock. */}
      <div className="-order-1 overflow-hidden rounded-[var(--radius-md)] border border-line lg:order-none">
        <EcosystemMiniPipeline />
      </div>
    </Card>
  );
}
