import { pipeline, rebuilds } from '@/data/ecosystem';
import { projects } from '@/data/projects';
import type { ProjectStatus } from '@/lib/types';
import { cn } from '@/lib/utils';

/**
 * Miniature of the pipeline diagram for the gallery's ecosystem feature tile —
 * the approved gallery mock shows the drawing here, not a stat block.
 *
 * It is a static illustration, not the interactive signature element: no
 * buttons, no era cards, one glance. Geometry and the abbreviated labels are
 * bespoke to this size and live here (the full diagram keeps its own), but
 * every status and every "replaced by" arrow comes from the same data, so the
 * two drawings cannot disagree about which apps are retired.
 */

type Geom = { x: number; w: number; label: string };

const TOP_Y = 44;
const BOTTOM_Y = 134;
const NODE_H = 40;

/** Legacy lane, left to right in data-flow order. */
const TOP: Record<string, Geom> = {
  'field-data-collection-app': { x: 14, w: 88, label: 'Field App' },
  'digital-evidence-centre': { x: 122, w: 88, label: 'Evidence Centre' },
  'healthy-village-tracker': { x: 230, w: 88, label: 'Village Tracker' },
  'child-growth-dashboard': { x: 338, w: 88, label: 'Growth Dashboard' },
};

/** 2026 lane. */
const BOTTOM: Record<string, Geom> = {
  'mis-dcapp-web': { x: 14, w: 118, label: 'Field Data Web' },
  'mis-dcapp-admin': { x: 142, w: 118, label: 'Survey Console' },
  'mis-dash-web': { x: 270, w: 158, label: 'Digital Evidence Centre' },
};

const PLATFORM: Record<string, string> = {
  'field-data-collection-app': 'Android',
  'digital-evidence-centre': 'C# desktop',
  'healthy-village-tracker': 'C# desktop',
  'child-growth-dashboard': 'C# + PHP',
};

function statusFor(slug: string): ProjectStatus {
  return projects.find((p) => p.slug === slug)?.status ?? 'live';
}

export default function EcosystemMiniPipeline({ className }: { className?: string }) {
  const legacy = pipeline.map((n) => ({ ...n, geom: TOP[n.slug], status: statusFor(n.slug) }));
  const modern = rebuilds.map((n) => ({ ...n, geom: BOTTOM[n.slug], status: statusFor(n.slug) }));

  const stillActive = legacy.filter((n) => n.status !== 'archived').length;
  const replaced = new Set(rebuilds.flatMap((r) => r.supersedes)).size;

  const arrows = rebuilds.flatMap((rebuild) => {
    const to = BOTTOM[rebuild.slug];
    if (!to) return [];
    const targets = rebuild.supersedes.filter((slug) => TOP[slug]);
    return targets.map((slug, i) => {
      const from = TOP[slug];
      const spread = (i - (targets.length - 1) / 2) * 40;
      return {
        key: `${slug}->${rebuild.slug}`,
        d:
          `M${from.x + from.w / 2} ${TOP_Y + NODE_H + 3}` +
          ` V${104 + i * 10}` +
          ` H${to.x + to.w / 2 + spread}` +
          ` V${BOTTOM_Y - 4}`,
      };
    });
  });

  return (
    <svg
      viewBox="0 0 440 210"
      className={cn('block h-auto w-full', className)}
      role="img"
      aria-label={`Pipeline of ${legacy.length} original applications and ${modern.length} 2026 rebuilds: ${stillActive} of ${legacy.length} still active, ${replaced} replaced by my own rebuilds`}
    >
      <rect width="440" height="210" rx="0" className="fill-[var(--surface-2)]" />

      <text x="14" y="26" className="fill-[var(--blue)] font-mono text-[8px] uppercase tracking-[0.4px]">
        2019–25 · hand-built
      </text>
      <text x="14" y="126" className="fill-[var(--coral)] font-mono text-[8px] uppercase tracking-[0.4px]">
        2026 · AI-orchestrated
      </text>

      <g fill="none">
        {legacy.slice(0, -1).map((n, i) => {
          const next = legacy[i + 1].geom;
          const y = TOP_Y + NODE_H / 2;
          return (
            <path
              key={n.slug}
              d={`M${n.geom.x + n.geom.w + 3} ${y} H${next.x - 3}`}
              className="stroke-[var(--blue)]"
              strokeWidth="1.2"
              strokeDasharray="3 4"
              opacity="0.8"
            />
          );
        })}
        {arrows.map((a) => (
          <path
            key={a.key}
            d={a.d}
            className="stroke-[var(--coral)]"
            strokeWidth="1.2"
            strokeDasharray="3 4"
            opacity="0.85"
          />
        ))}
      </g>

      {legacy.map((n) => {
        const retired = n.status === 'archived';
        const cx = n.geom.x + n.geom.w / 2;
        return (
          <g key={n.slug}>
            <rect
              x={n.geom.x}
              y={TOP_Y}
              width={n.geom.w}
              height={NODE_H}
              rx="8"
              className={
                retired
                  ? 'fill-[var(--bg)] stroke-[var(--line-strong)]'
                  : 'fill-[var(--surface)] stroke-[var(--blue)]'
              }
              strokeWidth={retired ? 1.1 : 1.3}
              strokeDasharray={retired ? '3 3' : undefined}
            />
            <text
              x={cx}
              y={TOP_Y + 17}
              textAnchor="middle"
              className={cn(
                'font-display text-[9.5px] font-semibold',
                retired ? 'fill-[var(--text-2)]' : 'fill-[var(--text)]',
              )}
            >
              {n.geom.label}
            </text>
            <text
              x={cx}
              y={TOP_Y + 30}
              textAnchor="middle"
              className="fill-[var(--text-3)] font-mono text-[7.5px]"
            >
              {retired ? 'retired' : PLATFORM[n.slug]}
            </text>
          </g>
        );
      })}

      {modern.map((n) => {
        const cx = n.geom.x + n.geom.w / 2;
        const note =
          n.supersedes.length > 0
            ? `replaces ${n.supersedes.length} desktop apps`
            : n.status === 'live'
              ? 'live · new'
              : `${n.status} · new`;
        return (
          <g key={n.slug}>
            <rect
              x={n.geom.x}
              y={BOTTOM_Y}
              width={n.geom.w}
              height={NODE_H}
              rx="8"
              className="fill-[var(--coral-bg)] stroke-[var(--coral)]"
              strokeWidth="1.4"
            />
            <text
              x={cx}
              y={BOTTOM_Y + 17}
              textAnchor="middle"
              className="fill-[var(--text)] font-display text-[9.5px] font-semibold"
            >
              {n.geom.label}
            </text>
            <text
              x={cx}
              y={BOTTOM_Y + 30}
              textAnchor="middle"
              className="fill-[var(--coral)] font-mono text-[7.5px]"
            >
              {note}
            </text>
          </g>
        );
      })}

      <text x="14" y="198" className="fill-[var(--text-3)] font-mono text-[8.5px]">
        {stillActive} of {legacy.length} still active · {replaced} replaced by my own rebuilds
      </text>
    </svg>
  );
}
