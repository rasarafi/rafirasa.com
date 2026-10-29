import { describe, expect, it } from 'vitest';

import { projects } from '@/data/projects';
import {
  ACCENTS,
  DECORATIVE_ACCENTS,
  accentFor,
  monogram,
  needsPlaceholder,
  statusLabel,
  statusTone,
} from '@/lib/project-display';
import type { ProjectStatus } from '@/lib/types';

describe('monogram', () => {
  it('takes initials from the first two meaningful words', () => {
    expect(monogram('Nutrition Analytics Dashboard')).toBe('NA');
    expect(monogram('Field Data Management Platform')).toBe('FD');
    expect(monogram('Rokeya Hall Alumni Network')).toBe('RH');
  });

  it('skips stopwords', () => {
    expect(monogram('This Portfolio Site')).toBe('PS');
    expect(monogram('BD Muscle & Fitness')).toBe('BM');
  });

  it('falls back to two letters for single-word names', () => {
    expect(monogram('Jarvis')).toBe('JA');
    expect(monogram('EntreSoft')).toBe('EN');
  });

  it('takes the monogram from the brand, not the descriptor after a dash', () => {
    expect(monogram('BMSF — Human Rights Site')).toBe('BM');
    expect(monogram('Jarvis — AI Development Orchestrator')).toBe('JA');
  });

  it('keeps hyphenated brand names as one word', () => {
    // "BD-LLM" is one brand, so "BD" — not "BL" from BD + LLM.
    expect(monogram('BD-LLM')).toBe('BD');
    expect(monogram('BD-LLM — Private AI Workspace')).toBe('BD');
  });

  it('always returns exactly two characters for real project names', () => {
    for (const p of projects) {
      expect(monogram(p.name), `${p.slug} -> ${monogram(p.name)}`).toHaveLength(2);
    }
  });
});

describe('accentFor', () => {
  it('is deterministic', () => {
    expect(accentFor('jarvis')).toBe(accentFor('jarvis'));
  });

  it('only ever returns a palette accent', () => {
    for (const p of projects) {
      expect(ACCENTS).toContain(accentFor(p.slug));
    }
  });

  it('never returns green or amber — those are reserved for status', () => {
    // A green placeholder tile would read as a "live" signal.
    for (const p of projects) {
      const accent = accentFor(p.slug);
      expect(DECORATIVE_ACCENTS, `${p.slug} got reserved accent "${accent}"`).toContain(accent);
      expect(accent).not.toBe('green');
      expect(accent).not.toBe('amber');
    }
  });

  it('spreads real project slugs across every decorative accent', () => {
    // Guards against every card rendering the same colour.
    const used = new Set(projects.map((p) => accentFor(p.slug)));
    expect(used.size).toBe(DECORATIVE_ACCENTS.length);
  });

  it('gives every flagship a different accent', () => {
    // These are the largest cards in the gallery; matching colours read as a bug.
    const flagshipAccents = projects
      .filter((p) => p.tier === 'flagship')
      .map((p) => accentFor(p.slug));
    expect(new Set(flagshipAccents).size).toBe(flagshipAccents.length);
  });

  it('never repeats an accent on consecutive projects within a tier', () => {
    const byTier = new Map<string, string[]>();
    for (const p of projects) {
      const list = byTier.get(p.tier) ?? [];
      list.push(accentFor(p.slug));
      byTier.set(p.tier, list);
    }
    for (const [tier, accents] of byTier) {
      for (let i = 1; i < accents.length; i += 1) {
        expect(accents[i], `${tier} repeats ${accents[i]} at position ${i}`).not.toBe(
          accents[i - 1],
        );
      }
    }
  });
});

describe('status presentation', () => {
  const ALL: ProjectStatus[] = [
    'live',
    'staging',
    'pre-pilot',
    'demo',
    'unlaunched',
    'archived',
    'offline',
  ];

  it('maps every status to a label and a tone', () => {
    for (const s of ALL) {
      expect(statusLabel(s).length).toBeGreaterThan(0);
      expect(['positive', 'pending', 'muted']).toContain(statusTone(s));
    }
  });

  it('treats only live as positive', () => {
    expect(statusTone('live')).toBe('positive');
    expect(statusTone('staging')).toBe('pending');
    expect(statusTone('pre-pilot')).toBe('pending');
    expect(statusTone('demo')).toBe('muted');
    expect(statusTone('offline')).toBe('muted');
  });
});

describe('needsPlaceholder', () => {
  it('is true exactly when there is no thumbnail', () => {
    for (const p of projects) {
      expect(needsPlaceholder(p)).toBe(p.images.thumbnail === '');
    }
  });

  it('has exactly one screenshot gap, and it is a deliberate one', () => {
    // The Desktop Evidence Centre has no publishable picture: its login art is
    // a child's photograph and every other capture shows real child records
    // (2026-09-12 review, workspace/03-media-capture/PLAN.md). It renders the
    // designed placeholder until the archived client can be run against a
    // seeded database. Nothing else may join this list without the same case.
    const missing = projects.filter(needsPlaceholder).map((p) => p.slug);
    expect(missing).toEqual(['digital-evidence-centre']);
  });
});
