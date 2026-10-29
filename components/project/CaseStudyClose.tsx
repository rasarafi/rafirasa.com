import Link from 'next/link';

/**
 * The case study's closing pitch: after the depth (or, for the ecosystem, the
 * bespoke layout), close the loop with the client's own call to action rather
 * than dropping straight into prev/next navigation. Mirrors HomeHero's two-CTA
 * pattern — one filled coral action, one ghost — so the site has exactly one
 * "start a project" idiom, not a second invented one for this page.
 */
export default function CaseStudyClose() {
  return (
    <section
      data-case-study-close
      className="mt-20 border-t border-line pt-16 text-center sm:mt-24 sm:pt-20"
    >
      <h2 className="font-display text-[26px] font-bold leading-[1.12] tracking-[-0.9px] sm:text-[31px]">
        Need something like this?
      </h2>
      <p className="mx-auto mt-3 max-w-[50ch] text-[16px] text-text-2 sm:text-[17px]">
        Most of my work starts the same way: an organisation with years of real data and no good
        way to look at it.
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <a
          href="mailto:info@rafirasa.com"
          className="inline-flex items-center justify-center rounded-full bg-coral px-[26px] py-[13px] text-[15px] font-semibold text-white transition-opacity duration-200 hover:opacity-90"
        >
          Start a project
        </a>
        <Link
          href="/projects"
          className="inline-flex items-center justify-center rounded-full border border-line bg-surface px-[26px] py-[13px] text-[15px] font-semibold text-text transition-colors duration-200 hover:border-line-strong"
        >
          See other work
        </Link>
      </div>
    </section>
  );
}
