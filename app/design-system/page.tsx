import type { Metadata } from 'next';

import PipelineDiagram from '@/components/ecosystem/PipelineDiagram';
import ClaimBand from '@/components/project/ClaimBand';
import Composite from '@/components/project/Composite';
import CropFrame from '@/components/project/CropFrame';
import HeroMedia from '@/components/project/HeroMedia';
import ScreenSkeleton from '@/components/project/ScreenSkeleton';
import Card from '@/components/ui/Card';
import Chip from '@/components/ui/Chip';
import Container from '@/components/ui/Container';
import ProjectPlaceholder from '@/components/ui/ProjectPlaceholder';
import SectionHeading from '@/components/ui/SectionHeading';
import SoftWash from '@/components/ui/SoftWash';
import StatTile from '@/components/ui/StatTile';
import StatusPill from '@/components/ui/StatusPill';
import TintedTag from '@/components/ui/TintedTag';
import { projects } from '@/data/projects';
import { pairComposites } from '@/lib/composites';
import { ACCENTS, accentFor, needsPlaceholder } from '@/lib/project-display';
import type { ProjectStatus } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Design system — Biscuit Aurora',
  robots: { index: false, follow: false },
};

const ALL_STATUSES: ProjectStatus[] = [
  'live',
  'staging',
  'pre-pilot',
  'demo',
  'unlaunched',
  'archived',
  'offline',
];

function Row({ title, note, children }: { title: string; note?: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line pt-8">
      <h3 className="font-display text-[19px] font-semibold tracking-[-0.3px]">{title}</h3>
      {note && <p className="mt-1 max-w-[70ch] text-[14.5px] text-text-2">{note}</p>}
      <div className="mt-5">{children}</div>
    </section>
  );
}

/**
 * Living style guide for the Biscuit Aurora primitives. Not indexed, not linked
 * from the site — it exists so every primitive can be checked in both themes and
 * at every viewport without hunting for a page that happens to use it.
 */
export default function DesignSystemPage() {
  const placeholderProjects = projects.filter(needsPlaceholder).slice(0, 5);
  const noVideoStill = projects.find((p) => p.slug === 'bd-llm');
  const cropSource = projects.find((p) => p.slug === 'jarvis')?.images.screens[0];

  // No project has a `detail` field yet, so `pairComposites` would return
  // `float: null` for every real project today — that would prove nothing here.
  // Build a demo pair by hand: base is jarvis's first screen, float is a
  // hand-cropped detail from its second (a *different* screen), rect chosen
  // well inside that screen's real 956×576 pixels.
  const jarvisScreens = projects.find((p) => p.slug === 'jarvis')?.images.screens ?? [];
  const claimBandScreens = projects.find((p) => p.slug === 'smart-care-mobile')?.images.screens ?? [];
  const claimBandPairs = pairComposites(claimBandScreens.slice(1), 3);
  const compositeDemo =
    jarvisScreens.length >= 2
      ? {
          base: jarvisScreens[0],
          float: {
            src: jarvisScreens[1].src,
            srcWidth: jarvisScreens[1].width,
            srcHeight: jarvisScreens[1].height,
            rect: { x: 120, y: 90, w: 480, h: 280 },
            alt: 'CropFrame demonstration detail',
          },
        }
      : null;

  return (
    <main className="relative min-h-screen pb-32 pt-12">
      <SoftWash />
      <Container className="flex flex-col gap-12">
        <header>
          <p className="font-mono text-[12px] tracking-[0.6px] text-coral">DESIGN SYSTEM</p>
          <h1 className="mt-2 font-display text-[38px] font-bold leading-[1.06] tracking-[-1.4px] sm:text-[48px]">
            Biscuit Aurora primitives
          </h1>
          <p className="mt-3 max-w-[68ch] text-[17px] text-text-2">
            Every shared component, every accent, and the awkward cases — long labels, single
            items, and the ten projects with no screenshot. Toggle the theme to check both.
          </p>
        </header>

        <Row title="Palette" note="Five semantic accents. Green, amber and grey are reserved for status and must not be used decoratively.">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
            {ACCENTS.map((accent) => (
              <div key={accent} className="rounded-[var(--radius)] border border-line bg-surface p-4">
                <TintedTag accent={accent}>{accent}</TintedTag>
              </div>
            ))}
          </div>
        </Row>

        <Row
          title="Pipeline diagram (signature element)"
          note="Click or tab to a node. Retired apps are dashed; dashed coral arrows point only at rebuilds that actually replaced something."
        >
          <PipelineDiagram />
        </Row>

        <Row
          title="CropFrame"
          note="One rectangle of a source image, scaled to fill its frame. The image renders wider than the frame on purpose — max-w-none overrides the global img reset."
        >
          <div className="max-w-[420px]">
            {cropSource && (
              <CropFrame
                src={cropSource.src}
                srcWidth={cropSource.width}
                srcHeight={cropSource.height}
                rect={{ x: 0, y: 0, w: 400, h: 220 }}
                alt="CropFrame demonstration"
                className="rounded-[var(--radius-md)] border border-line"
              />
            )}
          </div>
        </Row>

        <Row
          title="Composite"
          note="A base screen with a cropped detail from a different screen floating over it — the signature element of the v5 case study. Overlaps the base above 960px, stacks below it under 960px. The float stays position: relative at every width — never static."
        >
          <div className="max-w-[620px]">{compositeDemo && <Composite pair={compositeDemo} />}</div>
        </Row>

        <Row
          title="ClaimBand"
          note="Claim paired with a composited mockup. Copy always comes first in the DOM — the reading order is claim-then-picture — while `lg:order-2` alone flips the visual side by index. Real projects have no `detail` field yet, so `float` is `null` here; that is expected."
        >
          <div className="flex flex-col">
            {claimBandPairs.map((pair, i) => (
              <ClaimBand key={pair.base.src} pair={pair} index={i} eyebrow={`Band ${i + 1}`} />
            ))}
          </div>
        </Row>

        <Row title="Type scale" note="Space Grotesk for display, Inter for body, JetBrains Mono for meta.">
          <div className="flex flex-col gap-2">
            <p className="font-display text-[48px] font-bold leading-[1.05] tracking-[-1.8px]">
              Display 48 — headline
            </p>
            <p className="font-display text-[33px] font-bold tracking-[-1px]">Display 33 — section</p>
            <p className="font-display text-[23px] font-bold tracking-[-0.5px]">Display 23 — card</p>
            <p className="text-[17px] text-text-2">
              Body 17 — the lede and case-study prose sit at this size.
            </p>
            <p className="text-[14.5px] text-text-2">Body 14.5 — card descriptions.</p>
            <p className="font-mono text-[12px] text-text-3">Mono 12 — labels, statuses, stats.</p>
          </div>
        </Row>

        <Row title="Status pills" note="All seven states. Only 'live' is green; nothing else may borrow it.">
          <div className="flex flex-wrap gap-2">
            {ALL_STATUSES.map((status) => (
              <StatusPill key={status} status={status} />
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {ALL_STATUSES.map((status) => (
              <StatusPill key={status} status={status} size="small" />
            ))}
          </div>
        </Row>

        <Row title="Chips" note="Tech tags stay neutral so accents keep their meaning. Wrapping is tested with a real 8-tag stack.">
          <div className="flex flex-wrap gap-[7px]">
            {(projects.find((p) => p.slug === 'jarvis')?.techTags ?? []).map((t) => (
              <Chip key={t}>{t}</Chip>
            ))}
          </div>
        </Row>

        <Row title="Stat tiles">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <StatTile value="17" label="apps in production" accent="blue" />
            <StatTile value="1M+" label="field records processed" accent="coral" />
            <StatTile value="1,858" label="automated tests on the AI workspace" accent="violet" />
            <StatTile value="0" label="mismatches in golden validation" accent="green" />
          </div>
        </Row>

        <Row title="Cards" note="Static, hover-lift, and whole-card link variants.">
          <div className="grid gap-4 lg:grid-cols-3">
            <Card className="p-6">
              <p className="font-display text-[19px] font-semibold">Static</p>
              <p className="mt-1 text-[14.5px] text-text-2">No hover affordance.</p>
            </Card>
            <Card interactive className="p-6">
              <p className="font-display text-[19px] font-semibold">Interactive</p>
              <p className="mt-1 text-[14.5px] text-text-2">Lifts on hover; action lives inside.</p>
            </Card>
            <Card href="/projects" className="p-6">
              <p className="font-display text-[19px] font-semibold">Link</p>
              <p className="mt-1 text-[14.5px] text-text-2">Whole card navigates.</p>
            </Card>
          </div>
        </Row>

        <Row
          title="Project placeholders"
          note="Ten projects have no screenshot, including both flagships. Accents cycle by position within each tier, so neighbouring cards never match — and green and amber are excluded because they mean 'live' and 'staging' elsewhere."
        >
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {placeholderProjects.map((p) => (
              <div key={p.slug}>
                <div className="aspect-[16/9] overflow-hidden rounded-[var(--radius)] border border-line">
                  <ProjectPlaceholder name={p.name} slug={p.slug} />
                </div>
                <p className="mt-2 text-[13px] text-text-2">{p.name}</p>
                <p className="font-mono text-[10.5px] text-text-3">{accentFor(p.slug)}</p>
              </div>
            ))}
          </div>
        </Row>

        <Row
          title="Section heading"
          note="Left and centred, with a long intro to check the measure holds."
        >
          <div className="flex flex-col gap-10">
            <SectionHeading
              eyebrow="THE HARD PARTS"
              title="Three problems worth writing down"
              intro="Every system has the parts that took the longest. These are the ones where the obvious approach was wrong, and the fix needed a different shape entirely."
            />
            <SectionHeading
              eyebrow="SELECTED WORK"
              title="Flagship systems"
              intro="Architecture by hand. Implementation by directed agents. Proof by tests."
              accent="violet"
              align="center"
            />
          </div>
        </Row>

        <Row
          title="State cycles"
          note="Four states every case study must survive, side by side: no screens at all, a screen still loading, a card carrying an unreasonably long title and URL, and a hero still with no play control because the project has no walkthrough video."
        >
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <div>
              <div className="aspect-[16/9] overflow-hidden rounded-[var(--radius)] border border-line">
                <ProjectPlaceholder name="No screens" slug="state-demo-no-screens" />
              </div>
              <p className="mt-2 text-[13px] text-text-2">No screens</p>
            </div>
            <div>
              {jarvisScreens[0] && (
                <ScreenSkeleton ratio={jarvisScreens[0].width / jarvisScreens[0].height} />
              )}
              <p className="mt-2 text-[13px] text-text-2">Loading</p>
            </div>
            <div>
              <Card className="p-4">
                <p className="font-display text-[15px] font-semibold [overflow-wrap:anywhere]">
                  Max Foundation Netherlands Global Content Platform Rebuild (Phase One)
                </p>
                <p className="mt-2 text-[12.5px] text-text-2 [overflow-wrap:anywhere]">
                  https://example.com/an/extremely/long/url/that/should/not/blow/out/the/layout
                </p>
              </Card>
              <p className="mt-2 text-[13px] text-text-2">Long title &amp; URL</p>
            </div>
            <div>
              {noVideoStill && (
                <div className="aspect-[16/9] overflow-hidden rounded-[var(--radius)] border border-line">
                  <HeroMedia
                    name={noVideoStill.name}
                    thumbnail={noVideoStill.images.thumbnail}
                    objectPosition={noVideoStill.images.objectPosition}
                  />
                </div>
              )}
              <p className="mt-2 text-[13px] text-text-2">No video, no play control</p>
            </div>
          </div>
        </Row>

        <Row
          title="Overflow stress test"
          note="A very long project name and an unbroken string — both must wrap or truncate rather than widen the page."
        >
          <div className="grid gap-4 lg:grid-cols-2">
            <Card className="p-6">
              <p className="font-display text-[19px] font-semibold">
                Max Foundation Netherlands Global Content Platform Rebuild (Phase One)
              </p>
              <p className="mt-2 break-words text-[14.5px] text-text-2">
                https://example.com/an/extremely/long/url/that/should/not/blow/out/the/layout/even/on/mobile
              </p>
            </Card>
            <Card className="flex items-center gap-3 p-6">
              <StatusPill status="pre-pilot" />
              <p className="min-w-0 truncate text-[14.5px] text-text-2">
                Truncating single line: this text is far too long for its container and must clip.
              </p>
            </Card>
          </div>
        </Row>
      </Container>
    </main>
  );
}
