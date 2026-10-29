import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

import { describe, expect, it } from 'vitest';

/**
 * Mechanical design-rule checks for the case-study v5 surface: no off-scale
 * radius, no revival of the rejected `--r-*` token family, and no action
 * element breaking the coral-only accent rule. These scan source text, not
 * rendered output, so they catch a class string before it ever ships.
 *
 * Scope is the v5 redesign's own surface — `components/project`,
 * `components/ecosystem`, and the case-study/design-system routes under
 * `app/` — not the whole `components/` tree. Older areas (`components/chat`,
 * `components/about`, some `components/ui` atoms) predate this branch and
 * carry their own raw-px radius debt; folding them in here would make this
 * suite fail for reasons this branch didn't cause. Widen the scope in a
 * follow-up once that debt is paid down.
 */

const ROOT = join(__dirname, '..', '..');
const SCAN_DIRS = [
  'components/project',
  'components/ecosystem',
  'app/(main)/projects',
  'app/design-system',
];

function collectFiles(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      collectFiles(full, out);
    } else if (entry.endsWith('.tsx') || entry.endsWith('.ts')) {
      out.push(full);
    }
  }
  return out;
}

const files = SCAN_DIRS.flatMap((dir) => collectFiles(join(ROOT, dir)));

const RADIUS_TOKENS = ['--radius-xs', '--radius-sm', '--radius-md', '--radius-lg', '--radius'];

describe('design rules (case-study v5 surface)', () => {
  it('scans a non-empty file set', () => {
    // Guards every check below from passing vacuously if the scope ever
    // stops resolving to real files (e.g. a directory gets renamed).
    expect(files.length).toBeGreaterThan(5);
  });

  it('uses only var(--radius…) tokens inside rounded-[...] arbitrary values, never a raw px', () => {
    const offenders: string[] = [];
    for (const file of files) {
      const text = readFileSync(file, 'utf8');
      const matches = text.matchAll(/rounded(?:-(?:t|b|l|r|tl|tr|bl|br))?-\[([^\]]+)\]/g);
      for (const m of matches) {
        const value = m[1];
        const usesToken = RADIUS_TOKENS.some((t) => value.includes(`var(${t})`));
        if (!usesToken) {
          offenders.push(`${file}: rounded-[${value}]`);
        }
      }
    }
    expect(offenders, offenders.join('\n')).toEqual([]);
  });

  it('never reintroduces the rejected --r-* radius token family', () => {
    const offenders: string[] = [];
    for (const file of files) {
      const text = readFileSync(file, 'utf8');
      if (/--r-(xs|sm|md|lg)\b/.test(text)) {
        offenders.push(file);
      }
    }
    expect(offenders, offenders.join('\n')).toEqual([]);
  });

  it('keeps <a> and <button> accents coral-only — no data-accent background on a control', () => {
    const bannedBg = ['bg-blue', 'bg-green', 'bg-amber', 'bg-violet'];
    const offenders: string[] = [];
    for (const file of files) {
      const text = readFileSync(file, 'utf8');
      // Grab each <a ...> / <button ...> opening tag's own attribute text
      // (non-greedy, no nested tags inside an opening tag), then match the
      // exact class token — not a substring, so `bg-blue-bg` tint classes on
      // badges never trip this.
      const tags = text.matchAll(/<(a|button)\b[^>]*?>/g);
      for (const tag of tags) {
        const tagText = tag[0];
        for (const banned of bannedBg) {
          const exact = new RegExp(`(^|[\\s"'\`{])${banned}([\\s"'\`}]|$)`);
          if (exact.test(tagText)) {
            offenders.push(`${file}: <${tag[1]}> carries ${banned}`);
          }
        }
      }
    }
    expect(offenders, offenders.join('\n')).toEqual([]);
  });
});
