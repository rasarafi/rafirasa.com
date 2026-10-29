import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import EcosystemMiniPipeline from '@/components/projects/EcosystemMiniPipeline';
import { pipeline, rebuilds } from '@/data/ecosystem';
import { projects } from '@/data/projects';

/**
 * The gallery's mini pipeline positions nodes by slug. A node without geometry
 * would silently vanish from the drawing, so every data node must render, and
 * the drawing must agree with project data about what is retired.
 */
describe('ecosystem mini pipeline', () => {
  const html = renderToStaticMarkup(createElement(EcosystemMiniPipeline));

  it('draws one node per pipeline entry and per rebuild', () => {
    const rects = html.match(/<rect /g)?.length ?? 0;
    // One background rect plus one per node.
    expect(rects).toBe(1 + pipeline.length + rebuilds.length);
  });

  it('marks exactly the archived legacy apps as retired', () => {
    const archived = pipeline.filter(
      (n) => projects.find((p) => p.slug === n.slug)?.status === 'archived',
    ).length;
    expect(html.match(/>retired</g)?.length ?? 0).toBe(archived);
  });

  it('draws one replaced-by arrow per supersedes entry', () => {
    const expected = rebuilds.reduce((sum, r) => sum + r.supersedes.length, 0);
    expect(html.match(/stroke-\[var\(--coral\)\]/g)?.length ?? 0).toBe(
      expected + rebuilds.length,
    );
  });

  it('summarises the counts in its accessible name', () => {
    const stillActive = pipeline.filter(
      (n) => projects.find((p) => p.slug === n.slug)?.status !== 'archived',
    ).length;
    expect(html).toContain(`${stillActive} of ${pipeline.length} still active`);
  });
});
