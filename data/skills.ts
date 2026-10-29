import { SkillGroup } from '@/lib/types';

export const skills: SkillGroup[] = [
  {
    title: 'AI-Augmented Engineering',
    // "Prompt Engineering" was dropped: a commodity claim, not a tool. Anthropic
    // API belongs beside Claude Code — the whole method here is Claude-driven.
    items: ['Claude Code', 'Anthropic API', 'Agent Orchestration', 'RAG Pipelines', 'Qdrant', 'ChromaDB', 'OpenAI API', 'LLM Cost Engineering'],
  },
  {
    title: 'Languages',
    items: ['PHP', 'TypeScript', 'JavaScript', 'Python', 'Kotlin', 'Java', 'C#', 'SQL'],
  },
  {
    title: 'Frontend',
    items: ['React', 'Next.js', 'Vue 3', 'Tailwind CSS', 'Inertia.js', 'Vite', 'Alpine.js'],
  },
  {
    title: 'Backend',
    items: ['Laravel', 'FastAPI', 'Prisma', 'Drizzle', 'Eloquent', 'Filament', 'Sanctum'],
  },
  {
    title: 'Mobile',
    items: ['Android SDK', 'Jetpack Compose', 'Flutter', 'Koin', 'Retrofit', 'Firebase'],
  },
  {
    title: 'Desktop',
    items: ['WinForms', '.NET 4.8', 'EF6', 'iText7', 'ClosedXML', 'OpenXML'],
  },
  {
    title: 'Data',
    items: ['MySQL', 'PostgreSQL', 'SQLite', 'Redis', 'ECharts', 'Chart.js'],
  },
  {
    title: 'Testing',
    items: ['PHPUnit', 'Pest', 'Vitest', 'Playwright', 'JUnit', 'Selenium'],
  },
  {
    title: 'DevOps',
    items: ['Docker', 'Nginx', 'Git', 'PM2', 'Ploi', 'Prometheus/Grafana'],
  },
];
