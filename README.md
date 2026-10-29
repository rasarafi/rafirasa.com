# rafirasa.com — portfolio

Source of my portfolio site, live at **[rafirasa.com](https://rafirasa.com)**.

It presents the production systems I've built (field-data apps, analytics platforms,
HRM, LMS, fintech work) as case studies, and includes an AI assistant that answers
questions about my work.

## Stack

- **Next.js** (App Router) + **React** + **TypeScript**
- **Tailwind CSS v4**, Framer Motion
- **OpenAI API** (streaming) for the site assistant
- **Vitest** (unit) and **Playwright** (end-to-end)
- Docker image, deployed behind Nginx on a VPS

## What's inside

| Path | What it is |
|---|---|
| `app/(main)/` | Home, About, Projects, and a case-study page per project (`projects/[slug]`) |
| `app/api/chat/` | Streaming chat endpoint for the site assistant |
| `data/` | All site content as typed data: projects, resume, skills, ecosystem |
| `components/` | UI, grouped by page area (home, project, chat, layout…) |
| `lib/` | Rate limiting, request validation, prompt-injection monitoring, display helpers |
| `tests/` | Unit tests for content and design rules; e2e tests for pages, chat, theme and motion |

### The site assistant

`app/api/chat/route.ts` is deliberately defensive, since it is a public endpoint
spending real API credit:

- per-IP rate limiting keyed on the proxy-verified client IP, plus a global
  hourly/daily ceiling so rotating IPs can't run up the bill (`lib/rate-limit.ts`)
- schema validation, HTML stripping, and size caps on every turn and on the whole
  conversation, so forged history can't inflate the prompt (`lib/validate-chat.ts`)
- injection-pattern monitoring that logs a salted IP hash and message length,
  never the visitor's text (`lib/chat-monitor.ts`)
- a grounded system prompt built from the same `data/` the site renders, so the
  assistant and the pages can't drift apart

### Content as data

Every project page renders from `data/projects.ts`. Unit tests check the content
itself: unique slugs, required fields, no live link on a project that isn't live,
no internal code names in public copy, and a real source file for every screenshot.
`design-rules.test.ts` guards the design system (radius tokens only, coral-only
accents on links and buttons).

## Running locally

```bash
npm ci
npm run dev          # http://localhost:3000
npm run verify       # typecheck + lint + unit tests
npm run test:e2e     # Playwright
```

The assistant needs `OPENAI_API_KEY` in `.env.local`. Project screenshots and
videos are served by the live site and are not kept in this repo, so case-study
images will be missing locally.

## About me

Rafi Irtiza Rasa: software engineer, 6+ years of owning production systems end
to end, and an AI-orchestration lead. Contact: info@rafirasa.com
