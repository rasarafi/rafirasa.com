import Link from 'next/link';

import Container from '@/components/ui/Container';

const SITE = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Work' },
  { href: '/about', label: 'About' },
];

// No mailto here on purpose: the coral button is the email call to action, and a
// second one in the same footer is padding. An e2e test guards the count.
const ELSEWHERE = [
  { href: 'https://www.linkedin.com/in/rafi-irtiza-rasa-248057a9/', label: 'LinkedIn' },
  { href: 'https://github.com/rasarafi', label: 'GitHub' },
];

const LINK_CLASS =
  'text-[14.5px] text-current no-underline opacity-70 transition-opacity hover:opacity-100';

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-3 font-mono text-[11px] tracking-[0.6px] opacity-45">{children}</h3>
  );
}

/**
 * Closing call to action plus the site's own links. Inverted to `--text` so the
 * page ends deliberately rather than trailing off.
 *
 * The link block is split into named columns rather than one flat row: the flat
 * version carried four links and read as an afterthought. Everything added here
 * is a real destination — the résumé PDF, the remaining page, and the case study
 * for this site — not padding.
 */
export default function Footer() {
  return (
    <footer className="mt-24 bg-text text-bg">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <h2 className="max-w-[24ch] font-display text-[28px] font-bold leading-[1.1] tracking-[-1px] sm:text-[34px] sm:tracking-[-1.2px]">
              Let&apos;s build something that ships.
            </h2>
            <p className="mt-3 max-w-[52ch] text-[15.5px] opacity-70">
              Open to senior software and AI-engineering roles. Based in Dhaka, working with teams
              anywhere.
            </p>
          </div>
          <div className="flex flex-col items-start gap-3 lg:items-end">
            <a
              href="mailto:info@rafirasa.com"
              className="inline-flex shrink-0 items-center justify-center rounded-full bg-coral px-[30px] py-[15px] text-[16px] font-semibold text-white no-underline transition-opacity duration-200 hover:opacity-90"
            >
              info@rafirasa.com
            </a>
            <a
              href="/Rasa-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[13px] text-current no-underline opacity-70 transition-opacity hover:opacity-100"
            >
              Download résumé (PDF) ↓
            </a>
          </div>
        </div>

        <div className="mt-12 grid gap-8 border-t border-white/12 pt-9 sm:grid-cols-2 lg:grid-cols-4">
          <nav aria-label="Site">
            <ColumnHeading>SITE</ColumnHeading>
            <ul className="flex flex-col gap-2">
              {SITE.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={LINK_CLASS}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Elsewhere">
            <ColumnHeading>ELSEWHERE</ColumnHeading>
            <ul className="flex flex-col gap-2">
              {ELSEWHERE.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={LINK_CLASS}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="sm:col-span-2">
            <ColumnHeading>THIS SITE</ColumnHeading>
            <p className="max-w-[46ch] text-[14.5px] opacity-70">
              Next.js, Tailwind and Framer Motion, statically generated. Architected by hand and
              built with directed agents, like everything else here.
            </p>
            <Link
              href="/projects/portfolio-app"
              className="mt-3 inline-block font-mono text-[13px] text-current no-underline opacity-70 transition-opacity hover:opacity-100"
            >
              Read its case study →
            </Link>
          </div>
        </div>

        <p className="mt-10 font-mono text-[11.5px] opacity-50">
          &copy; {new Date().getFullYear()} Rafi Irtiza Rasa · Dhaka, Bangladesh
        </p>
      </Container>
    </footer>
  );
}
