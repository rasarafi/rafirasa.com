import { projects } from '@/data/projects';

import type { Project, ProjectStatus, StatusTone } from './types';

/**
 * Presentation helpers derived from project data.
 *
 * Everything here is a pure function of the data so the view layer never has to
 * infer status, pick a placeholder colour, or invent a monogram — see
 * docs/superpowers/specs/2026-07-30-portfolio-redesign-design.md.
 */

/** The five accent colours in the Biscuit Aurora palette. */
export type Accent = 'blue' | 'coral' | 'amber' | 'green' | 'violet';

export const ACCENTS: readonly Accent[] = ['blue', 'coral', 'amber', 'green', 'violet'];

/**
 * Accents available for decoration (placeholder tiles, kind tags).
 *
 * Green and amber are deliberately excluded: they carry status meaning
 * (live / staging) everywhere else on the site, and reusing them decoratively
 * makes a green tile look like a "live" signal.
 */
export const DECORATIVE_ACCENTS: readonly Accent[] = ['blue', 'coral', 'violet'];

const STATUS_META: Record<ProjectStatus, { label: string; tone: StatusTone }> = {
  live: { label: 'live', tone: 'positive' },
  staging: { label: 'staging', tone: 'pending' },
  'pre-pilot': { label: 'pre-pilot', tone: 'pending' },
  demo: { label: 'demo', tone: 'muted' },
  unlaunched: { label: 'unlaunched', tone: 'muted' },
  archived: { label: 'archived', tone: 'muted' },
  offline: { label: 'offline', tone: 'muted' },
};

export function statusLabel(status: ProjectStatus): string {
  return STATUS_META[status].label;
}

export function statusTone(status: ProjectStatus): StatusTone {
  return STATUS_META[status].tone;
}

/** The three-bucket legend shown above the gallery grid. */
export const STATUS_LEGEND: { tone: StatusTone; label: string }[] = [
  { tone: 'positive', label: 'live in production' },
  { tone: 'pending', label: 'staging / pre-pilot' },
  { tone: 'muted', label: 'demo, archived or unlaunched' },
];

const MONOGRAM_STOPWORDS = new Set([
  'the',
  'a',
  'an',
  'and',
  'of',
  'for',
  'this',
  'my',
  '&',
]);

/**
 * Two-character monogram for placeholder tiles, from the first letters of the
 * first two meaningful words. Single-word names fall back to their first two
 * letters ("Jarvis" -> "JA").
 */
export function monogram(name: string): string {
  // An em/en dash separates a brand from its descriptor ("BD-LLM — Private AI
  // Workspace"); the monogram should come from the brand alone, so anything
  // after the dash is dropped. Plain hyphens are kept inside a word so
  // "BD-LLM" yields "BD" rather than "BL".
  const brand = name.split(/\s[—–]\s|[—–]/)[0];

  const words = brand
    .split(/\s+/)
    .map((w) => w.replace(/[^A-Za-z0-9]/g, ''))
    .filter((w) => w.length > 0 && !MONOGRAM_STOPWORDS.has(w.toLowerCase()));

  if (words.length === 0) return name.slice(0, 2).toUpperCase();
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

function hashAccent(slug: string): Accent {
  let hash = 0;
  for (let i = 0; i < slug.length; i += 1) {
    hash = (hash * 31 + slug.charCodeAt(i)) % 100000;
  }
  return DECORATIVE_ACCENTS[hash % DECORATIVE_ACCENTS.length];
}

/**
 * Accents are cycled by position within each tier rather than hashed.
 *
 * Hashing the slug gave an even overall spread but happened to land all three
 * flagships on violet — the three most prominent cards in the gallery would have
 * been the same colour. Cycling guarantees neighbours differ, which is the
 * property that actually matters visually. Colours stay stable as long as the
 * order of `data/projects.ts` does.
 */
const ACCENT_BY_SLUG: Map<string, Accent> = (() => {
  const map = new Map<string, Accent>();
  const seen = new Map<string, number>();
  for (const project of projects) {
    const n = seen.get(project.tier) ?? 0;
    seen.set(project.tier, n + 1);
    map.set(project.slug, DECORATIVE_ACCENTS[n % DECORATIVE_ACCENTS.length]);
  }
  return map;
})();

/**
 * Stable decorative accent for a project. Only ever returns a decorative
 * accent — never green or amber, which are reserved for status.
 */
export function accentFor(slug: string): Accent {
  return ACCENT_BY_SLUG.get(slug) ?? hashAccent(slug);
}

/** True when a project has no screenshot and must render the designed placeholder. */
export function needsPlaceholder(project: Project): boolean {
  return !project.images.thumbnail;
}
