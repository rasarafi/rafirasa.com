'use client';

import { useMemo, useState } from 'react';

import EcosystemFeature from './EcosystemFeature';
import ProjectCard from './ProjectCard';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { flagshipRank } from '@/data/projects';
import { TONE_DOT } from '@/lib/accent-classes';
import { STATUS_LEGEND } from '@/lib/project-display';
import type { Project } from '@/lib/types';
import { cn } from '@/lib/utils';

/** "Next.js 16" and "Next.js" should be one filter, not two. */
function normalizeTag(tag: string): string {
  return tag.replace(/\s*[\d.]+$/, '').trim();
}

/** Only offer a filter when at least two projects share the technology. */
function getFilterTags(projects: Project[]): string[] {
  const counts = new Map<string, number>();
  for (const p of projects) {
    const seen = new Set<string>();
    for (const tag of p.techTags) {
      const base = normalizeTag(tag);
      if (!seen.has(base)) {
        counts.set(base, (counts.get(base) ?? 0) + 1);
        seen.add(base);
      }
    }
  }
  return [...counts.entries()]
    .filter(([, count]) => count >= 2)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([tag]) => tag);
}

const TIER_ORDER: { tier: Project['tier']; label: string }[] = [
  { tier: 'flagship', label: 'Flagship' },
  { tier: 'standard', label: 'Standard' },
  { tier: 'minor', label: 'Minor & archived' },
];

/** Column spans across the six-column grid. */
function spanFor(tier: Project['tier'], isLead: boolean) {
  if (isLead) return 'lg:col-span-6';
  if (tier === 'flagship') return 'lg:col-span-3';
  return 'lg:col-span-2';
}

function GroupHeading({ label, count }: { label: string; count: number }) {
  return (
    <div className="flex items-baseline gap-3 lg:col-span-6">
      <h2 className="font-display text-[15px] font-semibold text-text-2">{label}</h2>
      <span className="h-px flex-1 bg-line" />
      <span className="font-mono text-[12px] text-text-3">{count}</span>
    </div>
  );
}

export default function ProjectsPageClient({ projects }: { projects: Project[] }) {
  const ecosystem = useMemo(() => projects.find((p) => p.tier === 'ecosystem'), [projects]);
  const gridProjects = useMemo(() => projects.filter((p) => p.tier !== 'ecosystem'), [projects]);

  const [activeTag, setActiveTag] = useState('All');
  const filterTags = useMemo(() => ['All', ...getFilterTags(projects)], [projects]);
  const isFiltered = activeTag !== 'All';

  const matches = useMemo(() => {
    const pool = isFiltered ? projects : gridProjects;
    if (!isFiltered) return pool;
    return pool.filter((p) => p.techTags.some((t) => normalizeTag(t) === activeTag));
  }, [activeTag, isFiltered, projects, gridProjects]);

  return (
    <>
      {/* The ecosystem is a feature, not a grid item — unless a filter is active,
          in which case it competes on equal terms like everything else. */}
      {!isFiltered && ecosystem && (
        <ScrollReveal>
          <EcosystemFeature project={ecosystem} />
        </ScrollReveal>
      )}

      <div className="mt-8">
        <ul className="mb-5 flex flex-wrap gap-x-5 gap-y-2 text-[13.5px] text-text-2">
          {STATUS_LEGEND.map((entry) => (
            <li key={entry.tone} className="flex items-center gap-[7px]">
              <span className={cn('block size-2 shrink-0 rounded-full', TONE_DOT[entry.tone])} />
              {entry.label}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by technology">
          {filterTags.map((tag) => {
            const active = tag === activeTag;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(tag)}
                aria-pressed={active}
                className={cn(
                  'cursor-pointer rounded-full border px-[15px] py-[7px] font-mono text-[12.5px] transition-colors duration-150',
                  active
                    ? 'border-text bg-text text-bg'
                    : 'border-line bg-surface text-text-2 hover:border-line-strong hover:text-text',
                )}
              >
                {tag === 'All' ? 'all' : tag}
              </button>
            );
          })}
        </div>
      </div>

      {matches.length === 0 ? (
        <div className="mt-10 rounded-[var(--radius-lg)] border border-line bg-surface p-10 text-center">
          <p className="font-display text-[19px] font-semibold">Nothing built with {activeTag}.</p>
          <p className="mt-2 text-[15px] text-text-2">
            Try another technology, or{' '}
            <button
              type="button"
              onClick={() => setActiveTag('All')}
              className="cursor-pointer text-coral underline underline-offset-4"
            >
              show every project
            </button>
            .
          </p>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {isFiltered
            ? matches.map((project) => (
                <div key={project.slug} className="min-w-0 sm:col-span-1 lg:col-span-2">
                  <ProjectCard project={project} variant="standard" />
                </div>
              ))
            : TIER_ORDER.map(({ tier, label }) => {
                const group = matches.filter((p) => p.tier === tier);
                // The flagship band follows the same order as the home page —
                // its lead card spans the full row, so the strongest opener has
                // to be first here too, not whatever data order happens to give.
                if (tier === 'flagship') {
                  group.sort((a, b) => flagshipRank(a.slug) - flagshipRank(b.slug));
                }
                if (group.length === 0) return null;
                return (
                  <div key={tier} className="contents">
                    <GroupHeading label={label} count={group.length} />
                    {group.map((project, i) => {
                      // A lead card spans the full six columns, so it only works
                      // when the remainder still tiles. With exactly two
                      // flagships a lead would leave half a row empty.
                      const isLead = tier === 'flagship' && i === 0 && group.length !== 2;
                      return (
                        <div
                          key={project.slug}
                          className={cn('min-w-0', spanFor(tier, isLead))}
                        >
                          <ProjectCard
                            project={project}
                            variant={isLead ? 'lead' : tier === 'minor' ? 'minor' : tier === 'flagship' ? 'flagship' : 'standard'}
                          />
                        </div>
                      );
                    })}
                  </div>
                );
              })}
        </div>
      )}
    </>
  );
}
