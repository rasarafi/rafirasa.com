import { describe, expect, it } from 'vitest';

import { projects, visibleProjects } from '@/data/projects';
import { ecosystemSlug, pipeline } from '@/data/ecosystem';
import type { ProjectStatus } from '@/lib/types';

const VALID_STATUSES: ProjectStatus[] = [
  'live',
  'staging',
  'pre-pilot',
  'demo',
  'unlaunched',
  'archived',
  'offline',
];

describe('project data integrity', () => {
  it('has unique slugs', () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('gives every project a valid status', () => {
    for (const p of projects) {
      expect(VALID_STATUSES, `${p.slug} has an unknown status`).toContain(p.status);
    }
  });

  it('gives every project the required display fields', () => {
    for (const p of projects) {
      expect(p.name.length, `${p.slug} name`).toBeGreaterThan(0);
      expect(p.type.length, `${p.slug} type`).toBeGreaterThan(0);
      expect(p.oneLiner.length, `${p.slug} oneLiner`).toBeGreaterThan(0);
      expect(p.techTags.length, `${p.slug} techTags`).toBeGreaterThan(0);
    }
  });

  it('hides sub-apps only with a parent that exists', () => {
    const slugs = new Set(projects.map((p) => p.slug));
    for (const p of projects.filter((x) => x.hidden)) {
      expect(p.parentSlug, `${p.slug} is hidden without a parentSlug`).toBeTruthy();
      expect(slugs, `${p.slug} points at a missing parent`).toContain(p.parentSlug);
    }
  });

  it('excludes hidden projects from visibleProjects', () => {
    expect(visibleProjects.some((p) => p.hidden)).toBe(false);
    expect(visibleProjects.length).toBe(projects.filter((p) => !p.hidden).length);
  });

  it('resolves every ecosystem pipeline node to a real project', () => {
    const slugs = new Set(projects.map((p) => p.slug));
    expect(slugs, 'ecosystemSlug has no project').toContain(ecosystemSlug);
    for (const node of pipeline) {
      expect(slugs, `pipeline node ${node.slug} has no project`).toContain(node.slug);
    }
  });
});

describe('flagship lineup', () => {
  // Decided in workspace/02-polishes/08: commercial AI work first, visual client
  // proof second, the engine behind the method as the closer. The data platform
  // is represented by the pipeline card instead, and the pre-pilot AI workspace
  // dropped to standard. 2026-10-29: Funded Academy closed (Sep 2026) and is
  // archived; the Digital Evidence Centre's production AI layer took its slot.
  it('keeps the flagship tier to the three headline systems', () => {
    const flagships = projects.filter((p) => p.tier === 'flagship').map((p) => p.slug);
    expect(flagships.sort()).toEqual(['jarvis', 'mis-dash-web', 'titan-platform']);
  });

  it('never flags a project with no external users', () => {
    for (const p of projects.filter((x) => x.tier === 'flagship')) {
      expect(p.status, `${p.slug} is a flagship but ${p.status}`).toBe('live');
    }
  });
});

describe('status honesty rules', () => {
  // From docs/superpowers/specs/2026-07-30-portfolio-redesign-design.md: a project
  // that is not live must never advertise a live URL.
  it('never gives a live link to a project that is not live', () => {
    for (const p of projects) {
      if (p.status !== 'live' && p.links?.live) {
        throw new Error(`${p.slug} is "${p.status}" but exposes links.live`);
      }
    }
  });

  it('keeps the known non-live projects non-live', () => {
    const expected: Record<string, ProjectStatus> = {
      'bd-llm': 'pre-pilot',
      // hr-management-system left this list on 2026-07-31: it cut over to
      // production at hrm.mfbmis.net and is genuinely live now.
      'mfnl-site': 'staging',
      'mis-dipbr-web': 'unlaunched',
      'bd-muscle': 'unlaunched',
      'healthy-village-tracker': 'archived',
      'child-growth-dashboard': 'archived',
    };
    for (const [slug, status] of Object.entries(expected)) {
      const p = projects.find((x) => x.slug === slug);
      expect(p, `${slug} missing from data`).toBeDefined();
      expect(p!.status, `${slug} status drifted`).toBe(status);
    }
  });
});

describe('public-facing naming', () => {
  // The audience is recruiters and clients, not insiders: internal shorthand must
  // not reach the rendered site.
  const INTERNAL_CODES = [
    // The one codename the first naming pass skipped — now "Private AI Workspace".
    'BD-LLM',
    'DCApp',
    'DCAPP',
    'MFB MIS',
    'MFB HRM',
    'HRM v2',
    'MFNL',
    'MIS Dash',
    'R2G',
  ];

  it('keeps internal code names out of names, types and one-liners', () => {
    for (const p of projects) {
      const haystack = `${p.name} ${p.type} ${p.oneLiner} ${p.hook ?? ''}`;
      for (const code of INTERNAL_CODES) {
        expect(haystack, `${p.slug} leaks "${code}"`).not.toContain(code);
      }
    }
  });

  it('keeps internal code names out of descriptions', () => {
    for (const p of projects) {
      for (const code of INTERNAL_CODES) {
        expect(p.description, `${p.slug} description leaks "${code}"`).not.toContain(code);
      }
    }
  });

  it('renames the ecosystem away from its internal "MFB MIS" code', () => {
    const ecosystem = projects.find((p) => p.slug === 'mfb-mis-ecosystem');
    expect(ecosystem?.name).toBe('Max Foundation Digital Data Platform');
  });

  it('keeps slugs stable — they are public URLs with existing redirects', () => {
    // Renaming is a display-layer change only; changing a slug breaks live links.
    for (const slug of [
      'mfb-mis-ecosystem',
      'mis-dash-web',
      'mis-dcapp-web',
      'mis-dcapp-admin',
      'hr-management-system',
      'mfnl-site',
      'bmsf',
      'ru-rokeya-hall',
      'funded-academy-platform',
      'portfolio-app',
    ]) {
      expect(
        projects.some((p) => p.slug === slug),
        `slug ${slug} disappeared — this breaks a public URL`,
      ).toBe(true);
    }
  });
});

describe('screens data model', () => {
  it('gives every project a screens array', () => {
    for (const p of projects) {
      expect(Array.isArray(p.images.screens), `${p.slug} images.screens`).toBe(true);
    }
  });

  it('no longer carries the old gallery field', () => {
    for (const p of projects) {
      expect(p.images, `${p.slug} still has images.gallery`).not.toHaveProperty('gallery');
    }
  });
});

describe('screens migration', () => {
  it('carries over every gallery image as a screen', () => {
    // 57 gallery entries existed before the migration; none may be dropped.
    const total = projects.reduce((n, p) => n + p.images.screens.length, 0);
    expect(total).toBeGreaterThanOrEqual(57);
  });

  it('gives every screen a real source path and natural size', () => {
    for (const p of projects) {
      for (const s of p.images.screens) {
        // Regenerated windows live one level deeper, under a `screens/` subdirectory.
        expect(s.src, `${p.slug} screen src`).toMatch(/^\/projects\/[\w-]+\/(screens\/)?[\w.-]+$/);
        expect(s.width, `${p.slug} ${s.src} width`).toBeGreaterThan(0);
        expect(s.height, `${p.slug} ${s.src} height`).toBeGreaterThan(0);
      }
    }
  });

  it('never repeats the same source twice within one project', () => {
    for (const p of projects) {
      const srcs = p.images.screens.map((s) => s.src);
      expect(new Set(srcs).size, `${p.slug} has a duplicate screen`).toBe(srcs.length);
    }
  });
});
