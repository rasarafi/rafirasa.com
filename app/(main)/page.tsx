import type { Metadata } from 'next';

import PipelineDiagram from '@/components/ecosystem/PipelineDiagram';
import FlagshipShowcase from '@/components/home/FlagshipShowcase';
import HomeHero from '@/components/home/HomeHero';
import ProjectIndexGrid from '@/components/home/ProjectIndexGrid';
import SkillsSection from '@/components/home/SkillsSection';
import Container from '@/components/ui/Container';
import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionHeading from '@/components/ui/SectionHeading';
import SoftWash from '@/components/ui/SoftWash';
import StatTile from '@/components/ui/StatTile';
import { flagshipProjects, standardProjects, visibleProjects } from '@/data/projects';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

/**
 * Home page composition, per the approved Biscuit Aurora spec:
 * hero → pipeline diagram → stat band → flagships → project index → skills →
 * contact.
 */

/**
 * The three headline systems, in a deliberate order: commercial work with a
 * production AI story first, visual client proof second, the engine behind the
 * method as the closer.
 *
 * The order is `flagshipOrder` in `data/projects.ts`, shared with the gallery so
 * the two pages cannot drift. The data platform is deliberately absent — the
 * pipeline card above is its presence on this page, and repeating it 400px
 * later read as padding.
 */
const SHOWCASE = flagshipProjects;

/**
 * The seven cards under the flagships, curated rather than sliced.
 *
 * Data order put three satellites of the same platform in the top row, directly
 * under the pipeline card that already covers it. One representative stands for
 * that platform here; its siblings live in the gallery.
 */
const HOME_GRID_SLUGS = [
  'ru-rokeya-hall',
  'smart-care-mobile',
  'hr-management-system',
  'entrepreneur-lab',
  'entresoft',
  'bd-llm',
  'onupom-shopno',
];

const HOME_GRID = HOME_GRID_SLUGS.map(
  (slug) => standardProjects.find((p) => p.slug === slug)!,
);

const STATS = [
  { value: '17', label: 'applications in production', accent: 'blue' as const },
  { value: '1M+', label: 'field records processed', accent: 'coral' as const },
  // Was "1,858 automated tests on one platform" — that is the pre-pilot AI
  // workspace's number, and a system with no external users should not own a
  // home-page headline stat.
  { value: '106K+', label: 'lines sole-authored on one client platform', accent: 'violet' as const },
  { value: '0', label: 'mismatches in golden validation', accent: 'green' as const },
];

export default function Home() {
  return (
    <div className="relative">
      <SoftWash />

      <Container>
        <HomeHero />

        <section aria-labelledby="pipeline-heading" className="pt-6">
          <h2 id="pipeline-heading" className="sr-only">
            The system I am known for
          </h2>
          <ScrollReveal>
            <PipelineDiagram />
          </ScrollReveal>
        </section>

        <section aria-label="By the numbers" className="pt-5">
          <ScrollReveal>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {STATS.map((stat) => (
                <StatTile
                  key={stat.label}
                  value={stat.value}
                  label={stat.label}
                  accent={stat.accent}
                />
              ))}
            </div>
          </ScrollReveal>
        </section>

        <section id="projects" className="pt-20 sm:pt-24">
          <ScrollReveal>
            <SectionHeading
              eyebrow="SELECTED WORK"
              title="Flagship systems"
              intro="Architecture by hand. Implementation by directed agents. Proof by tests."
            />
          </ScrollReveal>
          <div className="mt-9 flex flex-col gap-6">
            {SHOWCASE.map((project, i) => (
              <ScrollReveal key={project.slug} delay={i * 0.05}>
                <FlagshipShowcase project={project} flip={i % 2 === 1} />
              </ScrollReveal>
            ))}
          </div>
        </section>

        <section className="pt-20 sm:pt-24">
          <ScrollReveal>
            <SectionHeading
              eyebrow="THE REST OF IT"
              title="Everything else I've shipped"
              intro="Web, mobile and desktop — client platforms, internal tools, and a few things I built for myself."
              accent="violet"
            />
          </ScrollReveal>
          <div className="mt-8">
            <ScrollReveal>
              <ProjectIndexGrid projects={HOME_GRID} total={visibleProjects.length} />
            </ScrollReveal>
          </div>
        </section>
      </Container>

      {/* The closing call to action lives in the footer now, so there is no
          second email block immediately above it. */}
      <SkillsSection />
    </div>
  );
}
