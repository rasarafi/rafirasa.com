import { describe, expect, it } from 'vitest';

import { bandCount, pairComposites } from '@/lib/composites';
import type { Screenshot } from '@/lib/types';

const screen = (name: string, withDetail = true): Screenshot => ({
  src: `/projects/demo/${name}.png`,
  width: 1200,
  height: 675,
  title: `${name} title`,
  caption: `${name} caption`,
  alt: `${name} alt`,
  ...(withDetail ? { detail: { rect: { x: 10, y: 10, w: 100, h: 50 }, alt: `${name} detail` } } : {}),
});

describe('pairComposites', () => {
  it('never floats a crop of its own base image', () => {
    const screens = [screen('a'), screen('b'), screen('c')];
    for (const pair of pairComposites(screens, 3)) {
      expect(pair.float?.src, 'composite floats its own base').not.toBe(pair.base.src);
    }
  });

  it('pairs each base with the next screen that has a detail', () => {
    const screens = [screen('a'), screen('b', false), screen('c')];
    const [first] = pairComposites(screens, 1);
    expect(first.base.src).toContain('a');
    expect(first.float?.src).toContain('c'); // b has no detail, so it is skipped
  });

  it('wraps around to earlier screens when it runs off the end', () => {
    const screens = [screen('a'), screen('b')];
    const pairs = pairComposites(screens, 2);
    expect(pairs[1].float?.src).toContain('a');
  });

  it('returns a null float when no other screen has a detail', () => {
    const screens = [screen('a'), screen('b', false)];
    const [first] = pairComposites(screens, 1);
    expect(first.float).toBeNull();
  });

  it('returns a null float for a lone screen', () => {
    const [first] = pairComposites([screen('a')], 1);
    expect(first.float).toBeNull();
  });

  it('carries the source dimensions the crop maths needs', () => {
    const [first] = pairComposites([screen('a'), screen('b')], 1);
    expect(first.float?.srcWidth).toBe(1200);
    expect(first.float?.srcHeight).toBe(675);
  });

  it('never returns more pairs than screens', () => {
    expect(pairComposites([screen('a')], 4)).toHaveLength(1);
  });
});

describe('bandCount', () => {
  // `bandCount` takes the number of screens available to bands — what's left
  // after the hero has taken what it needs. That accounting is the caller's
  // job: a composite hero consumes screens[0], a video hero consumes none.
  // bandCount itself does no subtraction, so it can't silently disagree with
  // whichever hero the caller actually rendered.

  it('gives flagships and the ecosystem up to four bands', () => {
    expect(bandCount('flagship', 6)).toBe(4);
    expect(bandCount('ecosystem', 6)).toBe(4);
  });

  it('caps standard projects at three bands', () => {
    expect(bandCount('standard', 6)).toBe(3);
  });

  it('gives minor projects a single band — one screen is not an argument', () => {
    expect(bandCount('minor', 6)).toBe(1);
    expect(bandCount('minor', 1)).toBe(1);
  });

  it('still gives a minor project with nothing left over no bands', () => {
    expect(bandCount('minor', 0)).toBe(0);
  });

  it('uses every available screen up to the cap — no hidden hero subtraction', () => {
    // 3 screens available to bands (already net of whatever the hero took)
    // earns 3 bands for a flagship, not 2 — the old off-by-one assumed the
    // hero always ate one of them, which a video hero does not.
    expect(bandCount('flagship', 3)).toBe(3);
  });

  it('still caps at four once availability exceeds the flagship cap', () => {
    expect(bandCount('flagship', 5)).toBe(4);
  });

  it('gives a single available screen one band', () => {
    expect(bandCount('flagship', 1)).toBe(1);
  });

  it('gives a project with no screens available no bands', () => {
    expect(bandCount('flagship', 0)).toBe(0);
  });

  it('never goes negative when availableScreens is negative', () => {
    expect(bandCount('flagship', -3)).toBe(0);
  });
});
