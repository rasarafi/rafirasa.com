import type { Metadata } from 'next';

import ProjectsPageClient from '@/components/projects/ProjectsPageClient';
import Container from '@/components/ui/Container';
import ScrollReveal from '@/components/ui/ScrollReveal';
import SoftWash from '@/components/ui/SoftWash';
import { visibleProjects } from '@/data/projects';

export const metadata: Metadata = {
  title: 'Projects — Rasa',
  description:
    'Twenty projects across healthcare, fintech, AI and enterprise platforms — each labelled with its real status.',
  alternates: { canonical: '/projects/' },
};

export default function ProjectsPage() {
  return (
    <div className="relative pb-20 pt-10 sm:pt-14 lg:pb-28 lg:pt-16">
      <SoftWash />
      <Container>
        <ScrollReveal>
          <header className="max-w-[50ch]">
            {/*
              "Honestly labelled" used to be the headline here and on the home
              page. It was cut: the status pill on every card demonstrates it,
              and announcing it read as protesting too much.
            */}
            <h1 className="font-display text-[32px] font-bold leading-[1.06] tracking-[-1.2px] sm:text-[42px] sm:tracking-[-1.6px] lg:text-[48px]">
              {visibleProjects.length} projects, <span className="text-coral">six years</span>.
            </h1>
            <p className="mt-4 text-[17px] text-text-2 sm:text-[18px]">
              Systems across Android, desktop and web — enterprise information systems, healthcare
              platforms, AI infrastructure. Six years hand-built, the last two AI-orchestrated:
              every one architected by me, implemented with directed agents, and gated by tests.
            </p>
            <p className="mt-3 font-mono text-[12.5px] text-text-3">
              Filter by the technology behind them.
            </p>
          </header>
        </ScrollReveal>

        <div className="mt-10">
          <ProjectsPageClient projects={visibleProjects} />
        </div>
      </Container>
    </div>
  );
}
