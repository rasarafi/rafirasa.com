import Image from 'next/image';
import Link from 'next/link';

import Composite from '@/components/project/Composite';
import HeroMedia from '@/components/project/HeroMedia';
import Card from '@/components/ui/Card';
import ProjectPlaceholder from '@/components/ui/ProjectPlaceholder';
import StatusPill from '@/components/ui/StatusPill';
import TintedTag from '@/components/ui/TintedTag';
import type { CompositePair } from '@/lib/composites';
import { accentFor } from '@/lib/project-display';
import type { Project } from '@/lib/types';

/**
 * Case-study header: breadcrumb, kind and status, title, one-liner, the live
 * link where one honestly exists, and a highlights card in the right column.
 *
 * Sub-apps get a breadcrumb back to their parent plus a context note, since they
 * are reachable only from the ecosystem case study.
 */
export default function CaseStudyHeader({
  project,
  parent,
  heroPair,
}: {
  project: Project;
  parent: Project | null;
  heroPair: CompositePair | null;
}) {
  const accent = accentFor(project.slug);

  return (
    <header>
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-[9px] font-mono text-[12.5px] text-text-3">
        <Link href="/projects" className="text-text-3 hover:text-coral">
          Work
        </Link>
        {parent && (
          <>
            <span aria-hidden="true">/</span>
            <Link href={`/projects/${parent.slug}`} className="text-text-3 hover:text-coral">
              {parent.name}
            </Link>
          </>
        )}
        <span aria-hidden="true">/</span>
        <span className="text-text-2">{project.name}</span>
      </nav>

      <div className="mt-7 grid gap-9 lg:grid-cols-[1fr_360px] lg:gap-14">
        <div className="min-w-0">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <TintedTag accent={accent}>{project.type}</TintedTag>
            <StatusPill status={project.status} />
          </div>

          <h1 className="font-display text-[32px] font-bold leading-[1.05] tracking-[-1.2px] [overflow-wrap:anywhere] sm:text-[42px] sm:tracking-[-1.5px] lg:text-[48px]">
            {project.name}
          </h1>

          <p className="mt-5 max-w-[64ch] text-[17px] text-text-2 sm:text-[18.5px]">
            {project.oneLiner}
          </p>

          {project.statusNote && (
            <p className="mt-3 font-mono text-[12.5px] text-text-3">{project.statusNote}</p>
          )}

          {parent && (
            <p className="mt-5 rounded-[var(--radius)] border border-line bg-surface-2 px-5 py-4 text-[14.5px] text-text-2">
              One of five applications in the{' '}
              <Link href={`/projects/${parent.slug}`} className="text-coral hover:underline">
                {parent.name}
              </Link>
              .
            </p>
          )}

          <div id="hero-actions" className="mt-7 flex flex-wrap gap-3">
            {project.links?.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-coral px-[22px] py-[11px] text-[14.5px] font-semibold text-white transition-opacity hover:opacity-90"
              >
                Visit the live site
              </a>
            )}
            {project.links?.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-[22px] py-[11px] text-[14.5px] font-semibold text-text transition-colors hover:border-line-strong"
              >
                Source
              </a>
            )}
          </div>
        </div>

        {project.highlights.length > 0 && (
          <Card className="p-6 lg:self-start">
            <h2 className="mb-4 font-mono text-[11.5px] tracking-[0.6px] text-text-3">
              WHO USES IT
            </h2>
            <ul className="flex flex-col gap-[13px]">
              {project.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-[10px] text-[14.5px] text-text-2">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    className="mt-[4px] shrink-0"
                    aria-hidden="true"
                  >
                    <circle cx="8" cy="8" r="8" fill="var(--green-bg)" />
                    <path
                      d="M5 8.5l2 2 4-4.5"
                      stroke="var(--green)"
                      strokeWidth="1.8"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                  {highlight}
                </li>
              ))}
            </ul>
          </Card>
        )}
      </div>

      {/*
        Video wins over the composite where one exists: HeroMedia's click-to-play
        walkthrough (jarvis, mis-dash-web, funded-academy-platform,
        titan-platform) is a shipped feature the composite would otherwise
        silently replace, since no project has an authored `detail` crop yet and
        a bare composite looks identical to a plain screenshot. This is a
        deliberate staging call, not an oversight — once detail crops exist, the
        two treatments should merge into one (a play overlay on a composited
        base) rather than staying a video/composite fork forever.
      */}
      <div className="mt-11">
        {project.images.video ? (
          <div className="aspect-[16/9] overflow-hidden rounded-[var(--radius-lg)] border border-line shadow-[var(--shadow-lift)]">
            <HeroMedia
              name={project.name}
              thumbnail={project.images.thumbnail}
              objectPosition={project.images.objectPosition}
              video={project.images.video}
            />
          </div>
        ) : heroPair ? (
          <Composite pair={heroPair} size="hero" priority />
        ) : project.images.thumbnail ? (
          // A project with a real thumbnail but no screens (so no composite is
          // possible) still deserves its screenshot over the monogram tile.
          // No project hits this today — only the ecosystem has zero screens,
          // and it renders through the bespoke EcosystemCaseStudy layout,
          // which never reaches this component — but the contract shouldn't
          // silently narrow to video/composite/placeholder-only.
          <div className="relative aspect-[16/9] overflow-hidden rounded-[var(--radius-lg)] border border-line shadow-[var(--shadow-lift)]">
            <Image
              src={project.images.thumbnail}
              alt={`${project.name} interface`}
              fill
              priority
              className="object-cover"
              style={{ objectPosition: project.images.objectPosition ?? 'center' }}
              sizes="(min-width: 1024px) 1120px, 100vw"
            />
          </div>
        ) : (
          <div className="aspect-[16/9] overflow-hidden rounded-[var(--radius-lg)] border border-line shadow-[var(--shadow-lift)]">
            <ProjectPlaceholder name={project.name} slug={project.slug} size="large" />
          </div>
        )}
      </div>
    </header>
  );
}
