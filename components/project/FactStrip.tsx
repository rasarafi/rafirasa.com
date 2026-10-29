import { cn } from '@/lib/utils';
import type { ProjectFact } from '@/lib/types';

const ACCENT = {
  blue: 'text-blue',
  green: 'text-green',
  amber: 'text-amber',
  violet: 'text-violet',
} as const;

/**
 * The scannable answer to "is this real and how big is it", above any prose.
 * Figures use tabular numerals so counts line up column to column.
 * Renders nothing when there are no authored facts — no empty shell.
 */
export default function FactStrip({ facts }: { facts: ProjectFact[] }) {
  if (facts.length === 0) return null;

  return (
    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-lg)] border border-line bg-line shadow-[var(--shadow)] lg:grid-cols-4">
      {facts.map((fact) => (
        <div key={fact.label} className="bg-surface p-5 sm:p-6">
          <dt className="font-mono text-[10.5px] tracking-[0.5px] text-text-3">{fact.label}</dt>
          <dd
            className={cn(
              'mt-2 font-display text-[26px] font-bold leading-[1.05] tracking-[-1px] tabular-nums sm:text-[30px]',
              fact.accent && ACCENT[fact.accent],
            )}
          >
            {fact.value}
          </dd>
          {fact.note && (
            <dd className="mt-2 text-[13.5px] leading-[1.45] text-text-2">{fact.note}</dd>
          )}
        </div>
      ))}
    </dl>
  );
}
