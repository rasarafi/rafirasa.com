/**
 * Honest lifecycle state. Displayed on every card and case-study header, so it
 * is stored explicitly rather than inferred from `links.live` — the inference
 * scattered this logic across the view layer and made the honesty rules in
 * docs/superpowers/specs/2026-07-30-portfolio-redesign-design.md unenforceable.
 */
export type ProjectStatus =
  | 'live'
  | 'staging'
  | 'pre-pilot'
  | 'demo'
  | 'unlaunched'
  | 'archived'
  | 'offline';

/** Visual grouping for ProjectStatus — drives the three-colour legend. */
export type StatusTone = 'positive' | 'pending' | 'muted';

/** A rectangle inside a source image, in that image's own pixels. */
export type CropRect = { x: number; y: number; w: number; h: number };

/**
 * One screen in a project's tour. Replaces the old bare `gallery: string[]`,
 * which could only ever produce decoration — a picture with no caption tells a
 * visitor nothing about what the screen is for.
 */
export type Screenshot = {
  src: string;
  /** Natural size in px. The crop math divides by these, and next/image needs them. */
  width: number;
  height: number;
  /** Plain-language headline: what a person DOES on this screen. */
  title: string;
  /** One or two sentences: what changed for them. Plain-language rules apply. */
  caption: string;
  /** What is literally visible. For screen readers. Never equal to `caption`. */
  alt: string;
  /**
   * An optional sub-region worth floating over a neighbouring screen in a
   * composite — one chart, a stat row, a report header. Omitted when no single
   * part of the screen is worth pulling out.
   */
  detail?: { rect: CropRect; alt: string };
};

/**
 * One scannable headline fact. Authored, never derived — the outcome numbers
 * (staff served, records, real payments, dates) live only in prose today and
 * cannot be computed from structured fields.
 */
export type ProjectFact = {
  label: string;
  value: string;
  note?: string;
  /** Data accent only; controls are always coral. */
  accent?: 'blue' | 'green' | 'amber' | 'violet';
};

export type Project = {
  slug: string;
  name: string;
  type: string;
  oneLiner: string;
  /**
   * One concrete, verifiable line for the home-page index card, where a name and
   * a category alone give a visitor no reason to click. Never adjectives — the
   * hook states what the system does or what it survived. Optional: only the
   * curated home grid needs one today.
   */
  hook?: string;
  description: string;
  tier: 'flagship' | 'standard' | 'minor' | 'ecosystem';
  status: ProjectStatus;
  /** Nuance a single status can't carry, e.g. "2 of 5 apps still active". */
  statusNote?: string;
  techTags: string[];
  /**
   * Overrides for the "Tech stack" section, for a project whose stack belongs to
   * one era of a longer story. Without them the ecosystem page listed
   * Java/C#/WinForms under a bare "Tech stack" heading, as if 2026 never
   * happened.
   */
  techStackTitle?: string;
  techStackNote?: { text: string; href?: string; linkLabel?: string };
  techStack: {
    languages: string[];
    frameworks: string[];
    data: string[];
    tools: string[];
  };
  highlights: string[];
  /** Authored headline facts for `FactStrip`. Omitted or empty renders no strip. */
  facts?: ProjectFact[];
  hardProblems: {
    challenge: string;
    solution: string;
  }[];
  keyDecisions: {
    decision: string;
    chose: string;
    over: string;
    because: string;
  }[];
  links?: {
    github?: string;
    live?: string;
  };
  images: {
    thumbnail: string;
    objectPosition?: string;
    /** Self-hosted MP4 walkthrough; the thumbnail is its poster. */
    video?: string;
    /** Ordered tour. Replaces `gallery: string[]`. */
    screens: Screenshot[];
  };
  hidden?: boolean;
  parentSlug?: string;
  /** Authored "what shipped recently" entry for `RecentWork`. Omitted renders no section. */
  recentWork?: RecentWorkEntry;
};

/** A dated "what shipped recently" entry. Authored; proves the project is
 *  alive, which is a different signal from proving it exists. */
export type RecentWorkEntry = { when: string; title: string; items: string[] };

export type SkillGroup = {
  title: string;
  items: string[];
};

export type WorkEntry = {
  role: string;
  company: string;
  location: string;
  period: string;
  highlights?: string[];
  /**
   * Pre-engineering roles that still belong on the record but no longer deserve
   * a card each. Collapsed into a single "Earlier" entry at the end of the
   * experience list.
   */
  compact?: boolean;
};

export type FreelanceEntry = {
  client: string;
  project: string;
  tech: string;
  status: string;
};

export type ConsultationEntry = {
  role: string;
  client: string;
  date: string;
  summary: string;
};

export type Education = {
  degree: string;
  institution: string;
  year: string;
};

export type Certification = {
  name: string;
  issuer: string;
  date: string;
};

export type Publication = {
  title: string;
  venue: string;
  date: string;
  coAuthors?: string[];
};

export type Recognition = {
  title: string;
  organizer: string;
  year: string;
};

export type PipelineNode = {
  slug: string;
  name: string;
  role: string;
  shortDesc: string;
  /**
   * Abbreviated label for the pipeline drawing, where the full name would
   * overflow its node. Still plain English — never an internal code.
   */
  diagramLabel?: string;
  /**
   * The substance, for the case study's application cards.
   *
   * `shortDesc` is the hook the duel card shows; both surfaces live on the
   * ecosystem page, so reusing one string printed the same paragraph twice.
   * This one goes a level deeper — architecture, not pitch.
   */
  detail?: string;
};

/** A 2026 rebuild. `supersedes` lists the legacy slugs it actually retired. */
export type RebuiltNode = PipelineNode & {
  supersedes: string[];
};

/**
 * One of the two eras the pipeline diagram is drawn across. `lead` is the
 * headline claim (rendered emphasised); `stats` are the supporting facts.
 */
export type EraId = 'legacy' | 'rebuilt';

export type Era = {
  id: EraId;
  tag: string;
  lead: string;
  stats: string[];
};

export type SharedPattern = {
  name: string;
  description: string;
  usedBy: string[];
};

export type ImpactStat = {
  value: string;
  label: string;
};
