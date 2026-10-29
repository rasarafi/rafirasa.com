import Link from 'next/link';

import Card from '@/components/ui/Card';
import Chip from '@/components/ui/Chip';
import SectionHeading from '@/components/ui/SectionHeading';
import type { Project } from '@/lib/types';

/**
 * Case-study body: the engineering depth — description prose, the hard
 * problems, the trade-offs, and the stack.
 *
 * The product-facing "what it is" pitch now lives in the hero and the claim
 * bands above this component, so this whole region is demoted below a visual
 * break for the reader who wants the depth, not the pitch again.
 *
 * Every section is skipped when its data is absent — several projects (the
 * ecosystem included) carry no hardProblems or keyDecisions, and an empty
 * heading reads as a broken page.
 */

function Prose({ text }: { text: string }) {
  return (
    <div className="flex flex-col gap-[18px]">
      {text.split('\n\n').map((para, i) => (
        <p key={i} className="j max-w-[68ch] text-[16.5px] text-text-2">
          {para}
        </p>
      ))}
    </div>
  );
}

const STACK_GROUPS = [
  { key: 'languages', label: 'LANGUAGES', accent: 'text-blue' },
  { key: 'frameworks', label: 'FRAMEWORKS', accent: 'text-violet' },
  { key: 'data', label: 'DATA', accent: 'text-green' },
  { key: 'tools', label: 'TOOLS', accent: 'text-amber' },
] as const;

export default function CaseStudyBody({ project }: { project: Project }) {
  const hasStack = STACK_GROUPS.some((g) => project.techStack[g.key]?.length > 0);

  return (
    // Full-bleed on purpose: Container above already applies the page gutter
    // (max-w-[1120px] px-5 sm:px-6 lg:px-7), so nesting another max-w/padding
    // pair here double-gutters the depth text at lg. Breaking out to the
    // viewport with the negative-margin trick (safe because `body` sets
    // `overflow-x: hidden` in globals.css) lets the bg-surface-2 panel go
    // edge-to-edge while the inner wrapper re-applies Container's exact
    // widths, so the depth text's left edge still lines up with the hero.
    <div className="relative left-1/2 right-1/2 mx-[-50vw] mt-20 w-screen border-t border-line bg-surface-2">
      <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-20 px-5 py-16 sm:px-6 sm:py-20 lg:px-7 lg:py-[96px]">
      <section>
        <p className="mb-3 font-mono text-[11.5px] tracking-[0.6px] text-coral">
          FOR THE ENGINEERS
        </p>
        <h2 className="max-w-[68ch] text-[15.5px] font-normal leading-[1.4] text-text-3">
          The reasoning underneath the product above — what it took to build, and why.
        </h2>
        <div className="mt-8">
          <Prose text={project.description} />
        </div>
      </section>

      {project.hardProblems.length > 0 && (
        <section>
          <SectionHeading
            eyebrow="THE HARD PARTS"
            title={
              project.hardProblems.length === 1
                ? 'The problem worth writing down'
                : `${project.hardProblems.length} problems worth writing down`
            }
            intro="The parts that took the longest — where the obvious approach was wrong."
          />
          <div className="mt-8 flex flex-col gap-5">
            {project.hardProblems.map((problem, i) => (
              <Card key={i} className="p-7 sm:p-8">
                <span className="mb-4 inline-grid size-[26px] place-items-center rounded-[var(--radius-sm)] bg-surface-2 font-mono text-[12px] text-text-3">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
                  <div>
                    <span className="mb-[11px] inline-flex rounded-full bg-coral-bg px-[11px] py-[4px] font-mono text-[11.5px] tracking-[0.5px] text-coral">
                      CHALLENGE
                    </span>
                    <p className="text-[15.5px] text-text-2">{problem.challenge}</p>
                  </div>
                  <div>
                    <span className="mb-[11px] inline-flex rounded-full bg-green-bg px-[11px] py-[4px] font-mono text-[11.5px] tracking-[0.5px] text-green">
                      SOLUTION
                    </span>
                    <p className="text-[15.5px] text-text-2">{problem.solution}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}

      {project.keyDecisions.length > 0 && (
        <section>
          <SectionHeading
            eyebrow="TRADE-OFFS"
            title="Key decisions"
            intro="What I chose, what I rejected, and why."
            accent="violet"
          />
          {/*
            Cards rather than a table. The previous table needed a 600px minimum
            width and horizontal scrolling on mobile; this form needs neither and
            reads better.
          */}
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {project.keyDecisions.map((decision) => (
              <Card key={decision.decision} className="flex flex-col p-6">
                <p className="mb-[14px] font-mono text-[11.5px] tracking-[0.5px] text-text-3">
                  {decision.decision.toUpperCase()}
                </p>

                <div className="mb-[9px] flex items-start gap-[10px]">
                  <svg width="16" height="16" viewBox="0 0 16 16" className="mt-[3px] shrink-0" aria-hidden="true">
                    <circle cx="8" cy="8" r="8" fill="var(--green-bg)" />
                    <path d="M5 8.5l2 2 4-4.5" stroke="var(--green)" strokeWidth="1.8" fill="none" strokeLinecap="round" />
                  </svg>
                  <span className="font-display text-[16.5px] font-semibold leading-[1.35]">
                    {decision.chose}
                  </span>
                </div>

                <div className="mb-[15px] flex items-start gap-[10px]">
                  <svg width="16" height="16" viewBox="0 0 16 16" className="mt-[3px] shrink-0" aria-hidden="true">
                    <circle cx="8" cy="8" r="8" fill="var(--surface-2)" />
                    <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="var(--text-3)" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                  <span className="text-[14.5px] text-text-3 line-through decoration-[var(--line-strong)]">
                    {decision.over}
                  </span>
                </div>

                <p className="mt-auto border-t border-line pt-[14px] text-[14.5px] text-text-2">
                  <span className="mb-[5px] block font-mono text-[11px] tracking-[0.5px] text-text-3">
                    BECAUSE
                  </span>
                  {decision.because}
                </p>
              </Card>
            ))}
          </div>
        </section>
      )}

      {hasStack && (
        <section>
          <SectionHeading
            eyebrow="BUILT WITH"
            title={project.techStackTitle ?? 'Tech stack'}
            accent="blue"
          />
          {project.techStackNote && (
            <p className="mt-3 max-w-[76ch] text-[15px] text-text-2">
              {project.techStackNote.text}
              {project.techStackNote.href && (
                <>
                  {' '}
                  <Link
                    href={project.techStackNote.href}
                    className="text-coral hover:underline hover:underline-offset-4"
                  >
                    {project.techStackNote.linkLabel ?? 'Read more'}
                  </Link>
                </>
              )}
            </p>
          )}
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STACK_GROUPS.map((group) => {
              const items = project.techStack[group.key];
              if (!items?.length) return null;
              return (
                <Card key={group.key} className="p-[22px]">
                  <h3 className={`mb-[14px] font-mono text-[11.5px] tracking-[0.5px] ${group.accent}`}>
                    {group.label}
                  </h3>
                  <ul className="flex flex-col gap-2">
                    {items.map((item) => (
                      <li key={item} className="text-[14.5px] text-text-2">
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              );
            })}
          </div>

          <div className="mt-6 flex flex-wrap gap-[7px]">
            {project.techTags.map((tag) => (
              <Chip key={tag}>{tag}</Chip>
            ))}
          </div>
        </section>
      )}
      </div>
    </div>
  );
}
