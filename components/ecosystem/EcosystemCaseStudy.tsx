import Link from 'next/link';

import PipelineDiagram from '@/components/ecosystem/PipelineDiagram';
import CaseStudyBody from '@/components/project/CaseStudyBody';
import Card from '@/components/ui/Card';
import Chip from '@/components/ui/Chip';
import SectionHeading from '@/components/ui/SectionHeading';
import StatTile from '@/components/ui/StatTile';
import StatusPill from '@/components/ui/StatusPill';
import TintedTag from '@/components/ui/TintedTag';
import { impactStats, pipeline, rebuilds, sharedPatterns } from '@/data/ecosystem';
import { projects } from '@/data/projects';
import type { Project } from '@/lib/types';

const STAT_ACCENTS = ['amber', 'blue', 'coral', 'violet', 'green'] as const;

/**
 * The ecosystem gets a bespoke case study: it is five applications over six
 * years, three of which its author later replaced, so the interactive pipeline
 * carries the story rather than a single screenshot.
 */
export default function EcosystemCaseStudy({ project }: { project: Project }) {
  const apps = [...pipeline, ...rebuilds]
    .map((node) => ({ node, project: projects.find((p) => p.slug === node.slug) }))
    .filter((entry): entry is { node: typeof entry.node; project: Project } =>
      Boolean(entry.project),
    );

  return (
    <div className="flex flex-col">
      <header>
        <nav aria-label="Breadcrumb" className="flex items-center gap-[9px] font-mono text-[12.5px] text-text-3">
          <Link href="/projects" className="text-text-3 hover:text-coral">
            Work
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-text-2">{project.name}</span>
        </nav>

        <div className="mt-7 flex flex-wrap items-center gap-2">
          <TintedTag accent="amber">{project.type}</TintedTag>
          <StatusPill status={project.status} />
        </div>

        <h1 className="mt-4 max-w-[24ch] font-display text-[32px] font-bold leading-[1.05] tracking-[-1.2px] sm:text-[42px] sm:tracking-[-1.5px] lg:text-[48px]">
          {project.name}
        </h1>

        <p className="mt-5 max-w-[68ch] text-[17px] text-text-2 sm:text-[18.5px]">
          {project.oneLiner}
        </p>

        {project.statusNote && (
          <p className="mt-3 font-mono text-[12.5px] text-amber">{project.statusNote}</p>
        )}
      </header>

      <div className="mt-10">
        {/* This IS the case study — the card's own link would point back at this page. */}
        <PipelineDiagram showCaseStudyLink={false} />
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-5">
        {impactStats.map((stat, i) => (
          <StatTile
            key={stat.label}
            value={stat.value}
            label={stat.label}
            accent={STAT_ACCENTS[i % STAT_ACCENTS.length]}
          />
        ))}
      </div>

      <section className="pt-20">
        <SectionHeading
          eyebrow="SHARED FOUNDATIONS"
          title="Four patterns, five applications"
          intro="The applications share deliberate architectural spines rather than duplicated code."
          accent="violet"
        />
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {sharedPatterns.map((pattern) => (
            <Card key={pattern.name} className="p-6">
              <h3 className="font-display text-[18px] font-bold tracking-[-0.3px]">
                {pattern.name}
              </h3>
              <p className="mt-2 text-[14.5px] text-text-2">{pattern.description}</p>
              <p className="mt-4 font-mono text-[11px] text-text-3">
                used by {pattern.usedBy.length} of 5 applications
              </p>
            </Card>
          ))}
        </div>
      </section>

      <section className="pt-20">
        <SectionHeading
          eyebrow="THE APPLICATIONS"
          title="Every piece, and what it does"
          /*
            The count reads 2 + 3 = 5 while the drawing shows 4 legacy nodes:
            the Child Growth Dashboard node covers both the C# desktop app and
            the PHP web dashboard, which were one product in two halves.

            "Replaced by rebuilds" (plural) was the claim this page kept making
            and the data kept contradicting — only one 2026 system superseded
            anything. See workspace/02-polishes/01 and 12.
          */
          intro="Two of the five originals are still in production. Three were retired in 2026 and absorbed into a single AI-orchestrated successor — Digital Evidence Centre — while two further systems shipped alongside the survivors rather than replacing them."
        />
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {apps.map(({ node, project: app }) => (
            <Card key={app.slug} href={`/projects/${app.slug}`} className="flex flex-col p-6">
              <div className="flex items-start justify-between gap-3">
                <h3 className="min-w-0 font-display text-[18px] font-bold tracking-[-0.3px] text-text">
                  {app.name}
                </h3>
                <StatusPill status={app.status} size="small" />
              </div>
              <p className="mt-[6px] font-mono text-[11px] text-text-3">{node.role}</p>
              {/* The substance, not the duel card's hook — both are on this page. */}
              <p className="mt-3 text-[14.5px] text-text-2">{node.detail ?? node.shortDesc}</p>
              <div className="mt-auto flex flex-wrap gap-[6px] pt-4">
                {app.techTags.slice(0, 4).map((tag) => (
                  <Chip key={tag} size="small">
                    {tag}
                  </Chip>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>

      <CaseStudyBody project={project} />
    </div>
  );
}
