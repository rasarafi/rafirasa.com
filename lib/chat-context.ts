import { projects } from '@/data/projects';
import { skills } from '@/data/skills';
import { summary, workHistory, freelanceWork, consultations, education, certifications, publications } from '@/data/resume';
import { pipeline, sharedPatterns, impactStats } from '@/data/ecosystem';
import type { Project } from '@/lib/types';

/**
 * Optional metadata some projects carry. Declared locally so the serializer keeps
 * compiling whether or not `Project` itself has grown these fields yet.
 */
type ProjectMeta = Project & { status?: string; devMethod?: string; year?: string };

/** Deployment / provenance line for a project — lets the bot answer "what's actually live?". */
function metaLine(p: Project): string {
  const m = p as ProjectMeta;
  const bits: string[] = [`Tier: ${p.tier}`];
  if (m.status) bits.push(`Status: ${m.status}`);
  if (m.devMethod) bits.push(`Built: ${m.devMethod}`);
  if (m.year) bits.push(`Year: ${m.year}`);
  if (p.links?.live) bits.push(`Live: ${p.links.live}`);
  if (p.links?.github) bits.push(`Source: ${p.links.github}`);
  if (p.hidden && p.parentSlug) bits.push(`Sub-app of ${p.parentSlug} — link to the parent, not this slug`);
  if (!m.status && !p.links?.live) bits.push('Status: not specified in data');
  return bits.join(' | ');
}

function buildPortfolioContext(): string {
  const sections: string[] = [];

  // --- Professional Summary ---
  sections.push(`Professional Summary\n${summary}`);

  // --- Ecosystem Project ---
  const eco = projects.find((p) => p.tier === 'ecosystem');
  if (eco) {
    const pipelineDesc = pipeline
      .map((n) => `${n.role}: ${n.name} — ${n.shortDesc}`)
      .join('\n');

    const patternsDesc = sharedPatterns
      .map((p) => `${p.name}: ${p.description}`)
      .join('\n');

    const statsDesc = impactStats.map((s) => `${s.value} ${s.label}`).join(', ');

    const subApps = projects
      .filter((p) => p.parentSlug === eco.slug)
      .map((p) => `- ${p.name} (${p.type}): ${p.oneLiner} [${metaLine(p)}]`)
      .join('\n');

    sections.push(
      `Ecosystem Project: ${eco.name} (slug: ${eco.slug})\n` +
        `${eco.type}\n` +
        `${metaLine(eco)}\n` +
        `${eco.description.split('\n')[0]}\n\n` +
        `Pipeline:\n${pipelineDesc}\n\n` +
        `Shared Architecture Patterns:\n${patternsDesc}\n\n` +
        `Impact: ${statsDesc}\n\n` +
        `Sub-Applications:\n${subApps}`
    );
  }

  // --- Flagship Projects ---
  const flagships = projects.filter((p) => p.tier === 'flagship');
  for (const p of flagships) {
    const desc = p.description.split('\n')[0];
    const techs = p.techTags.join(', ');
    const highlights = p.highlights.map((h) => `- ${h}`).join('\n');

    const problems = p.hardProblems
      .slice(0, 2)
      .map((hp) => `Challenge: ${hp.challenge}\nSolution: ${hp.solution}`)
      .join('\n');

    const decisions = p.keyDecisions
      .slice(0, 2)
      .map((kd) => `${kd.decision}: Chose ${kd.chose} over ${kd.over} — ${kd.because}`)
      .join('\n');

    sections.push(
      `Flagship Project: ${p.name} (slug: ${p.slug})\n` +
        `${p.type}\n` +
        `${metaLine(p)}\n` +
        `${desc}\n` +
        `Tech: ${techs}\n` +
        `Highlights:\n${highlights}\n` +
        `Hard Problems:\n${problems}\n` +
        `Key Decisions:\n${decisions}`
    );
  }

  // --- Standard Projects (visible only) ---
  const standards = projects.filter((p) => p.tier === 'standard' && !p.hidden);
  for (const p of standards) {
    const highlights = p.highlights.map((h) => `- ${h}`).join('\n');
    sections.push(
      `Project: ${p.name} (slug: ${p.slug})\n` +
        `${p.type}\n` +
        `${metaLine(p)}\n` +
        `${p.oneLiner}\n` +
        `Tech: ${p.techTags.join(', ')}\n` +
        `Highlights:\n${highlights}`
    );
  }

  // --- Minor Projects ---
  const minors = projects.filter((p) => p.tier === 'minor' && !p.hidden);
  for (const p of minors) {
    sections.push(
      `Project: ${p.name} (slug: ${p.slug})\n` +
        `${p.type}\n` +
        `${metaLine(p)}\n` +
        `${p.oneLiner}\n` +
        `Tech: ${p.techTags.join(', ')}`
    );
  }

  // --- Deployment Status Index (quick lookup for "what's live?") ---
  const statusIndex = projects
    .map((p) => `- ${p.name} (/projects/${p.slug}) — ${metaLine(p)}`)
    .join('\n');
  sections.push(
    `Deployment Status Index — every project, its tier, and where it stands.\n` +
      `Never upgrade a staging, demo, or pre-pilot project to "in production". Where status ` +
      `is not specified here, follow the deployment guardrails in the instructions and say ` +
      `you're not sure rather than guessing.\n${statusIndex}`
  );

  // --- Skills ---
  const skillsText = skills.map((g) => `${g.title}: ${g.items.join(', ')}`).join('\n');
  sections.push(`Technical Skills\n${skillsText}`);

  // --- Work Experience ---
  const workText = workHistory
    .map((w) => {
      const base = `${w.role} at ${w.company}, ${w.location} (${w.period})`;
      if (w.highlights) {
        return base + '\n' + w.highlights.map((h) => `- ${h}`).join('\n');
      }
      return base;
    })
    .join('\n\n');
  sections.push(`Work Experience\n${workText}`);

  // --- Freelance ---
  const freelanceText = freelanceWork
    .map((f) => `${f.client}: ${f.project} (${f.tech}) — ${f.status}`)
    .join('\n');
  sections.push(`Freelance Work\n${freelanceText}`);

  // --- Consultations ---
  const consultText = consultations
    .map((c) => `${c.role} for ${c.client} (${c.date}): ${c.summary}`)
    .join('\n');
  sections.push(`Consultations\n${consultText}`);

  // --- Education ---
  const eduText = education.map((e) => `${e.degree} — ${e.institution} (${e.year})`).join('\n');
  sections.push(`Education\n${eduText}`);

  // --- Certifications ---
  const certText = certifications.map((c) => `${c.name} — ${c.issuer} (${c.date})`).join('\n');
  sections.push(`Certifications\n${certText}`);

  // --- Publications ---
  if (publications.length > 0) {
    const pubText = publications
      .map((p) => {
        const authors = p.coAuthors ? ` (co-authors: ${p.coAuthors.join(', ')})` : '';
        return `"${p.title}" — ${p.venue}, ${p.date}${authors}`;
      })
      .join('\n');
    sections.push(`Publications\n${pubText}`);
  }

  // --- Contact ---
  sections.push(
    `Contact\nVisitors can reach Rasa via LinkedIn or email. Links are available on the portfolio site header and contact section.`
  );

  return sections.join('\n\n---\n\n');
}

export const PORTFOLIO_CONTEXT = buildPortfolioContext();
