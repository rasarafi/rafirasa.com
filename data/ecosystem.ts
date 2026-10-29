import type { Era, ImpactStat, PipelineNode, RebuiltNode, SharedPattern } from '@/lib/types';

export const ecosystemSlug = 'mfb-mis-ecosystem';

export const pipeline: PipelineNode[] = [
  {
    slug: 'field-data-collection-app',
    name: 'Field Data Collection App',
    role: 'Collection',
    shortDesc:
      'The workhorse. An offline-first Android app that collected the 1M+ records — running all day on cheap, low-spec handsets in communities with no connectivity. New survey instruments deploy from database configuration, without an app release.',
    detail:
      'Built on a dynamic-field architecture: form definitions, validation rules and computed fields live in synced configuration tables rather than in code, so a new survey instrument is a database change, not an app release. One installation serves several programmes by switching project databases at runtime, and every sync is a password-encrypted delta ZIP sized for intermittent rural connectivity.',
  },
  {
    slug: 'digital-evidence-centre',
    name: 'Desktop Evidence Centre',
    diagramLabel: 'Evidence Centre',
    role: 'Management · desktop',
    shortDesc:
      'Desktop data management hub that syncs field-collected data to local SQLite, with dynamic multi-join query building across 12+ dataset types and metadata-driven export with type-specific transformations.',
    detail:
      'Builds multi-JOIN queries from server-defined metadata, resolving location tables, proxy data, review tables and computed columns at runtime across 12+ dataset types. Export is metadata-driven too — null replacement, computed columns, list expansion and date formatting applied as batch SQL against temporary tables rather than hand-written per report.',
  },
  {
    slug: 'healthy-village-tracker',
    name: 'Healthy Village Tracker',
    role: 'Monitoring',
    shortDesc:
      'Desktop MIS tracking 56 health program indicators across 6 geographic hierarchy levels with offline-first incremental sync and dynamic SQL view generation for multi-level aggregation. Since superseded by Digital Evidence Centre — the modern rebuild.',
    detail:
      'Tracked 56 programme indicators across a 6-level geographic hierarchy, generating SQL views dynamically so aggregation could follow any level of that hierarchy, over offline-first incremental sync. Retired in 2026.',
  },
  {
    slug: 'child-growth-dashboard',
    name: 'Child Growth Dashboard',
    role: 'Analytics & Reporting',
    shortDesc:
      'Cross-platform analytics combining a desktop application (C# WinForms) and web dashboard (PHP) implementing WHO Child Growth Standards, with z-score classification, multi-chart dashboards, and time-series trends for 10,000+ beneficiaries. Since superseded by Digital Evidence Centre — its z-score engine ported and golden-validated.',
    detail:
      'A C# desktop app and a PHP web dashboard over the WHO Child Growth Standards: indexed SQLite z-score lookups, 4-level organisational filtering, PDF and Excel export with embedded charts, and bitwise month-frequency encoding that reduced time-series aggregation from O(n·m) to O(1). Retired in 2026.',
  },
];

/**
 * The 2026 AI-orchestrated rebuilds, drawn as the second lane of the pipeline
 * diagram.
 *
 * `supersedes` is deliberately accurate rather than tidy: only the monitoring and
 * analytics apps were actually retired and replaced. The web field-data client
 * and the configuration console are additive — they sit alongside the desktop
 * apps that are still in production, writing into the same schema. Drawing them
 * as replacements would overstate the story.
 */
export const rebuilds: RebuiltNode[] = [
  {
    slug: 'mis-dcapp-web',
    name: 'Field Data Management Platform',
    diagramLabel: 'Field Data Management',
    role: 'Web client',
    shortDesc:
      'Browser-based field data entry that writes byte-compatibly into the same live MySQL schema the desktop application still uses, so both clients can run side by side.',
    detail:
      'A second client on the live database rather than a migration, so field operations never paused. Record IDs exceed the safe integer range, so the ID path runs bigint end-to-end; a config-driven mapper writes logical fields into the schema\'s generic value columns; and a review-state machine reverse-engineered from legacy data was verified against 5,783 existing rows before the write path shipped.',
    supersedes: [],
  },
  {
    slug: 'mis-dcapp-admin',
    name: 'Survey Configuration Console',
    diagramLabel: 'Survey Config Console',
    role: 'Configuration',
    shortDesc:
      'A multi-tenant admin panel that authors the database-driven form configuration across four project databases — replacing what used to be hand-written SQL.',
    detail:
      'Authors the configuration the whole platform reads — field lists, validation protocols, skip logic — across four project databases behind multi-tenant access control. It replaced hand-written SQL as the deployment mechanism for new survey instruments, which is what makes zero-code form deployment safe to hand to someone else.',
    supersedes: [],
  },
  {
    slug: 'mis-dash-web',
    name: 'Digital Evidence Centre',
    role: 'Monitoring & Analytics',
    shortDesc:
      'The proof. Max Foundation’s one-stop monitoring and analytics platform — bilingual, on the web, replacing two desktop apps. Its WHO z-score engine, ported from my own six-year-old C# code, proved faithful under golden validation: zero mismatches.',
    detail:
      'An incremental watermark sync materialises precomputed fact tables (first sync ~2 minutes, steady state under a second) and every chart is a server-side indexed aggregation, so raw rows never reach the browser. Charts and KPIs are typed config objects in a declarative registry, which makes programme differences data variants rather than branches in the code.',
    supersedes: ['healthy-village-tracker', 'child-growth-dashboard'],
  },
];

/**
 * The two bands that frame the pipeline drawing — one above the legacy lane, one
 * below the 2026 lane.
 *
 * The stats face each other on purpose: same system, same engineer, two ways of
 * working. Keep them paired (typed/directed, years/months, and so on) — an
 * unmatched line breaks the comparison the drawing is making.
 */
export const eras: Era[] = [
  {
    id: 'legacy',
    tag: '2019–25 — hand-built',
    lead: 'every line typed',
    stats: ['sole engineer', '6 years', '1M+ records'],
  },
  {
    id: 'rebuilt',
    tag: '2026 — AI-orchestrated',
    lead: 'every line directed',
    stats: ['tests gate every merge', 'months, not years', '0 mismatches'],
  },
];

export const sharedPatterns: SharedPattern[] = [
  {
    name: 'Dynamic Field Metadata System',
    description:
      'Dynamic Field architecture mapping logical field names to generic physical columns. Forms, validation, and business logic are database-driven — new survey instruments deploy via configuration changes without code changes or recompilation.',
    usedBy: ['field-data-collection-app', 'digital-evidence-centre'],
  },
  {
    name: 'Hierarchical Location System',
    description:
      'Up to 8-level geographic hierarchy (District → Upazila → Union → Ward → CSG → Courtyard → Household → Child) with dynamic table name resolution and location-based access control across all applications.',
    usedBy: [
      'field-data-collection-app',
      'digital-evidence-centre',
      'healthy-village-tracker',
      'child-growth-dashboard',
    ],
  },
  {
    name: 'Delta Sync Protocol',
    description:
      'Timestamp-based differential synchronization where clients send last-known update timestamps per table and servers return only newer rows in password-encrypted ZIP files. Minimizes bandwidth for intermittent-connectivity environments.',
    usedBy: ['field-data-collection-app', 'digital-evidence-centre', 'healthy-village-tracker'],
  },
  {
    name: 'WHO Growth Standards Engine',
    description:
      'Gender-specific z-score classification for stunting (height-for-age), wasting (weight-for-height), and underweight (weight-for-age) using reference lookup tables with multi-level threshold classification.',
    usedBy: ['digital-evidence-centre', 'child-growth-dashboard'],
  },
];

export const impactStats: ImpactStat[] = [
  { value: '1M+', label: 'Field data records' },
  { value: '125+', label: 'End users' },
  { value: '8+', label: 'Partner organizations' },
  { value: '6+', label: 'Years of development' },
  { value: '5', label: 'Original applications' },
];
