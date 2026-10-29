import Link from 'next/link';

import Card from '@/components/ui/Card';
import Container from '@/components/ui/Container';
import SoftWash from '@/components/ui/SoftWash';
import StatusPill from '@/components/ui/StatusPill';
import { flagshipProjects } from '@/data/projects';

/**
 * Shared 404 body.
 *
 * Two not-found files need identical output: `app/not-found.tsx` catches URLs
 * that match no route at all, while `app/(main)/not-found.tsx` catches
 * `notFound()` thrown inside a (main) route, such as an unknown project slug.
 * Only the first has to supply its own chrome.
 */
export default function NotFoundContent() {
  return (
    <div className="relative pb-20 pt-16 sm:pt-24">
      <SoftWash variant="section" />
      <Container>
        <p className="font-mono text-[12px] tracking-[0.6px] text-coral">404</p>
        <h1 className="mt-3 max-w-[22ch] font-display text-[32px] font-bold leading-[1.06] tracking-[-1.2px] sm:text-[42px] sm:tracking-[-1.5px]">
          That page isn&apos;t here.
        </h1>
        <p className="mt-4 max-w-[56ch] text-[17px] text-text-2">
          The link may be out of date. Everything that exists is in{' '}
          <Link href="/projects" className="text-coral hover:underline hover:underline-offset-4">
            the project index
          </Link>
          , or start with one of these.
        </p>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {flagshipProjects.map((project) => (
            <Card
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="flex flex-col p-6"
            >
              <div className="flex items-start justify-between gap-3">
                <h2 className="min-w-0 font-display text-[18px] font-bold tracking-[-0.3px] text-text">
                  {project.name}
                </h2>
                <StatusPill status={project.status} size="small" />
              </div>
              <p className="mt-[6px] font-mono text-[11px] text-text-3">{project.type}</p>
              <p className="mt-3 text-[14px] text-text-2">{project.oneLiner}</p>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
}
