'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

import StatusPill from '@/components/ui/StatusPill';
import { ecosystemSlug, eras, impactStats, pipeline, rebuilds } from '@/data/ecosystem';
import { projects } from '@/data/projects';
import type { Era, EraId, ProjectStatus } from '@/lib/types';
import { cn } from '@/lib/utils';

/**
 * The signature element: one pipeline drawn across two eras.
 *
 * The framing is a duel. An era band sits above the hand-built 2019–25 lane and
 * another below the 2026 AI-orchestrated lane, and their stats face each other —
 * every line typed vs. every line directed, six years vs. months. Below the
 * drawing, one detail card per era stands as that era's champion; selecting a
 * node swaps the card on its own side, so the comparison is never broken.
 *
 * Dashed elbow arrows connect a retired app to the rebuild that actually
 * replaced it — only where `supersedes` says so, because two of the three 2026
 * systems are additive rather than replacements. The elbows route sideways on
 * purpose: straight vertical drops made a 2026 node look like the rebuild of
 * whatever legacy node happened to sit above it, which is wrong. The Field Data
 * Collection App is still the original, still in production, never rebuilt.
 *
 * Geometry lives here (it is a bespoke illustration) but all copy and status come
 * from data, so the diagram cannot drift from the project entries.
 *
 * Nodes are real buttons inside the SVG: focusable, keyboard-activatable, and
 * announced. On narrow viewports the drawing scrolls inside its own container
 * rather than shrinking to illegibility.
 */

type NodeGeom = { x: number; y: number; w: number; h: number };

const LANE_TOP = 10;
const LANE_BOTTOM = 142;
const NODE_H = 54;

const TOP_GEOM: Record<string, NodeGeom> = {
  'field-data-collection-app': { x: 16, y: LANE_TOP, w: 196, h: NODE_H },
  'digital-evidence-centre': { x: 246, y: LANE_TOP, w: 200, h: NODE_H },
  'healthy-village-tracker': { x: 480, y: LANE_TOP, w: 196, h: NODE_H },
  'child-growth-dashboard': { x: 710, y: LANE_TOP, w: 274, h: NODE_H },
};

const BOTTOM_GEOM: Record<string, NodeGeom> = {
  'mis-dcapp-web': { x: 16, y: LANE_BOTTOM, w: 196, h: NODE_H },
  'mis-dcapp-admin': { x: 246, y: LANE_BOTTOM, w: 200, h: NODE_H },
  'mis-dash-web': { x: 480, y: LANE_BOTTOM, w: 504, h: NODE_H },
};

/** Left-to-right data flow through the legacy lane. */
const FLOW_ORDER = [
  'field-data-collection-app',
  'digital-evidence-centre',
  'healthy-village-tracker',
  'child-growth-dashboard',
];

function statusFor(slug: string): ProjectStatus {
  return projects.find((p) => p.slug === slug)?.status ?? 'live';
}

function shortStatusLabel(status: ProjectStatus): string {
  if (status === 'archived') return 'retired 2026';
  if (status === 'live') return 'still active';
  return status;
}

function statFor(label: string, fallback: string): string {
  return impactStats.find((s) => s.label === label)?.value ?? fallback;
}

/**
 * The era line in the detail card. A 2026 system must say whether it replaced
 * something or was added alongside — "2026 rebuild" was once applied to all
 * three, which overstated the two additive ones.
 */
function eraNote(node: { era: EraId; status: ProjectStatus; supersedes: string[] }): string {
  if (node.era === 'legacy') {
    return node.status === 'archived' ? '2019 · retired 2026' : '2019 · still in production';
  }
  const replaced = node.supersedes.length;
  if (replaced === 0) return '2026 · new system';
  // Everything the 2026 lane replaced was a desktop application.
  return `2026 · replaces ${replaced} desktop app${replaced === 1 ? '' : 's'}`;
}

/** The mini-header above (or below) a lane: era tag, rule, and facing stats. */
function EraBand({ era, position }: { era: Era; position: 'top' | 'bottom' }) {
  return (
    <div
      className={cn(
        'flex flex-wrap items-baseline gap-x-[14px] gap-y-1 px-6 sm:px-8',
        position === 'top' ? 'pt-[18px] pb-1.5' : 'pt-1.5 pb-[18px]',
      )}
    >
      <span
        className={cn(
          'font-mono text-[13px] font-medium tracking-[0.4px] whitespace-nowrap uppercase',
          era.id === 'legacy' ? 'text-[var(--blue)]' : 'text-[var(--coral)]',
        )}
      >
        {era.tag}
      </span>
      <span className="hidden h-px flex-1 self-center bg-line sm:block" />
      {/*
        The separator trails its own item rather than leading the next one, so a
        wrapped narrow-screen line ends with the dot instead of starting with it.
      */}
      <span className="flex flex-wrap items-baseline font-mono text-[12.5px] text-text-3">
        {[era.lead, ...era.stats].map((item, i, all) => (
          <span key={item} className={i === 0 ? 'font-medium text-text-2' : undefined}>
            {item}
            {i < all.length - 1 && (
              <span className="mx-[9px] text-line-strong" aria-hidden="true">
                ·
              </span>
            )}
          </span>
        ))}
      </span>
    </div>
  );
}

export default function PipelineDiagram({ showCaseStudyLink = true }: { showCaseStudyLink?: boolean }) {
  const nodes = useMemo(() => {
    const top = pipeline.map((n) => ({
      ...n,
      era: 'legacy' as const,
      geom: TOP_GEOM[n.slug],
      status: statusFor(n.slug),
      supersedes: [] as string[],
    }));
    const bottom = rebuilds.map((n) => ({
      ...n,
      era: 'rebuilt' as const,
      geom: BOTTOM_GEOM[n.slug],
      status: statusFor(n.slug),
    }));
    return [...top, ...bottom];
  }, []);

  /**
   * One selection per era, not one overall. The two cards are the point of the
   * layout — collapsing to a single card would let a click on the 2019 lane
   * erase the 2026 evidence, which is the comparison the section exists to make.
   */
  const [selected, setSelected] = useState<Record<EraId, string>>(() => ({
    legacy: pipeline[0].slug,
    // The champion of the 2026 lane is the one that actually replaced something.
    rebuilt: (rebuilds.find((r) => r.supersedes.length > 0) ?? rebuilds[0]).slug,
  }));

  const champions = (['legacy', 'rebuilt'] as const).map(
    (era) => nodes.find((n) => n.slug === selected[era]) ?? nodes[0],
  );

  /**
   * Only retired apps get a "replaced by" arrow, and it elbows across to the
   * node that actually replaced them rather than dropping straight down. Each
   * arrow gets its own routing row and landing offset so two arrows converging
   * on one rebuild stay readable.
   */
  const supersedeArrows = rebuilds.flatMap((rebuild) => {
    const to = BOTTOM_GEOM[rebuild.slug];
    if (!to) return [];
    const targets = rebuild.supersedes.filter((legacySlug) => TOP_GEOM[legacySlug]);
    return targets.map((legacySlug, i) => {
      const from = TOP_GEOM[legacySlug];
      const spread = (i - (targets.length - 1) / 2) * 64;
      return {
        key: `${legacySlug}->${rebuild.slug}`,
        d:
          `M${from.x + from.w / 2} ${from.y + from.h + 4}` +
          ` V${96 + i * 16}` +
          ` H${to.x + to.w / 2 + spread}` +
          ` V${LANE_BOTTOM - 6}`,
      };
    });
  });

  return (
    <div className="overflow-hidden rounded-[var(--radius-lg)] border border-line bg-surface shadow-[var(--shadow)]">
      <div className="px-6 pt-7 sm:px-8">
        <h3 className="font-display text-[21px] font-semibold tracking-[-0.4px] sm:text-[23px]">
          Same system. Same engineer. Two eras.
        </h3>
        <p className="mt-[7px] max-w-[78ch] text-[15.5px] text-text-2">
          The data platform behind{' '}
          <strong className="font-semibold text-text">Max Foundation Bangladesh</strong>&rsquo;s
          health &amp; WASH programmes — used by{' '}
          <strong className="font-semibold text-text">
            {statFor('End users', '125+')} staff across {statFor('Partner organizations', '8+')}{' '}
            partner organizations
          </strong>
          , including World Vision and Action Against Hunger.
        </p>
      </div>

      <EraBand era={eras[0]} position="top" />

      {/* The drawing scrolls on narrow screens instead of shrinking. */}
      <div className="overflow-x-auto px-3 sm:px-5">
        <svg
          viewBox="0 0 1000 216"
          className="block h-auto w-full min-w-[760px]"
          role="group"
          aria-label="Max Foundation Digital Data Platform pipeline across two eras"
        >
          {/* Left-to-right flow through the legacy lane. */}
          <g fill="none">
            {FLOW_ORDER.slice(0, -1).map((slug, i) => {
              const from = TOP_GEOM[slug];
              const to = TOP_GEOM[FLOW_ORDER[i + 1]];
              const y = LANE_TOP + NODE_H / 2;
              return (
                <path
                  key={slug}
                  d={`M${from.x + from.w + 6} ${y} H${to.x - 6}`}
                  className="pipeline-flow stroke-[var(--blue)]"
                  strokeWidth="1.5"
                  markerEnd="url(#pipeline-arrow)"
                />
              );
            })}

            {supersedeArrows.map((a) => (
              <path
                key={a.key}
                d={a.d}
                className="stroke-[var(--coral)]"
                strokeWidth="1.4"
                strokeDasharray="3 5"
                opacity="0.8"
                markerEnd="url(#pipeline-arrow-coral)"
              />
            ))}
          </g>

          <defs>
            <marker
              id="pipeline-arrow"
              viewBox="0 0 8 8"
              refX="6"
              refY="4"
              markerWidth="5"
              markerHeight="5"
              orient="auto"
            >
              <path d="M0 0 L7 4 L0 8 z" fill="var(--blue)" />
            </marker>
            <marker
              id="pipeline-arrow-coral"
              viewBox="0 0 8 8"
              refX="6"
              refY="4"
              markerWidth="5"
              markerHeight="5"
              orient="auto"
            >
              <path d="M0 0 L7 4 L0 8 z" fill="var(--coral)" />
            </marker>
          </defs>

          {nodes.map((node) => {
            const { geom } = node;
            if (!geom) return null;
            const isActive = selected[node.era] === node.slug;
            const retired = node.status === 'archived';

            return (
              <g
                key={node.slug}
                role="button"
                tabIndex={0}
                aria-pressed={isActive}
                /*
                  The accessible name must start with the node's own visible
                  text, or a voice-control user asking for what they can read
                  cannot reach it. Abbreviated nodes append the full name.
                */
                aria-label={
                  `${node.diagramLabel ?? node.name} ${node.role}` +
                  `${node.diagramLabel ? ` — ${node.name}` : ''}` +
                  `, ${shortStatusLabel(node.status)}`
                }
                className="pipeline-node cursor-pointer outline-none"
                onClick={() => setSelected((s) => ({ ...s, [node.era]: node.slug }))}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelected((s) => ({ ...s, [node.era]: node.slug }));
                  }
                }}
              >
                <rect
                  x={geom.x}
                  y={geom.y}
                  width={geom.w}
                  height={geom.h}
                  rx={11}
                  className={cn(
                    'transition-all duration-150',
                    retired
                      ? 'fill-[var(--surface-2)] stroke-[var(--line-strong)]'
                      : node.era === 'rebuilt'
                        ? 'fill-[var(--coral-bg)] stroke-[var(--coral)]'
                        : 'fill-[var(--surface)] stroke-[var(--blue)]',
                  )}
                  strokeWidth={isActive ? 2.8 : retired ? 1.2 : 1.5}
                  strokeDasharray={retired ? '4 3' : undefined}
                />
                <text
                  x={geom.x + geom.w / 2}
                  y={geom.y + 23}
                  textAnchor="middle"
                  className={cn(
                    'pointer-events-none font-display text-[14px] font-semibold',
                    retired ? 'fill-[var(--text-2)]' : 'fill-[var(--text)]',
                  )}
                >
                  {node.diagramLabel ?? node.name}
                </text>
                <text
                  x={geom.x + geom.w / 2}
                  y={geom.y + 40}
                  textAnchor="middle"
                  className={cn(
                    'pointer-events-none font-mono text-[10.5px]',
                    retired
                      ? 'fill-[var(--text-3)]'
                      : node.era === 'rebuilt'
                        ? 'fill-[var(--coral)]'
                        : 'fill-[var(--blue)]',
                  )}
                >
                  {node.role}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <EraBand era={eras[1]} position="bottom" />

      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 px-6 font-mono text-[12px] text-text-3 sm:px-8">
        <p className="flex items-center gap-[7px]">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M3 7l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          Select any application to see what it does — the two below carry each era
        </p>
        {/* Suppressed on the case study itself, where the link would point at the page you are on. */}
        {showCaseStudyLink && (
          <Link
            href={`/projects/${ecosystemSlug}`}
            className="text-[13px] text-text-2 no-underline transition-colors hover:text-text"
          >
            Read the case study →
          </Link>
        )}
      </div>

      {/* One champion per era, side by side. aria-live so keyboard users hear the swap. */}
      <div className="m-3 grid grid-cols-1 gap-3.5 sm:m-5 sm:mt-3.5 lg:grid-cols-2">
        {champions.map((node) => (
          <div
            key={node.era}
            data-era={node.era}
            aria-live="polite"
            className={cn(
              'rounded-[var(--radius)] bg-surface-2 px-6 py-5',
              node.era === 'legacy'
                ? 'border-t-[3px] border-[var(--blue)]'
                : 'border-t-[3px] border-[var(--coral)]',
            )}
          >
            <div className="mb-2 flex flex-wrap items-center gap-3">
              <h4 className="font-display text-[19px] font-semibold tracking-[-0.3px]">
                {node.name}
              </h4>
              <StatusPill status={node.status} size="small" />
              <span className="font-mono text-[11.5px] text-text-3">{eraNote(node)}</span>
            </div>
            <p className="max-w-[86ch] text-[15.5px] text-text-2">{node.shortDesc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
