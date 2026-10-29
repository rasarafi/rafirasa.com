import Container from '@/components/ui/Container';
import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { skills } from '@/data/skills';
import { ACCENT_DOT, ACCENT_TEXT } from '@/lib/accent-classes';
import { DECORATIVE_ACCENTS } from '@/lib/project-display';
import { cn } from '@/lib/utils';

/**
 * Grouped toolbox, drawn as a spec sheet rather than nine identical cards.
 *
 * The previous version was nine plain surfaces of grey chips: the information
 * landed, nothing else did. This keeps the same data and the same tokens but
 * gives the section an engineered read — a blueprint grid behind it, a numbered
 * accent rule per group, and tags styled as code tokens instead of pills. No new
 * colours and no glow: the brief was "technical", not "sci-fi".
 *
 * AI-Augmented Engineering leads the list in the data, so it keeps the first
 * slot, the tinted surface, and a double-width span on wide viewports.
 */
export default function SkillsSection() {
  return (
    <section id="skills" className="relative pt-20 sm:pt-24">
      {/*
        Blueprint grid. Decorative only, and masked so it fades out well before
        the section ends rather than competing with the cards on top of it.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] opacity-60 [mask-image:radial-gradient(120%_70%_at_50%_0%,black,transparent_78%)]"
        style={{
          backgroundImage:
            'linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />

      <Container className="relative">
        <ScrollReveal>
          <SectionHeading
            eyebrow="TOOLBOX"
            title="What I build with"
            intro="The tools, led by the ones I reach for now. The systems they built are above."
            accent="blue"
          />
        </ScrollReveal>

        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, i) => {
            const accent = DECORATIVE_ACCENTS[i % DECORATIVE_ACCENTS.length];
            const lead = i === 0;

            return (
              <ScrollReveal key={group.title} delay={Math.min(i, 3) * 0.04}>
                <article
                  className={cn(
                    'relative flex h-full flex-col overflow-hidden rounded-[var(--radius)] border border-line bg-surface p-5 pt-[18px]',
                    'transition-[border-color,box-shadow] duration-200 hover:border-line-strong hover:shadow-[var(--shadow)]',
                    // The lead group only gets the tinted surface. A wider span
                    // was tried and dropped: the even 3×3 grid is what makes the
                    // section read as a spec sheet.
                    lead && 'bg-surface-2',
                  )}
                >
                  {/* Accent rule down the left edge, matching the index colour. */}
                  <span
                    aria-hidden="true"
                    className={cn('absolute inset-y-0 left-0 w-[3px]', ACCENT_DOT[accent])}
                  />

                  <div className="flex items-baseline gap-[10px]">
                    <span
                      aria-hidden="true"
                      className={cn('font-mono text-[11px] tabular-nums', ACCENT_TEXT[accent])}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="min-w-0 font-display text-[16.5px] font-semibold tracking-[-0.3px]">
                      {group.title}
                    </h3>
                    <span className="h-px flex-1 bg-line" />
                    <span className="font-mono text-[11px] tabular-nums text-text-3">
                      {group.items.length}
                    </span>
                  </div>

                  <ul className="mt-4 flex flex-wrap gap-[6px]">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="whitespace-nowrap rounded-[var(--radius-sm)] border border-line bg-bg px-[10px] py-[4px] font-mono text-[11.5px] text-text-2"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
