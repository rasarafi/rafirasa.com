import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import EcosystemCaseStudy from '@/components/ecosystem/EcosystemCaseStudy';
import CaseStudyBody from '@/components/project/CaseStudyBody';
import CaseStudyClose from '@/components/project/CaseStudyClose';
import CaseStudyHeader from '@/components/project/CaseStudyHeader';
import CaseStudyNav from '@/components/project/CaseStudyNav';
import ClaimBand from '@/components/project/ClaimBand';
import FactStrip from '@/components/project/FactStrip';
import RecentWork from '@/components/project/RecentWork';
import StickyActionBar from '@/components/project/StickyActionBar';
import Container from '@/components/ui/Container';
import SoftWash from '@/components/ui/SoftWash';
import { projects, visibleProjects } from '@/data/projects';
import { bandCount, pairComposites } from '@/lib/composites';

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: 'Not found' };

  const title = `${project.name} — Rasa`;
  // Every project ships a composited 1200x675 thumbnail, so the link preview
  // shows the product itself rather than the site-wide card.
  const image = {
    url: project.images.thumbnail,
    width: 1200,
    height: 675,
    alt: `${project.name} — ${project.type}`,
  };

  return {
    title,
    description: project.oneLiner,
    alternates: { canonical: `/projects/${project.slug}/` },
    openGraph: {
      title,
      description: project.oneLiner,
      type: 'article',
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: project.oneLiner,
      images: [image.url],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) notFound();

  // Previous/next walk the visible list, so hidden sub-apps get no nav.
  const visibleIndex = visibleProjects.findIndex((p) => p.slug === slug);
  const prev = visibleIndex > 0 ? visibleProjects[visibleIndex - 1] : null;
  const next =
    visibleIndex >= 0 && visibleIndex < visibleProjects.length - 1
      ? visibleProjects[visibleIndex + 1]
      : null;

  const parent = project.parentSlug
    ? (projects.find((p) => p.slug === project.parentSlug) ?? null)
    : null;

  const isEcosystem = project.tier === 'ecosystem';
  const hasVideoHero = Boolean(project.images.video);

  // The composite hero takes screens[0], so bands normally draw from the
  // rest — otherwise the first band would repeat the hero image. But when a
  // video wins the hero slot instead (see CaseStudyHeader), no screen is
  // consumed there, so slicing off screens[0] here would strand it: it would
  // render nowhere on the page. `bandSourceScreens` is the single source of
  // truth for what's left for bands — bandCount is asked about exactly that
  // array's length, never the raw screen count, so the two can't drift apart.
  const screens = project.images.screens;
  const heroPair = screens.length > 0 ? pairComposites(screens, 1)[0] : null;
  const bandSourceScreens = hasVideoHero ? screens : screens.slice(1);
  const bands = bandCount(project.tier, bandSourceScreens.length);
  const bandPairs = bands > 0 ? pairComposites(bandSourceScreens, bands) : [];

  return (
    <div className="relative pb-20 pt-8 sm:pt-12 lg:pb-28">
      <SoftWash variant={isEcosystem ? 'page' : 'mesh'} />
      <Container>
        {isEcosystem ? (
          <EcosystemCaseStudy project={project} />
        ) : (
          <>
            <CaseStudyHeader project={project} parent={parent} heroPair={heroPair} />

            {project.facts && project.facts.length > 0 && (
              <div className="mt-9 lg:mt-12">
                <FactStrip facts={project.facts} />
              </div>
            )}

            {bandPairs.map((pair, i) => (
              <ClaimBand key={pair.base.src} pair={pair} index={i} />
            ))}

            {project.recentWork && (
              <RecentWork
                when={project.recentWork.when}
                title={project.recentWork.title}
                items={project.recentWork.items}
              />
            )}

            <CaseStudyBody project={project} />
          </>
        )}

        {/*
          The client's call to action closes every case study, ecosystem
          included — the bespoke ecosystem layout has no engineering region
          to sit after, but it still shouldn't drop straight into prev/next
          without inviting the next project.
        */}
        <CaseStudyClose />

        {visibleIndex !== -1 && <CaseStudyNav prev={prev} next={next} />}
      </Container>

      {!isEcosystem && (
        <StickyActionBar
          name={project.name}
          liveHref={project.links?.live}
          watchSelector="#hero-actions"
        />
      )}
    </div>
  );
}
