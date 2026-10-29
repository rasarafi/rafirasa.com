import { existsSync, readdirSync } from 'node:fs';

import { describe, expect, it } from 'vitest';

import { projects } from '@/data/projects';

/** Internal shorthand that must never reach a visitor. Mirrors projects-data.test.ts. */
const INTERNAL_NAMES = [/\bDCApp\b/i, /\bMFB MIS\b/i, /\bMFB HRM\b/i, /\bMFNL\b/i, /\bMIS Dash\b/i, /\bR2G\b/i];

/** Jargon that means nothing to a business owner reading a case study. */
const JARGON = [/\bcommits?\b/i, /\bLOC\b/, /\blines of code\b/i, /\bcode coverage\b/i, /\btest files?\b/i, /\bendpoints?\b/i];

const allScreens = projects.flatMap((p) => p.images.screens.map((s) => ({ slug: p.slug, s })));

// Live since 2026-09-12: every screen carries real copy, so this is the gate.
describe('screen copy', () => {
  it('gives every screen a title, caption and alt', () => {
    for (const { slug, s } of allScreens) {
      expect(s.title.length, `${slug} ${s.src} title`).toBeGreaterThan(0);
      expect(s.caption.length, `${slug} ${s.src} caption`).toBeGreaterThan(0);
      expect(s.alt.length, `${slug} ${s.src} alt`).toBeGreaterThan(0);
    }
  });

  it('never reuses the caption as alt text — they do different jobs', () => {
    for (const { slug, s } of allScreens) {
      expect(s.alt, `${slug} ${s.src} alt duplicates caption`).not.toBe(s.caption);
    }
  });

  it('keeps captions short enough to read at a glance', () => {
    for (const { slug, s } of allScreens) {
      expect(s.caption.length, `${slug} ${s.src} caption is too long`).toBeLessThanOrEqual(320);
      expect(s.title.length, `${slug} ${s.src} title is too long`).toBeLessThanOrEqual(60);
    }
  });

  it('keeps internal code names out of screen copy', () => {
    for (const { slug, s } of allScreens) {
      for (const re of INTERNAL_NAMES) {
        expect(`${s.title} ${s.caption} ${s.alt}`, `${slug} ${s.src}`).not.toMatch(re);
      }
    }
  });

  it('keeps developer jargon out of screen copy', () => {
    for (const { slug, s } of allScreens) {
      for (const re of JARGON) {
        expect(`${s.title} ${s.caption}`, `${slug} ${s.src}`).not.toMatch(re);
      }
    }
  });

  it('leaves no placeholder copy behind', () => {
    for (const { slug, s } of allScreens) {
      expect(`${s.title} ${s.caption} ${s.alt}`, `${slug} ${s.src}`).not.toMatch(/PENDING/);
    }
  });
});

describe('detail crops', () => {
  it('keeps every detail rectangle inside its source image', () => {
    for (const { slug, s } of allScreens) {
      if (!s.detail) continue;
      const { x, y, w, h } = s.detail.rect;
      expect(x, `${slug} ${s.src} detail.x`).toBeGreaterThanOrEqual(0);
      expect(y, `${slug} ${s.src} detail.y`).toBeGreaterThanOrEqual(0);
      expect(w, `${slug} ${s.src} detail.w`).toBeGreaterThan(0);
      expect(h, `${slug} ${s.src} detail.h`).toBeGreaterThan(0);
      expect(x + w, `${slug} ${s.src} detail overflows width`).toBeLessThanOrEqual(s.width);
      expect(y + h, `${slug} ${s.src} detail overflows height`).toBeLessThanOrEqual(s.height);
    }
  });

  it('gives every detail its own alt text', () => {
    for (const { slug, s } of allScreens) {
      if (!s.detail) continue;
      expect(s.detail.alt.length, `${slug} ${s.src} detail alt`).toBeGreaterThan(0);
      expect(s.detail.alt, `${slug} ${s.src} detail alt duplicates screen alt`).not.toBe(s.alt);
    }
  });
});

describe('screen assets', () => {
  // public/projects/**/*.png is gitignored repo-wide (they ship inside the deploy image, see
  // workspace/03-media-capture/PLAN.md) — a fresh clone or second machine has none of them at
  // all. Distinguish that from a real typo: no project asset directories present → nothing to
  // check yet, skip with an explanation; a project's directory present but the named file
  // missing → that's a mistyped/undelivered path, fail loudly.
  const projectsRoot = 'public/projects';
  const hasAnyAssets = existsSync(projectsRoot) && readdirSync(projectsRoot).length > 0;

  it.skipIf(!hasAnyAssets)('points every screen at a file that exists on disk', () => {
    for (const { slug, s } of allScreens) {
      const projectDir = `public/projects/${slug}`;
      if (!existsSync(projectDir)) continue; // this project's assets aren't checked out here at all
      expect(existsSync(`public${s.src}`), `${slug} missing asset ${s.src}`).toBe(true);
    }
  });

  it.skipIf(hasAnyAssets)(
    'skipped: public/projects assets are gitignored and absent on this checkout — run scripts/image-helpers.sh locally (see workspace/03-media-capture/PLAN.md) to generate them and exercise this check',
    () => {},
  );
});
