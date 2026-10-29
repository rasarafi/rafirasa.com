import type { Metadata } from 'next';
import Image from 'next/image';
import { Download } from 'lucide-react';

import Card from '@/components/ui/Card';
import Chip from '@/components/ui/Chip';
import Container from '@/components/ui/Container';
import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionHeading from '@/components/ui/SectionHeading';
import SoftWash from '@/components/ui/SoftWash';
import StatTile from '@/components/ui/StatTile';
import {
  certifications,
  consultations,
  education,
  freelanceWork,
  howIWork,
  publications,
  summary,
  workHistory,
} from '@/data/resume';

export const metadata: Metadata = {
  title: 'About — Rasa',
  description:
    'Software engineer and AI-orchestration lead with 6+ years of end-to-end ownership of production systems across Android, desktop and web.',
  alternates: { canonical: '/about/' },
};

const detailedRoles = workHistory.filter((job) => !job.compact);
const earlierRoles = workHistory.filter((job) => job.compact);

/** Derived, not typed, so the span cannot drift from the entries it summarises. */
const earlierSpan = (() => {
  const years = earlierRoles.flatMap((job) => job.period.match(/\d{4}/g) ?? []);
  return years.length > 0
    ? `${Math.min(...years.map(Number))} — ${Math.max(...years.map(Number))}`
    : '';
})();

const STATS = [
  { value: '6+', label: 'years shipping production systems', accent: 'blue' as const },
  { value: '17', label: 'applications in production', accent: 'coral' as const },
  { value: '1M+', label: 'field records processed', accent: 'violet' as const },
  { value: '8+', label: 'partner organizations served', accent: 'green' as const },
];

export default function AboutPage() {
  return (
    <div className="relative pb-20 pt-10 sm:pt-14 lg:pb-28 lg:pt-16">
      <SoftWash />
      <Container>
        <ScrollReveal>
          <header className="grid gap-9 lg:grid-cols-[1fr_auto] lg:items-start lg:gap-14">
            <div>
              <p className="font-mono text-[12px] tracking-[0.6px] text-coral">ABOUT</p>
              <h1 className="mt-3 font-display text-[32px] font-bold leading-[1.06] tracking-[-1.2px] sm:text-[42px] sm:tracking-[-1.5px] lg:text-[48px]">
                Rafi Irtiza Rasa
              </h1>
              <p className="mt-5 max-w-[68ch] text-[17px] text-text-2 sm:text-[18px]">{summary}</p>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="/Rasa-Resume.pdf"
                  download
                  className="inline-flex items-center gap-2 rounded-full bg-coral px-[24px] py-[12px] text-[14.5px] font-semibold text-white no-underline transition-opacity hover:opacity-90"
                >
                  <Download size={16} aria-hidden="true" />
                  Download résumé
                </a>
                <a
                  href="mailto:info@rafirasa.com"
                  className="inline-flex items-center rounded-full border border-line bg-surface px-[24px] py-[12px] text-[14.5px] font-semibold text-text no-underline transition-colors hover:border-line-strong"
                >
                  info@rafirasa.com
                </a>
              </div>
            </div>

            <div className="relative size-[150px] shrink-0 overflow-hidden rounded-full border border-line sm:size-[190px]">
              <Image
                src="/avatar.jpg"
                alt="Rafi Irtiza Rasa"
                fill
                priority
                sizes="190px"
                className="object-cover object-[center_35%]"
              />
            </div>
          </header>
        </ScrollReveal>

        <ScrollReveal>
          <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {STATS.map((stat) => (
              <StatTile key={stat.label} {...stat} />
            ))}
          </div>
        </ScrollReveal>

        {/*
          "How I work" sits directly under the stats, above the experience list.
          It spans the full width: the 5-minute overview video that shared this
          row was taken down on 2026-10-29 — it narrated the retired v2
          positioning, and the site was about to go to employers.
        */}
        <section className="pt-16 sm:pt-20">
          <ScrollReveal>
            <Card className="p-6 sm:p-7">
              <h2 className="font-display text-[20px] font-bold tracking-[-0.4px]">
                How I work
              </h2>
              <div className="mt-4 grid gap-[13px] lg:grid-cols-3 lg:gap-8">
                {howIWork.map((line) => (
                  <p key={line} className="text-[14.5px] leading-[1.6] text-text-2">
                    {line}
                  </p>
                ))}
              </div>
            </Card>
          </ScrollReveal>
        </section>

        <section className="pt-20">
          <ScrollReveal>
            <SectionHeading eyebrow="EXPERIENCE" title="Where I've worked" />
          </ScrollReveal>
          <div className="mt-8 flex flex-col gap-5">
            {detailedRoles.map((job) => (
              <ScrollReveal key={`${job.company}-${job.period}`}>
                <Card className="p-6 sm:p-7">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="font-display text-[20px] font-bold tracking-[-0.4px]">
                      {job.role}
                    </h3>
                    <span className="font-mono text-[12px] text-text-3">{job.period}</span>
                  </div>
                  <p className="mt-1 text-[15px] text-coral">{job.company}</p>
                  <p className="font-mono text-[11.5px] text-text-3">{job.location}</p>

                  {job.highlights && (
                    <ul className="mt-4 flex flex-col gap-[11px]">
                      {job.highlights.map((highlight) => (
                        <li key={highlight} className="flex gap-[10px] text-[14.5px] text-text-2">
                          <span className="mt-[8px] block size-[5px] shrink-0 rounded-full bg-line-strong" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  )}
                </Card>
              </ScrollReveal>
            ))}

            {/*
              Pre-engineering roles: still on the record, but a card each gave
              retail and an internship the same weight as six years of shipping.
            */}
            {earlierRoles.length > 0 && (
              <ScrollReveal>
                <Card className="p-6 sm:p-7">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="font-display text-[20px] font-bold tracking-[-0.4px]">Earlier</h3>
                    <span className="font-mono text-[12px] text-text-3">{earlierSpan}</span>
                  </div>
                  <ul className="mt-4 flex flex-col gap-[9px]">
                    {earlierRoles.map((job) => (
                      <li
                        key={`${job.company}-${job.period}`}
                        className="flex flex-wrap items-baseline gap-x-3 gap-y-[2px] text-[14.5px] text-text-2"
                      >
                        <span>
                          {job.role} — <span className="text-coral">{job.company}</span>
                        </span>
                        <span className="font-mono text-[11.5px] text-text-3">
                          {job.location} · {job.period}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </ScrollReveal>
            )}
          </div>
        </section>

        <section className="pt-20">
          <ScrollReveal>
            <SectionHeading
              eyebrow="FREELANCE"
              title="Client work"
              intro="Platforms shipped for clients alongside full-time work."
              accent="violet"
            />
          </ScrollReveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {freelanceWork.map((entry) => (
              <ScrollReveal key={`${entry.client}-${entry.project}`}>
                <Card className="flex h-full flex-col p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="min-w-0 font-display text-[16.5px] font-semibold tracking-[-0.3px]">
                      {entry.client}
                    </h3>
                    <span className="shrink-0 rounded-full bg-surface-2 px-[10px] py-[3px] font-mono text-[10.5px] text-text-2">
                      {entry.status}
                    </span>
                  </div>
                  <p className="mt-2 text-[14px] text-text-2">{entry.project}</p>
                  <p className="mt-auto pt-4 font-mono text-[11px] text-text-3">{entry.tech}</p>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </section>

        <section className="pt-20">
          <ScrollReveal>
            <SectionHeading
              eyebrow="CONSULTING"
              title="Data and analysis engagements"
              accent="blue"
            />
          </ScrollReveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {consultations.map((entry) => (
              <ScrollReveal key={`${entry.client}-${entry.date}`}>
                <Card className="h-full p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <h3 className="font-display text-[16.5px] font-semibold tracking-[-0.3px]">
                      {entry.role}
                    </h3>
                    <span className="font-mono text-[11.5px] text-text-3">{entry.date}</span>
                  </div>
                  <p className="mt-1 text-[14.5px] text-blue">{entry.client}</p>
                  <p className="mt-2 text-[14px] text-text-2">{entry.summary}</p>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </section>

        <section className="pt-20">
          <ScrollReveal>
            <SectionHeading eyebrow="BACKGROUND" title="Education and credentials" accent="green" />
          </ScrollReveal>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            <ScrollReveal>
              <Card className="h-full p-6">
                <h3 className="mb-4 font-mono text-[11.5px] tracking-[0.5px] text-green">
                  EDUCATION
                </h3>
                {education.map((entry) => (
                  <div key={entry.degree}>
                    <p className="font-display text-[15.5px] font-semibold leading-[1.35]">
                      {entry.degree}
                    </p>
                    <p className="mt-1 text-[14px] text-text-2">{entry.institution}</p>
                    <p className="font-mono text-[11.5px] text-text-3">{entry.year}</p>
                  </div>
                ))}
              </Card>
            </ScrollReveal>

            <ScrollReveal>
              <Card className="h-full p-6">
                <h3 className="mb-4 font-mono text-[11.5px] tracking-[0.5px] text-violet">
                  CERTIFICATIONS
                </h3>
                <ul className="flex flex-col gap-[13px]">
                  {certifications.map((cert) => (
                    <li key={cert.name}>
                      <p className="text-[14.5px] leading-[1.4] text-text">{cert.name}</p>
                      <p className="font-mono text-[11px] text-text-3">
                        {cert.issuer} · {cert.date}
                      </p>
                    </li>
                  ))}
                </ul>
              </Card>
            </ScrollReveal>

            <ScrollReveal>
              <Card className="h-full p-6">
                <h3 className="mb-4 font-mono text-[11.5px] tracking-[0.5px] text-coral">
                  PUBLICATIONS
                </h3>
                <ul className="flex flex-col gap-[13px]">
                  {publications.map((paper) => (
                    <li key={paper.title}>
                      <p className="text-[14.5px] leading-[1.4] text-text">{paper.title}</p>
                      <p className="font-mono text-[11px] text-text-3">
                        {paper.venue} · {paper.date}
                      </p>
                      {paper.coAuthors && paper.coAuthors.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-[6px]">
                          {paper.coAuthors.map((author) => (
                            <Chip key={author} size="small">
                              {author}
                            </Chip>
                          ))}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </Card>
            </ScrollReveal>
          </div>
        </section>

      </Container>
    </div>
  );
}
