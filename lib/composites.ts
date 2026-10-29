import type { CropRect, Project, Screenshot } from '@/lib/types';

/** A cropped region of one screen, floated over a different screen. */
export type FloatPiece = {
  src: string;
  srcWidth: number;
  srcHeight: number;
  rect: CropRect;
  alt: string;
};

export type CompositePair = { base: Screenshot; float: FloatPiece | null };

/**
 * Pairs each base screen with a detail cropped from a *different* screen.
 *
 * The pairing is derived rather than authored: the v4 mock originally floated
 * each screen's own stat tiles over itself, producing a mockup that showed the
 * same content twice. Authors write crops; they never wire pairs.
 */
export function pairComposites(screens: Screenshot[], count: number): CompositePair[] {
  const n = screens.length;
  const take = Math.min(count, n);

  return Array.from({ length: take }, (_, i) => {
    const base = screens[i];

    // Walk forward cyclically for the next screen that has a detail and is not
    // this base. Wrapping means the last band still finds a partner.
    for (let step = 1; step < n; step++) {
      const candidate = screens[(i + step) % n];
      if (!candidate.detail || candidate.src === base.src) continue;
      return {
        base,
        float: {
          src: candidate.src,
          srcWidth: candidate.width,
          srcHeight: candidate.height,
          rect: candidate.detail.rect,
          alt: candidate.detail.alt,
        },
      };
    }

    return { base, float: null };
  });
}

/**
 * How many claim bands a project earns, given the screens left over after
 * the hero has taken what it needs. The caller decides that: a composite
 * hero consumes screens[0], a video hero consumes none. Baking a `- 1` in
 * here once assumed every hero was a composite; a video hero broke that
 * assumption and orphaned a screen, so the subtraction moved to the call
 * site where the hero type is actually known.
 *
 * Thin projects degrade to fewer bands rather than rendering empty ones: 15
 * of 24 projects have fewer than four screens.
 *
 * The caps were raised on 2026-09-09 (minor 0 -> 1, standard 2 -> 3). The
 * original numbers hid 10 already-captured screens behind a cap, on a redesign
 * whose whole premise was "projects need more pictures" — a minor project in
 * particular got one image and no argument at all. Every project with raw
 * captures has more usable screens than it shows, so the scarce resource is
 * written captions, not screenshots. See workspace/08-screens-content/00-PLAN.md.
 */
export function bandCount(tier: Project['tier'], availableScreens: number): number {
  const cap = tier === 'flagship' || tier === 'ecosystem' ? 4 : tier === 'standard' ? 3 : 1;
  return Math.max(0, Math.min(cap, availableScreens));
}
