import Link from 'next/link';

/**
 * Left-aligned hero: availability pill, headline with a coral accent phrase, the
 * lede, and two calls to action. Deliberately no avatar — the approved direction
 * leads with the claim, and the portrait lives on /about.
 */
export default function HomeHero() {
  return (
    <section className="pt-10 pb-8 sm:pt-14 lg:pt-16">
      <span className="mb-6 inline-flex items-center gap-[9px] rounded-full bg-green-bg px-[15px] py-[7px] font-mono text-[12.5px] text-green">
        <span className="status-dot block size-[7px] shrink-0 rounded-full bg-green" />
        17 applications in production · open to senior roles
      </span>

      <h1 className="max-w-[19ch] font-display text-[34px] font-bold leading-[1.06] tracking-[-1.2px] sm:text-[46px] sm:tracking-[-1.6px] lg:text-[58px] lg:tracking-[-1.8px]">
        I engineer production systems — and <span className="text-coral">direct the AI</span> that
        builds them.
      </h1>

      <p className="mt-6 max-w-[62ch] text-[17px] text-text-2 sm:text-[18.5px]">
        Six years hand-coding health systems used across rural Bangladesh, as the only engineer on
        them. Now I architect, direct{' '}
        <strong className="font-semibold text-text">Claude Code agents</strong> through
        implementation, and gate every merge with tests and parity checks — to the point of
        replacing <strong className="font-semibold text-text">my own legacy applications</strong>{' '}
        with AI-built successors.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/projects"
          className="inline-flex items-center justify-center rounded-full bg-coral px-[26px] py-[13px] text-[15px] font-semibold text-white transition-opacity duration-200 hover:opacity-90"
        >
          Explore the work
        </Link>
        <a
          href="mailto:info@rafirasa.com"
          className="inline-flex items-center justify-center rounded-full border border-line bg-surface px-[26px] py-[13px] text-[15px] font-semibold text-text transition-colors duration-200 hover:border-line-strong"
        >
          info@rafirasa.com
        </a>
      </div>
    </section>
  );
}
