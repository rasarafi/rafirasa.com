import type {
  WorkEntry,
  FreelanceEntry,
  ConsultationEntry,
  Education,
  Certification,
  Publication,
  Recognition,
} from '@/lib/types';

export const summary =
  "Software engineer with 6+ years of owning production systems end to end — phone apps, desktop tools and websites used daily by field teams, HR staff and clients, holding over a million records across four programmes. Since 2025 I work with AI coding agents as my implementation team: I set the architecture, write the specifications and check every result; the agents do the typing. That way of working delivered a full modernisation wave in 2026 — an analytics platform, an HR system, a learning platform and staff tools — each proven against the system it replaced before going live. Published researcher. B.Eng. in Mechatronics from Monash University.";

/**
 * How the solo setup is stated — capability framing, never absence.
 *
 * Decided in workspace/02-polishes/10: "no tester", "no team" and their cousins
 * announce a gap and read as "has never collaborated". The same fact told as
 * full-lifecycle ownership plus the people actually worked alongside answers the
 * "can they work in a team?" question before it is asked. Keep both halves — the
 * ownership sentence alone reads as isolation.
 */
export const howIWork = [
  'I own the full lifecycle. Requirements come from direct conversations with founders and program teams; architecture, implementation, testing, deployment, and years of operating what I shipped are all mine.',
  'Automated checks are my quality department — nothing goes live until they pass, and the side-by-side comparisons against old systems described on this site are the receipts.',
  'Solo on engineering is not solo at work: I ship alongside program staff, partner organizations, and external vendors from payment processors to trade-server providers.',
];

export const workHistory: WorkEntry[] = [
  {
    role: 'Software Engineer',
    company: 'Max Foundation Bangladesh',
    location: 'Dhaka, Bangladesh',
    period: 'Jan 2022 — Present',
    highlights: [
      'The only engineer for all software, apps, and data across 4 programs — used daily by 125+ people at 8+ partner organizations, including World Vision and Action Against Hunger',
      'Built and still run the five connected applications field teams use on phones, office desktops, and the web — over a million records collected, with new survey questions added by configuration instead of new code',
      'Replaced my own earlier work: one web analytics platform (the Digital Evidence Centre) took over from the desktop dashboards I hand-built years before. The child-growth calculations were re-checked against 5,000 real cases with zero differences, and it has grown from 2 field programs to 6',
      'Added a governed AI assistant to that platform: staff ask questions in plain language and the answer comes from running the dashboard\'s own charts, so the AI never makes up a number. Household details can never reach it, it can be switched off instantly per programme, every question is logged with what it cost, and it is tested against attempts to trick it before each release',
      'Directed AI agents through a 2026 modernization wave — the analytics platform, a browser version of the field data-collection app whose records are identical to the phone app\'s, and an admin panel for configuring the surveys — each gated by automated tests',
      'Took over a business system built by an outside vendor, wrote the architecture documentation it never had, added tiered pricing offers and order revisions with a permanent record of every change, and ran the staged switch to production',
      'Rebuilt the organization\'s decade-old HR system from scratch and ran the switchover, checking every migrated table line-for-line against the old database first (30 staff, 281 leave requests, 10,143 attendance records) — it is now the live system of record at hrm.mfbmis.net',
    ],
  },
  {
    role: 'Technical Consultant',
    company: 'Funded Academy → Titan Development',
    location: 'Dhaka, Bangladesh (remote)',
    period: 'Sep 2025 — Present',
    highlights: [
      'Retained by one owner across two companies: ran Funded Academy\'s trading platform from September 2025 until the firm closed in September 2026, and now build and look after Titan Development\'s platform for a New York construction firm',
      'Built Titan\'s public website, the editor its own staff use to publish projects, and a portal for its suppliers — one system, live since July 2026',
      'At Funded Academy: worked across the six separate sites and services the platform ran on, building daily from January 2026',
      'Built the trading firm\'s public website, staff admin panel, promotional campaign sites, and the shared service behind them — the customer-facing sites available in five languages',
      'Connected the platform to the MetaTrader 5 trading server: worked out its undocumented login handshake and confirmed it against the firm\'s live server',
      'Set up automatic checking of who is allowed to do what across every layer, plus one place to block an abusive visitor from all 5 sites at once, with threats flagged automatically',
      'Hardened the payment checkout so a confirmation claiming payment for less than the amount owed is rejected instead of granting access — written test-first',
      'Built AI tooling for the firm\'s day-to-day trading operations: an assistant that answers staff questions from a 482-topic internal handbook, always cites the source, and asks for confirmation before anything consequential — plus fraud-investigation aids for shared accounts, hidden locations, and multiple devices, used on real cases by the client\'s risk team',
    ],
  },
  {
    role: 'Systems Development Engineer',
    company: 'Max Foundation Bangladesh',
    location: 'Dhaka, Bangladesh',
    period: 'Nov 2019 — Dec 2021',
    highlights: [
      'Led the design and build of the software behind the Max NutriWASH nutrition and sanitation programme',
      'Built the first versions of the field data-collection app and the Healthy Village Tracker dashboard programme staff used to follow village progress',
      'Set the foundations the whole system still rests on: survey forms defined in the database rather than in code, and a sync that sends only what changed so field teams can work offline',
    ],
  },
  {
    role: 'Systems Development Engineer',
    company: 'BDWholeseller',
    location: 'Dhaka, Bangladesh',
    period: 'Apr 2019 — Sep 2019',
    highlights: [
      'Built the database system behind the wholesale business',
      'Built the Android app staff used and the service that fed it data',
    ],
  },
  {
    role: 'Consumer Technology Expert',
    company: 'David Jones',
    location: 'Sydney, Australia',
    period: 'Oct 2017 — Jan 2019',
    compact: true,
  },
  {
    role: 'SAP Operator',
    company: 'Robi Axiata Ltd.',
    location: 'Dhaka, Bangladesh',
    period: 'Feb 2016 — Jul 2016',
    compact: true,
  },
  {
    role: 'Engineering Intern',
    company: 'Ecosensa Technologies',
    location: 'Selangor, Malaysia',
    period: 'Nov 2014 — Feb 2015',
    compact: true,
  },
];

export const freelanceWork: FreelanceEntry[] = [
  {
    client: 'Rokeya Hall Alumni Network',
    project: 'Alumni network — member sign-up, events, and online membership payments',
    tech: 'React 19, Express 5, Prisma, MySQL',
    status: 'Live',
  },
  {
    client: 'Onupom Shopno',
    project: 'Scholarships, e-learning, and donor matching for students',
    tech: 'Laravel 11, Vue 3, MySQL',
    status: 'Live',
  },
  {
    client: 'BMSF',
    project: 'Website for a human-rights journalism organisation, written in Bangla first',
    tech: 'Astro 5, TypeScript, YAML content',
    status: 'Live',
  },
  {
    client: 'BD Muscle & Fitness',
    project: 'Online supplement store — built as a draft, never opened to shoppers',
    tech: 'Next.js 14, TypeScript, PostgreSQL',
    status: 'Concept',
  },
];

export const consultations: ConsultationEntry[] = [
  {
    role: 'Data Analyst',
    client: 'The World Bank',
    date: 'Aug 2024',
    summary: 'Checked and analysed the survey data for a study on what rural Bangladeshi households would pay for menstrual hygiene products',
  },
  {
    role: 'Data Specialist',
    client: 'BURO Bangladesh',
    date: 'Apr 2023',
    summary: 'Analysed 5,000+ survey responses to measure whether a basic health education programme changed people\'s habits',
  },
  {
    role: 'GIS Specialist',
    client: 'ACS International Limited',
    date: 'Jan — Mar 2017',
    summary: 'Mapped where climate-resilient water technologies were needed across 39 local areas of Khulna District',
  },
];

export const education: Education[] = [
  {
    degree: 'B.Eng. in Mechatronics, Robotics, and Automation Engineering',
    institution: 'Monash University Malaysia',
    year: '2011 — 2016',
  },
];

export const certifications: Certification[] = [
  {
    name: 'Google Data Analytics Professional Certificate',
    issuer: 'Google (Coursera)',
    date: 'Jun 2025',
  },
  {
    name: 'Agentic AI and AI Agents for Leaders Specialization',
    issuer: 'Vanderbilt University (Coursera)',
    date: 'Mar 2025',
  },
  {
    name: 'Software Engineering Specialization',
    issuer: 'HKUST (Coursera)',
    date: 'Sep 2023',
  },
];

export const publications: Publication[] = [
  {
    title: 'Democratising data insights for improved project monitoring and accountability',
    venue: '42nd WEDC International Conference',
    date: 'Sep 2021',
    coAuthors: ['K. A. Islam', 'M. Alam'],
  },
];

export const recognitions: Recognition[] = [];
