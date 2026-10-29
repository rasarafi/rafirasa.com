import type { Accent } from './project-display';
import type { StatusTone } from './types';

/**
 * Tailwind cannot extract dynamically built class names (`text-${accent}`), so
 * every accent/tone combination is written out here and looked up by key.
 */

export const ACCENT_TEXT: Record<Accent, string> = {
  blue: 'text-blue',
  coral: 'text-coral',
  amber: 'text-amber',
  green: 'text-green',
  violet: 'text-violet',
};

export const ACCENT_BG: Record<Accent, string> = {
  blue: 'bg-blue-bg',
  coral: 'bg-coral-bg',
  amber: 'bg-amber-bg',
  green: 'bg-green-bg',
  violet: 'bg-violet-bg',
};

export const ACCENT_DOT: Record<Accent, string> = {
  blue: 'bg-blue',
  coral: 'bg-coral',
  amber: 'bg-amber',
  green: 'bg-green',
  violet: 'bg-violet',
};

/** Diagonal tint used behind placeholder monograms. */
export const ACCENT_GRADIENT: Record<Accent, string> = {
  blue: 'from-blue-bg',
  coral: 'from-coral-bg',
  amber: 'from-amber-bg',
  green: 'from-green-bg',
  violet: 'from-violet-bg',
};

const TONE_ACCENT: Record<StatusTone, Accent | 'muted'> = {
  positive: 'green',
  pending: 'amber',
  muted: 'muted',
};

export const TONE_TEXT: Record<StatusTone, string> = {
  positive: 'text-green',
  pending: 'text-amber',
  muted: 'text-text-3',
};

export const TONE_BG: Record<StatusTone, string> = {
  positive: 'bg-green-bg',
  pending: 'bg-amber-bg',
  muted: 'bg-surface-2',
};

export const TONE_DOT: Record<StatusTone, string> = {
  positive: 'bg-green',
  pending: 'bg-amber',
  muted: 'bg-text-3',
};

export function toneAccent(tone: StatusTone) {
  return TONE_ACCENT[tone];
}
