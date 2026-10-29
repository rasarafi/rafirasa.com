import { Project } from '@/lib/types';

export const projects: Project[] = [
  // ==================== ECOSYSTEM ====================
  {
    slug: 'mfb-mis-ecosystem',
    name: 'Max Foundation Digital Data Platform',
    type: 'Health Information System · Android, Desktop & Web',
    oneLiner:
      'Five applications, one engineer, more than a million records. I hand-built the whole data chain for a Bangladeshi health charity between 2019 and 2025 — from a field worker\'s phone in a remote village to the executive report — then in 2026 replaced its reporting half with my own modern rebuild.',
    description:
      'Max Foundation Bangladesh runs water, sanitation and nutrition programmes in rural Bangladesh, and for six years I was the only engineer on the system that carries their data. Five applications sit on three kinds of device: an Android app field workers use with no internet connection, three Windows programmes for managing the data, tracking programme progress and analysing child growth, and a web dashboard for managers. Every line was typed by hand, before AI coding tools existed, and together they cover the whole journey from a household interview in a remote community to a report on an executive\'s desk.\n\nThe applications are deliberately built on the same few foundations rather than repeating each other. New survey questions are added by changing settings in the database — no rewriting, no reinstalling apps on devices already out in the field. One shared map of the country, up to eight levels deep from district down to an individual child, decides who may see which data. Every app syncs the same way: it asks the server only for what has changed since it last connected and receives it as a password-protected compressed file, built for places where the mobile signal comes and goes. Deletions travel the same route, so a record removed centrally disappears from the field devices too. Three of the apps classify child malnutrition — stunting, wasting and underweight — against the World Health Organization\'s growth standards.\n\nThe scale: over a million individual records across four programmes, 125+ users at 8+ partner organisations including World Vision Bangladesh, Action Against Hunger and The Hunger Project, behind more than 200,000 household interviews — and a peer-reviewed paper at the 42nd WEDC International Conference. Then a rare second act: in 2026 the monitoring and analytics half, three of the five applications, was retired and folded into a single modern successor I built with AI agents, the Digital Evidence Centre. Two further systems, the Field Data Management Platform and the Survey Configuration Console, joined the surviving originals rather than replacing them, working against the same live database. Build a system by hand, run it in production for years, then replace the parts that had aged with your own successor — the Android collection app and the desktop Evidence Centre are still in daily use.',
    tier: 'ecosystem',
    status: 'live',
    techTags: ['Java', 'C#', 'PHP', 'Android', 'WinForms', '.NET 4.8', 'MySQL', 'SQLite'],
    techStackTitle: 'The hand-built stack (2019–25)',
    techStackNote: {
      text: 'Every line of this stack was typed by hand, pre-AI. The 2026 successor is a different stack entirely — Next.js, TypeScript and MySQL — and has its own case study.',
      href: '/projects/mis-dash-web',
      linkLabel: 'Digital Evidence Centre',
    },
    techStack: {
      languages: ['Java', 'Kotlin', 'C#', 'PHP', 'JavaScript', 'SQL'],
      frameworks: [
        'Android SDK',
        '.NET Framework 4.8',
        'WinForms',
        'Entity Framework 6',
        'Bootstrap',
      ],
      data: ['SQLite', 'MySQL', 'Firebase'],
      tools: ['iText7', 'ClosedXML', 'Chart.js', 'MPAndroidChart', 'OpenXML SDK'],
    },
    highlights: [
      'Over a million records collected across four programmes, behind more than 200,000 household interviews',
      '125+ people at 8+ partner organisations use it, including World Vision and Action Against Hunger',
      'Five applications across three kinds of device, all syncing the same way — one engineer, six years, written by hand',
      'Presented in a peer-reviewed conference paper; three of the five applications have since been replaced by my own 2026 rebuilds',
    ],
    hardProblems: [],
    keyDecisions: [],
    images: {
      thumbnail: '/projects/mfb-mis-ecosystem/thumbnail.png',
      screens: [],
      objectPosition: 'center',
    },
  },

  // ==================== FLAGSHIP #1 — JARVIS ====================
  {
    slug: 'jarvis',
    name: 'Jarvis',
    type: 'AI Dev Orchestrator · Local-First Platform',
    oneLiner:
      'The control room behind the way I work with AI coding agents: every session is recorded and priced to the cent, the work is summarised in plain English, and one shared task list is the single source of truth for three of my other projects. It runs on my own machine, with a phone companion that stays in step.',
    description:
      'Jarvis is the layer that keeps my AI-assisted development honest. It watches every coding session I run with Claude Code, works out what each one actually cost in dollars, writes a plain-English recap of what was done, and holds the tasks and project notes that three of my other projects read from. The point is to turn a workflow that is otherwise a black box into a measured one — what the agents spent and what they produced, on record instead of guessed.\n\nThree pieces cooperate on my machine: an API, a browser app, and a small process that keeps a live Claude Code session running and streams it into the browser — the same assistant the terminal uses. Every couple of hours a scanner reads the raw session logs the tool leaves behind, drops duplicates, and prices the usage against the published rates for each model, giving a real cost per session, per project and per day. The recap writer is careful about its own reflection: it leaves sessions that are still running alone, ignores its own prompts, and caps long idle gaps so "time worked" stays honest.\n\nAlongside it sits a deliberately thin phone companion — a small app in one container on a rented server, kept in step with the machine at home by a two-way sync every five minutes. Deletions are carried across as markers rather than simply vanishing, so a task deleted on one side stays deleted instead of quietly coming back. Local by design; the companion lives at jarvis.rafirasa.com.\n\nWhat leaves the repository is tooling: five packaged skills that let other projects\' agents use Jarvis as their source of truth. Two are review workflows sharing one store of findings — a whole-product check before handing work over, and a narrower one that asks whether a single feature does what it was meant to do — kept apart by a hard setting rather than a habit, so a single-feature review can never be mistaken for the state of the whole product. That feature reviewer works from a written specification assembled out of project notes, tracked tasks and history and confirmed with me, under a rule it cannot bend: it never reviews a specification it invented itself, because an invented one only ever confirms that the code does what the code does. A third skill runs long chains of tasks unattended, sorting each one when it is written and forcing anything involving money, the database or merging code to stop and wait for a person. And one small piece underwrites the rest: a health check that survives the database going down and says so, so an outage names its own cause instead of eight panels each reporting themselves broken.',
    tier: 'flagship',
    status: 'live',
    techTags: [
      'Laravel',
      'React',
      'PostgreSQL',
      'TypeScript',
      'Node.js',
      'Claude Code',
      'PWA',
      'Docker',
    ],
    techStack: {
      languages: ['PHP 8.3', 'TypeScript', 'JavaScript', 'SQL'],
      frameworks: [
        'Laravel 13',
        'React 19',
        'Vite 8',
        'TanStack Query',
        'Zustand',
        'Alpine.js 3',
        'Node WebSocket bridge',
      ],
      data: ['PostgreSQL 16 (two schemas)'],
      tools: [
        'Laravel scheduler',
        'Claude Code CLI (stream-json)',
        'Docker',
        'Contabo VPS',
        'PWA service worker',
        'Packaged Claude Code skills',
      ],
    },
    highlights: [
      'A real dollar cost for every AI coding session, and per project and per day — worked out from the raw logs the tool leaves behind',
      'Plain-English recaps of each session, written to skip work still in progress and never to inflate time spent',
      'Two-way sync with the phone companion every five minutes, deletions included, so the two can\'t quietly disagree',
      'Five packaged skills hand its task list, its review workflows and its unattended task chains to three other projects',
    ],
    hardProblems: [
      {
        challenge: 'Claude Code leaves behind raw session logs with no cost in them at all — plus duplicated and abandoned files, and usage split four ways that each bill at a different rate for every model.',
        solution: 'A scanner walks the whole log tree every couple of hours, reads it line by line, drops duplicates, spots abandoned files, and adds up each kind of usage message by message — then prices it against the published rate card for every model I use. The result is a real dollar figure per session, per project and per day, all of it browsable in the app.',
      },
      {
        challenge: 'Having an AI write the summaries creates traps of its own: summarising a session that is still running, summarising Jarvis\'s own requests for summaries, and counting a long coffee break as time worked.',
        solution: 'The recap writer waits half an hour after the last message before touching a session, recognises and skips its own prompts by a marker it plants in them, and caps any gap between messages at fifteen minutes when adding up active time. Recaps run in batches where each one succeeds or fails on its own, so a single slow response can\'t take the whole batch down with it.',
      },
      {
        challenge: 'Two review workflows — a whole-product check before handing work over, and a narrower one that asks whether a single feature does what it was meant to do — write into the same store of findings, so a single-feature run must not hijack the whole-product view. And a reviewing agent left to work out for itself what a feature should do would only ever find that the code does what the code does.',
        solution: 'The two are kept apart by a hard setting rather than a habit: reads default to the whole-product view, so a single-feature run is invisible there unless someone asks for it, and dismissed findings are filed under the feature they belong to so they can\'t leak across. The feature reviewer works from a specification assembled out of project notes, tracked tasks and history and confirmed with me, under a rule written into the skill itself — it never reviews a specification it invented.',
      },
      {
        challenge: 'Running a long chain of tasks through Claude Code overnight means running with the usual permission prompts turned off — and the agent that did the work is the least reliable witness to whether that work is correct or safe.',
        solution: 'Every task is sorted when it is written into one of three kinds: run it, stop and check, or do it by hand — with anything touching money, the database or merging code forced into the middle group; restarting the run at that point is itself the approval for the next stretch. The runner detaches from the terminal so a dropped connection can\'t kill a multi-hour job, and the safeguards are mechanical rather than written promises: a check before code is pushed, hard errors on live operations, and any halt reported into the task hub. The premise is that the agent\'s own report is never the evidence — the gates are.',
      },
      {
        challenge: 'Both sides accept changes — a task ticked off on the phone, a task created at the desk — across a connection that isn\'t always there, and that includes deletions.',
        solution: 'Every five minutes each side sends only what has changed since it last succeeded, and deleted items travel as markers instead of simply disappearing, so nothing quietly comes back to life. Where the two disagree, the more recent change wins, checked explicitly against timestamps rather than assumed — and one command can rebuild the machine at home from the companion if the worst happens.',
      },
    ],
    keyDecisions: [
      {
        decision: 'Where it runs',
        chose: 'On my own machine, with a thin companion on a rented server',
        over: 'A hosted service',
        because: 'Session logs, costs and tasks are the record of my working life — keeping them local means no delay and nothing exposed; only the small slice the phone needs ever leaves the house.',
      },
      {
        decision: 'Matching finished code to tasks',
        chose: 'Suggest the match and let a human confirm it',
        over: 'Closing tasks automatically whenever the AI thinks it found a match',
        because: 'A wrong guess must never rewrite the task list everything else trusts; people stay the only ones who can change it.',
      },
      {
        decision: 'The phone companion',
        chose: 'A small app with no build step at all',
        over: 'A full JavaScript application',
        because: 'The rented server has no toolchain — deploying is copying files into one small container, with nothing to compile.',
      },
    ],
    links: {
      live: 'https://jarvis.rafirasa.com',
    },
    images: {
      thumbnail: '/projects/jarvis/thumbnail.png',
      video: '/projects/jarvis/walkthrough.mp4',
      screens: [
        {
          src: '/projects/jarvis/screens/costs.png',
          width: 956,
          height: 576,
          title: 'Every session priced to the cent',
          caption: 'The five-hour working window, the burn rate, and what the same work would have cost on pay-as-you-go rates instead of a subscription. What AI-assisted development costs stops being a guess and becomes a number.',
          alt: 'A quota and cost screen showing a usage window bar, a burn rate figure, active session count and a breakdown of which models did the work.',
        },
        {
          src: '/projects/jarvis/screens/dashboard.png',
          width: 956,
          height: 576,
          title: 'One screen for whatever needs a person',
          caption: 'The day opens here: what is running, what is overdue, and the few things waiting on a decision. The column on the right is written automatically at the end of each working session.',
          alt: 'A dark dashboard with panels for live projects, a list of items needing attention, and an automatically written recap of recent sessions.',
        },
      ],
    },
  },

  // ==================== PRIVATE AI WORKSPACE ====================
  // Not a flagship: the speed story (concept to deployed POC in a week) is the
  // real value, and a pre-pilot system should not close the flagship section.
  {
    slug: 'bd-llm',
    name: 'Private AI Workspace',
    type: 'AI Product · RAG',
    oneLiner:
      'A privacy-first AI workspace for the Bangladesh market: ask questions across your own documents and get answers that point back to where they came from, then have the AI produce real slide decks, PDFs, Word documents and spreadsheets — charts included. Idea to a working deployed version in one week.',
    hook:
      'Answers that cite their source, and real slide decks out the other end.',
    description:
      'A private AI workspace built for the Bangladesh market and priced in taka: you keep your files in projects, ask questions across them, and get answers that point back to the exact source they came from — and the AI can turn an answer into a real, downloadable slide deck, PDF, Word document or spreadsheet. I designed the system and directed the build through AI coding agents, checking each layer myself.\n\nTwo services split by who owns which data, behind a web front end. The rule that makes "private" more than a promise: every search of the document index is forced to carry the owner\'s identity, so reading someone else\'s documents is not merely forbidden, it cannot be expressed. Five file types are each read on their own terms, so spreadsheets and slide decks don\'t turn to mush before the AI ever sees them; answers arrive a few words at a time, with the list of sources sent alongside. To keep the price viable in taka, questions are routed through three tiers of model, with the design aiming to keep 70–85% of them on the cheapest one.\n\nThe newest work put charts into those generated documents, and the four formats have nothing in common: two of them can draw a chart themselves and two cannot, so doing it their way means two sets of code and two different-looking results. Instead every format embeds the same picture — each chart is drawn once, in memory, and dropped in. The more instructive finding came from thinking about abuse. Limits were set on each individual chart, on how many points and how many lines it may hold, and every chart was cheap and legal — but they did not add up. One perfectly valid request could hold hundreds of charts: roughly seven minutes of processor time for a single click. Limiting the piece does not limit the document. A ceiling on charts per document closed it, putting the worst case back inside twenty to twenty-five seconds.\n\nIdea to a deployed, monitored working version in one week, and a great deal of building since. Stated plainly: the live server is not running current code. Its containers were built before the security-hardening pass and before document generation existed, and both of those still sit on branches that have not been merged — so treat the charts, the usage limits and the hardening as built and tested on my own machine, not shipped. Pre-pilot: I have tested it myself, and there are no outside users yet.',
    tier: 'standard',
    status: 'pre-pilot',
    statusNote:
      'The live server is running an older build — the newest work is tested on my machine, not shipped',
    techTags: [
      'FastAPI',
      'Qdrant',
      'Next.js',
      'Python',
      'RAG',
      'PostgreSQL',
      'Redis',
      'Docker',
      'Claude Code',
    ],
    techStack: {
      languages: ['Python 3', 'TypeScript'],
      frameworks: ['FastAPI (×2 services)', 'Next.js / React', 'SQLAlchemy + Alembic', 'Pydantic'],
      data: ['PostgreSQL', 'Redis', 'Qdrant (vector store)'],
      tools: [
        'Docker Compose (9-service prod topology)',
        'Prometheus + Grafana',
        'OpenRouter',
        'BGE reranker',
        'python-pptx / python-docx / openpyxl / reportlab',
        'matplotlib (Agg, pinned) + Pillow',
        'pytest + Vitest',
      ],
    },
    highlights: [
      'Idea to a deployed, monitored working version in one week',
      'Answers cite their sources, and one person\'s documents cannot be reached from another person\'s account — the design makes it impossible, not merely forbidden',
      'Five file types read in, four document formats written out from a single AI-produced outline — now with charts embedded',
      'Charts are capped per document, not just per chart: a valid request could otherwise have cost about seven minutes of processor time',
      'Priced for the Bangladeshi market: most questions are routed to the cheapest of three model tiers',
    ],
    hardProblems: [
      {
        challenge: 'Document question-answering must never leak content between users or between projects, and every answer has to be traceable back to its source — all from one shared index that holds everybody\'s documents.',
        solution: 'Every search of that index is forced to carry the owner\'s identity, so reading across accounts is structurally impossible rather than a rule someone could forget to apply. The best matches are re-sorted for relevance, assembled into the answer with numbered markers, and the list of sources is sent to the screen alongside the answer as it streams.',
      },
      {
        challenge: 'Adding AI-authored charts to generated documents, where the four output formats have nothing in common — two can draw a chart themselves and two cannot, so doing it their way means two sets of code and two different-looking results.',
        solution: 'One drawing path for every format: each chart is rendered once into an image held in memory, never written to disk, and every format embeds that same image — with the spreadsheet route turning a chart into a sheet of its underlying numbers so converting between formats loses nothing. The quick-and-easy drawing shortcut is banned throughout the codebase, because it keeps hidden shared state that is unsafe when several requests are drawing at once. One sizing bug is worth naming: the PDF was first sized from the chart\'s nominal shape, ignoring the trimming that happens when it is drawn, so pie charts came out stretched by about 1.9× — fixed by measuring the finished image instead of assuming its shape.',
      },
      {
        challenge: 'Drawing charts is real processor work happening while someone waits, and the limits set on each individual chart made every chart cheap and legal — but they did not add up against the existing limit of 500 blocks per document, so one perfectly valid request could hold hundreds of charts and cost roughly seven minutes of processor time.',
        solution: 'A ceiling on charts per document, checked as the document outline is accepted and applied to both shapes of document, on the principle that limiting the piece does not limit the whole. That puts the worst case back inside a twenty to twenty-five second wait. The chart\'s canvas size is deliberately not something the request can choose either, since a caller-chosen canvas is its own way to exhaust memory, and the instructions the AI writes to carry the same limits in words, kept in step with the code.',
      },
      {
        challenge: 'Letting the AI produce real, downloadable slide decks, PDFs, Word documents and spreadsheets from a single pass, when each format is put together in an entirely different way.',
        solution: 'Two stages: the AI writes a structured outline of the document, then four dedicated writers turn that one outline into each format, with a shared layer smoothing out the differences in formatting rather than writing the same formatting logic four times over.',
      },
      {
        challenge: 'Prices in taka cannot support sending every question to the most expensive frontier model.',
        solution: 'Three tiers of model — a small one, a mid-sized one and a large paid one — designed so that an estimated 70–85% of questions never leave the cheapest tier, with the largest model reserved for the paid plan.',
      },
    ],
    keyDecisions: [
      {
        decision: 'Keeping each customer\'s documents apart',
        chose: 'One shared index where every search must name its owner',
        over: 'A separate index per customer',
        because: 'Separate indexes don\'t scale in the database being used, and forcing every search to name its owner makes reading across accounts impossible rather than merely against the rules.',
      },
      {
        decision: 'Charts in generated documents',
        chose: 'Drawing each chart once as an image every format embeds',
        over: 'Letting each format draw its own charts',
        because: 'Two of the four formats cannot draw charts at all — doing it their way would mean two sets of code and two different-looking results.',
      },
      {
        decision: 'Guarding against abuse of document generation',
        chose: 'A limit on charts per document on top of the limits on each chart',
        over: 'Limits on each chart alone',
        because: 'Per-chart limits didn\'t add up against the block limit — a perfectly legal request could still cost about seven minutes of processor time.',
      },
      {
        decision: 'How the backend is split',
        chose: 'Two services divided by which data each one owns',
        over: 'A single application doing everything',
        because: 'One owns the accounts and files, the other owns the document index — a clean line to contain failures, and the AI-heavy half can be scaled on its own.',
      },
    ],
    images: {
      thumbnail: '/projects/bd-llm/thumbnail.png',
      screens: [
        {
          src: '/projects/bd-llm/screens/chat.png',
          width: 956,
          height: 576,
          title: 'A private workspace, not a public chatbot',
          caption: 'Questions and answers stay inside the organisation\'s own environment, with the model that produced each reply named underneath it. Nothing typed here is sent to an outside service.',
          alt: 'A chat window with a question about solar irrigation for smallholder farmers and a three-point answer, with the model name shown beneath the reply.',
        },
        {
          src: '/projects/bd-llm/screens/citation.png',
          width: 956,
          height: 576,
          title: 'Every answer shows where it came from',
          caption: 'Ask about an uploaded document and the reply cites the passage behind it, with that passage open alongside. A reader can check the answer instead of having to trust it.',
          alt: 'A chat answer carrying a numbered citation, beside a panel showing the excerpt of the uploaded document the answer was drawn from.',
        },
        {
          src: '/projects/bd-llm/screens/templates.png',
          width: 956,
          height: 576,
          title: 'Saved prompts for the work people repeat',
          caption: 'Summarise this document, list the key findings, pull out every date and deadline — the requests staff make daily, kept as one-click starting points and grouped by the kind of job.',
          alt: 'A prompt templates panel with tabs for document analysis, writing, summarisation and data, listing the saved prompts under each.',
        },
        {
          src: '/projects/bd-llm/screens/export.png',
          width: 956,
          height: 576,
          title: 'Answers leave as files the office already uses',
          caption: 'An answer can be saved straight out as a PDF, a Word file or a spreadsheet, so the work carries on in the tools people already have open.',
          alt: 'An open download menu offering PDF, Word and Excel formats beneath a chat answer.',
        },
      ],
    },
  },

  // ==================== MIS DASH WEB ====================
  // The analytics layer of the Max Foundation Digital Data Platform rather than a
  // peer flagship: on its own it reads as "another dashboard", and the weight
  // behind it (1M+ records, delta sync, WHO z-scores) belongs to the platform.
  {
    slug: 'mis-dash-web',
    name: 'Digital Evidence Centre',
    type: 'Monitoring & Analytics Platform · Public Health',
    oneLiner:
      'I built four desktop monitoring and analytics programs for a national nutrition programme, ran them for six years, then replaced them with one website — and then added an AI layer that answers questions in plain language by running the dashboard\'s own charts, so the model never writes a number itself.',
    hook:
      'Ask it a question — the model picks the chart, the site works out the number.',
    description:
      'From 2019 to 2025 I built and ran four desktop monitoring and analytics programs for Max Foundation\'s nutrition and health work. Digital Evidence Centre is their replacement: one website, in English and Bangla, working in both the Gregorian and Nepali calendars, that I designed and directed AI agents to build. It pulls the day-to-day monitoring and the analysis into a single place, closing the full circle — build the old system, run it for years, then retire it with your own. It has grown from 2 field programmes to 6, four of them onboarded inside a month, and is live at dec.mfbmis.net. In August 2026 it gained a household module — which healthy-living practices each family has taken up, a follow-up list of the gaps field staff should visit next (downloadable so a team can work offline), and dashboards linking household habits to children\'s growth — plus a library of written reports for donors and management, each pinned to the exact data it was drawn from.\n\nThe defining failure of the old programs was that they recalculated the maths for every row — roughly 100,000 households and 208,000 child growth records — every time somebody opened a screen. The rebuild turns that around: a background process keeps pre-calculated tables up to date (a routine update finishes in under a second), every chart is summarised on the server so raw records never reach the browser, and stored results clear themselves the moment the data changes. Every chart and headline figure is a configuration entry rather than code, so differences between programmes are settings, not special cases. The hardest part was carrying over the old system\'s growth-score calculation, whose quirks six years of published figures depend on; the new version was proved to match by checking 5,000 sampled records for each of the three growth measures on each programme against an independently written calculation — no mismatches at all.\n\nThe newest layer is the AI one, built on the premise that an invented stunting rate is worse than no feature at all. The model never calculates or writes a figure: it chooses from the dashboard\'s own charts, and the site runs that chart through exactly the same code the screens use and drops the real result into the answer. Every request to the model goes through one gateway. There, a kind of text only two screened functions can produce — rejecting anything shaped like a household name, phone number, ID or long run of digits — makes sending unchecked data a mistake the code refuses to compile rather than a leak that ships. Switching the feature off is one database change and no deployment, and it stays off unless turned on; per-team permissions decide whether a billable request happens at all, with administrators deliberately not exempt; and every request, successful or not, writes one entry to the ledger, so spending can never drift from use. Alongside it, a "why is this number what it is" panel behind a button on each headline figure walks through the steps, and 42 curator notes record chart meanings no amount of reasoning over the numbers could recover. Nothing is released until an evaluation of 62 real questions and 14 attempts to trick the model passes, with refusals, permissions, resistance to trickery and respect for the curator notes all required to be perfect.',
    tier: 'flagship',
    status: 'live',
    statusNote:
      'The AI layer is switched on in production, but access to it is still limited to a single administrator account',
    techTags: [
      'Next.js',
      'React 19',
      'TypeScript',
      'MySQL',
      'ECharts',
      'TanStack Query',
      'OpenAI SDK',
      'Vitest',
      'Playwright',
      'Claude Code',
    ],
    techStack: {
      languages: ['TypeScript (strict)', 'SQL (MySQL 8)'],
      frameworks: [
        'Next.js 16 (App Router)',
        'React 19',
        'Tailwind 4',
        'TanStack Query',
        'ECharts 6',
        'next-intl',
        'zod 4',
        'iron-session',
      ],
      data: ['MySQL 8 (read-only source DBs + own fact DB, 26 migrations)'],
      tools: [
        'OpenAI SDK (tool-calling loop, streaming SSE, cached prompt prefix)',
        'Vitest (119 test files)',
        'Playwright',
        '12 bespoke validation and eval harnesses',
        'pnpm + esbuild ops bundles',
        'cPanel + PM2 deploy with backup rotation',
      ],
    },
    highlights: [
      'Replaces 4 desktop analytics programs built and operated by the same engineer, 2019–25',
      'Grew from 2 field programmes to 6 — 4 onboarded inside a month',
      'Household module (Aug 2026): which practices each family has taken up, a follow-up list for field staff, and dashboards linking household habits to children\'s growth; plus a report library for donors and management',
      'Growth scores proved to match the old system: 5,000 sampled records × 3 growth measures × 2 programmes, zero mismatches',
      'AI answers built only from the dashboard\'s own 40 charts, with 42 curator notes and step-by-step explanations behind 7 headline figures',
      'Release gate: 62 real questions and 14 attempts to trick the model — 14 refusals out of 14, 12 trickery cases clean, 225 requests for about 12 US cents',
    ],
    hardProblems: [
      {
        challenge: 'The data is household-level child nutrition records — names, phone numbers, locations, national ID numbers. An AI feature over data like that is only safe if "we remembered to strip the personal details" is not a decision left to whoever writes the next piece of it.',
        solution: 'Text can reach the model as one of only two things: a fixed phrase written by us, or a summary that has been screened. The screening rejects by shape rather than by a list of banned fields that ages badly — anything looking like a name, phone number, location or ID, and any run of ten or more digits. The gateway accepts nothing else, so passing unchecked data is a mistake the code refuses to compile rather than a leak that ships; whatever a tool sends back re-enters the conversation through the same door; and there is deliberately no "just anonymise it" shortcut to reach for under deadline.',
      },
      {
        challenge: 'The question-answering feature had to handle free-text questions about programme data, but an invented stunting rate in a health system is worse than shipping nothing — and the usual approach, letting the model write the database query, lets it author the number too.',
        solution: 'The model never calculates or writes figures. It picks from the dashboard\'s own charts through a small set of defined tools; the site runs the chosen chart through exactly the same code the screens use and substitutes the real result. Working out which place and which time period a question means is done by ordinary matching against what that user is allowed to see, not by the model guessing, and permissions are enforced where the tools run rather than by asking the model nicely.',
      },
      {
        challenge: '"The AI seems fine" is not an acceptance test — but re-running a full live evaluation on every change bills money on every change.',
        solution: 'The evaluation splits into a free part and a paid part. The free part resolves each test question\'s expected chart and filters through the same code the live site uses, and checks them against the same permission rules, so renaming a chart breaks the test instead of quietly passing. The paid part runs 62 real questions and 14 attempts to trick the model by three different routes — the question itself, a booby-trapped label planted in the data, and a value passed in from the screen. Picking the right chart is scored as a target; refusing what it should refuse, respecting permissions, resisting trickery and honouring the curator notes must all be perfect.',
      },
      {
        challenge: 'Spend, an audit trail and an off switch are usually three afterthoughts bolted onto an AI feature, and every extra place that calls the model is another place all three can be forgotten.',
        solution: 'One gateway is the only place a model request happens. The audit trail is the spending record — one entry per request on every exit including failures, so the bill cannot diverge from what was used — and the model library\'s habit of silently retrying three times was cut to one, precisely because three billed attempts would have collapsed into a single entry. The off switches live in a table and are off unless a row says otherwise, per feature and per programme, so disabling AI is one database change and no deployment, and a freshly set-up copy of the system starts cold rather than live.',
      },
      {
        challenge: 'The old growth-score calculation had quirks — figures assigned to whole bands with no smoothing in between, and deliberately out-of-order fallback bands — and six years of published numbers depended on reproducing it exactly, not on implementing the textbook formula "correctly".',
        solution: 'Rewritten as a single module mirroring the old behaviour edge case for edge case, then proved to match: 5,000 sampled records for each growth measure on each programme, checked against an independently written calculation — no mismatches across stunting, underweight and wasting for either programme.',
      },
      {
        challenge: 'The old programs recalculated the maths for every row over roughly 100,000 households and 208,000 child records every time a screen opened; the rebuild needed charts that never touch the raw records, while staying current against live databases it is not allowed to restructure.',
        solution: 'A background process keeps pre-calculated tables current — growth scores, severity and time periods already worked out — picking up only what changed since last time, following edits through, and removing records deleted at source. A routine update finishes in under a second and runs every fifteen minutes, and the totals match the source exactly: 107,484 households and 234,485 measurements on the largest programme.',
      },
    ],
    keyDecisions: [
      {
        decision: 'Keeping personal data away from the model',
        chose: 'A kind of text only two screened functions can produce',
        over: 'A cleaning helper developers are expected to remember to call',
        because: 'It turns the unsafe path into code that will not compile, instead of something a reviewer has to spot — and no shortcut exists to reach for under deadline.',
      },
      {
        decision: 'Where the numbers in an answer come from',
        chose: 'The model picks a chart; the site runs it',
        over: 'Letting the model write the query, or the figure',
        because: 'An invented nutrition statistic is worse than no feature; the numbers come from the same code that draws the dashboard.',
      },
      {
        decision: 'Governing the AI',
        chose: 'One gateway where the personal-data check, the off switch, the budget and the audit trail all apply',
        over: 'Each feature calling the model itself',
        because: 'All four apply exactly once, and anything built later inherits them by construction rather than by being remembered.',
      },
      {
        decision: 'How the data is prepared',
        chose: 'Pre-calculated tables kept up to date in the background',
        over: 'Querying the live source databases on every screen',
        because: 'The old programs died recalculating everything on every load; pre-calculated tables turn each chart into a single fast summary.',
      },
      {
        decision: 'Matching the old growth-score maths',
        chose: 'A faithful copy of the old calculation, quirks included',
        over: 'Implementing the World Health Organization standard "correctly"',
        because: 'Six years of published numbers have to reconcile; a match can be proved, an argument about correctness cannot.',
      },
    ],
    links: {
      live: 'https://dec.mfbmis.net',
    },
    images: {
      thumbnail: '/projects/mis-dash-web/thumbnail.png',
      video: '/projects/mis-dash-web/walkthrough.mp4',
      screens: [
        {
          src: '/projects/mis-dash-web/screens/evidence.png',
          width: 956,
          height: 576,
          title: 'A report that states what it does not claim',
          caption: 'Every published report carries its limits beside its findings: what the analysis shows, what it explicitly does not, and where the underlying counts are known to run conservative. Written for readers who will be asked to defend it.',
          alt: 'An evidence report page with side-by-side panels headed what this report does and what this report does not claim, above a methods note.',
        },
        {
          src: '/projects/mis-dash-web/screens/growth.png',
          width: 956,
          height: 576,
          title: 'Six years of child growth in one view',
          caption: 'Household registrations, child records and growth measurements for whichever period is selected, with the monthly submission curve underneath. This view covers 107,761 households and 30,315 children.',
          alt: 'A child growth dashboard with count tiles for households and children, above a line chart of monthly submissions running from 2022 to 2026.',
        },
        {
          src: '/projects/mis-dash-web/screens/villages.png',
          width: 956,
          height: 576,
          title: 'Which villages have actually met the standard',
          caption: 'Villages ranked against the programme\'s own healthy-village indicators and pooled across three programmes, so declaring a village healthy rests on the measurements behind it rather than on a local judgement call.',
          alt: 'A healthy villages dashboard showing village and declaration counts above bar charts breaking down rank distribution by programme.',
        },
      ],
    },
  },

  // ==================== STANDARD PROJECTS ====================
  {
    slug: 'mis-dcapp-web',
    name: 'Field Data Management Platform',
    type: 'Enterprise Web · Multi-Client Data Entry',
    oneLiner:
      'A browser version of a field survey system that has run on Android phones for years — a record saved from the browser has to come out identical to one saved on a phone, down to the last character.',
    description:
      'Field teams collect household health and nutrition data on Android phones. This adds a browser version of the same system, so data can be entered and reviewed from a computer as well — without pausing field operations or moving anyone off the phones. Rather than replacing the existing platform, it runs as a second way into the same live database: a data-entry app for field staff and a review app for supervisors, which retired an older desktop review tool.\n\nThe hard rule is that a record saved from the browser must be indistinguishable from one saved on a phone, and that turns out to be the whole difficulty. Record IDs are 17 and 18 digits long, which a browser silently rounds off — producing collisions — so the entire ID path uses a number type that holds them exactly. The database keeps every survey answer in generic, unlabelled columns, so a configuration map decides which answer goes where. The codes that mark a record pending, approved or rejected carry their meaning in their first digits, an undocumented convention that had to be reconstructed from years of existing data. And the forms themselves do not exist in the code at all: the questions, the checks and the skip-this-if logic are rows in the database, read and interpreted as the page loads — including the Bikram Sambat calendar the Nepal deployment runs on.\n\nBuilt AI-orchestrated — I own architecture, decomposition and verification; Claude Code agents implement — in small numbered slices, each one checked before it merged. The working rule for every slice: save the same record from the browser and from the phone, then compare the two rows; any difference stopped the work. The review-code format was verified against 5,783 existing review records before the supervisor app was allowed to write anything. It is live at dcapp.mfbmis.net.',
    tier: 'standard',
    status: 'live',
    techTags: [
      'Next.js',
      'TypeScript',
      'React 19',
      'MySQL',
      'TanStack Query',
      'Playwright',
      'Claude Code',
    ],
    techStack: {
      languages: ['TypeScript (strict)', 'SQL'],
      frameworks: [
        'Next.js 16 (App Router)',
        'React 19',
        'TanStack Query',
        'react-hook-form + Zod 4',
        'next-intl',
        'Tailwind CSS',
      ],
      data: ['MySQL (mysql2 direct, no ORM)', 'iron-session 8', 'bcryptjs'],
      tools: [
        'Vitest',
        'Playwright',
        'exceljs',
        'pino',
        'GitHub Actions',
        'PM2',
        'rsync deploy with backup rotation',
      ],
    },
    highlights: [
      'Two apps in one — data entry for field staff, review for supervisors — replacing an older desktop review tool',
      'Automated tests cover nearly every module, plus end-to-end tests that drive the real screens in a browser',
      'Every validation rule on the main survey form is implemented; the review-code format was verified against 5,783 existing records',
      'Shipped in small numbered slices, each type-checked, linted and tested before it was allowed to merge',
    ],
    hardProblems: [
      {
        challenge: 'The Android app owns the database structure and it cannot be changed — a record saved from the browser has to be indistinguishable from one saved on a phone. And the record IDs are 17 to 18 digits long, which a browser rounds off without warning, producing duplicates.',
        solution: 'The browser reproduces the phone\'s ID generation exactly, using a number type that carries those digits without loss all the way into the database. A configuration map decides which answer goes into which of the database\'s generic storage columns. And every slice of work had to pass the same test: save the same record from browser and phone, compare the two rows, and stop if they differ.',
      },
      {
        challenge: 'Forms do not exist in the code. The questions, the checks, the calculations and the skip-this-if logic are all rows in the database, and the browser has to interpret them with exactly the same meaning the phone gives them.',
        solution: 'A reader for the stored rules, plus a suite of checks covering number ranges, rules that compare one answer against another, conditional questions and skip logic — every rule used on the main survey form is implemented — with dedicated handlers for the opaque calculations, such as WHO child-growth scores, that were previously worked out on the server.',
      },
      {
        challenge: 'Whether a record is pending, approved or rejected is encoded in the first digits of its status code — a convention nobody wrote down, which both the Android app and the retired desktop review tool depend on.',
        solution: 'The rules were reconstructed from the existing data and code and rewritten as small, individually tested functions. The supervisor\'s approve, reject and batch actions are built on top of them, so a decision made in the browser lands in the exact format the phones expect the next time they sync.',
      },
    ],
    keyDecisions: [
      {
        decision: 'Talking to the database',
        chose: 'Hand-written queries',
        over: 'A toolkit that generates them',
        because: 'The structure belongs to the Android app and is not negotiable — hand-written queries give exact control over the generic storage columns and over the very large IDs, which generated queries quietly mangle.',
      },
      {
        decision: 'How to modernise',
        chose: 'A second way into the same live database',
        over: 'Rebuilding or moving the platform',
        because: 'Field work cannot pause. Identical writes let the browser and the phones work side by side on one database, with no migration to get wrong.',
      },
      {
        decision: 'How "done" is judged',
        chose: 'Comparing a real browser-written record against a real phone-written one, every slice',
        over: 'Trusting the automated tests',
        because: 'Matching the phone exactly is the whole contract, and a real comparison catches undocumented conventions no test would have thought to check.',
      },
    ],
    links: {
      live: 'https://dcapp.mfbmis.net',
    },
    images: {
      thumbnail: '/projects/mis-dcapp-web/thumbnail.png',
      screens: [
        {
          src: '/projects/mis-dcapp-web/screens/forms.png',
          width: 956,
          height: 576,
          title: 'The forms a field team works from',
          caption: 'Field staff sign in and choose the form they need, grouped by programme. The list is built in the configuration console, so it changes without anyone shipping a new version of the app.',
          alt: 'A signed-in home screen listing household and child registration forms grouped under programme headings, with a search box above them.',
        },
        {
          src: '/projects/mis-dcapp-web/screens/entry.png',
          width: 956,
          height: 576,
          title: 'Every question in both languages at once',
          caption: 'Each question carries its translation directly underneath, so one form serves a supervisor reading English and a field worker reading their own language without maintaining two versions of it.',
          alt: 'A survey question about a household\'s economic background offering four options, each labelled in English with its Nepali translation below.',
        },
      ],
    },
  },
  {
    slug: 'mis-dcapp-admin',
    name: 'Survey Configuration Console',
    type: 'Multi-Tenant Admin · Field Data',
    oneLiner:
      'The control panel where survey forms are written for four live field programmes — and because phones pick up whatever settings they find the next time they open, every save is effectively a live release.',
    description:
      'Before this existed, changing a survey question meant typing database commands by hand against four separate production databases. The phones in the field download any setting that has changed the next time a worker opens the app — there is no staging copy, no push, and no undo — so a mistyped command did not fail safely somewhere; it went straight to field devices. This console turns that hand-typed workflow into checked, recorded, all-or-nothing changes.\n\nEvery change to a programme database passes through one gate: check it, apply it inside a transaction that either completes fully or not at all, mark the settings as changed so the phones pick them up, and record what the row looked like before and after. The hardest job — adding a single question to a form — actually means writing to six different tables in the old database, so that flow is split in two: a planning step that works out every value and can be tested without touching a database at all, and a short writing step that applies them in one go. Anything built over several steps is stored as not-yet-live, so a phone never downloads a half-finished form. Bulk-importing field staff from a spreadsheet shows a per-row preview before anything is saved, and refuses the malformed entries that used to crash the phone app at sign-in.\n\nBuilt AI-orchestrated — me architecting and verifying, agents implementing. It has been in production since July 2026, running four production programme databases from one panel, deployed through a pipeline that keeps the last ten server backups.',
    tier: 'standard',
    status: 'live',
    techTags: ['Next.js', 'TypeScript', 'React 19', 'MySQL', 'Zod', 'Multi-tenant'],
    techStack: {
      languages: ['TypeScript', 'SQL'],
      frameworks: [
        'Next.js 16 (App Router)',
        'React 19',
        'TanStack Query',
        'react-hook-form + Zod 4',
        'Tailwind CSS 4',
      ],
      data: [
        'MySQL (mysql2, raw parameterized SQL)',
        'per-project connection pools',
        'iron-session 8',
        'bcryptjs',
      ],
      tools: [
        'Vitest',
        'Playwright',
        'dnd-kit',
        'shadcn/Base UI',
        'pino',
        'PM2',
        'deploy pipeline with backup rotation',
      ],
    },
    highlights: [
      'Runs four production programme databases from one panel, with per-programme permissions',
      'Adding one form field means six coordinated changes to the old database — applied as one, never half-applied',
      'Every change is recorded with a before-and-after snapshot, so any edit can be traced back',
      'In production since July 2026; each release keeps the last ten server backups',
    ],
    hardProblems: [
      {
        challenge: 'Adding one question to a form is not one change — it is six coordinated changes across six tables in the old database. Miss or mistype any one of them and the question breaks silently on every phone that downloads it, with no error shown anywhere.',
        solution: 'The work is split in two: a planning step that works out every value — which storage column is free, which codes to use, which rules apply — and can be tested without a database at all, and a short writing step that applies all six changes in a single transaction, with health checks before it commits and retired codes accounted for so nothing is accidentally reused.',
      },
      {
        challenge: 'Phones download any setting that has changed the next time they open. A bad change does not fail a release pipeline — it lands on field devices.',
        solution: 'Every change to a programme database passes one gate: check it, apply it inside a transaction, mark it so the phones pick it up, and record the row as it was and as it became. Anything that takes several steps to build stays not-yet-live and is switched on only when the whole thing is complete, so half-built settings are never downloadable.',
      },
      {
        challenge: 'Importing field-staff accounts from a spreadsheet has to produce each person\'s location permissions in an exact legacy format — a blank or malformed entry crashes the phone app the moment that person signs in.',
        solution: 'Nothing is written until it has been previewed. Every row goes through a dedicated reader and writer that refuses an empty location list, and the findings are shown row by row; the save step then checks everything again and writes through the same guarded path as any other change.',
      },
    ],
    keyDecisions: [
      {
        decision: 'Keeping changes safe',
        chose: 'One gate every change must pass through',
        over: 'Leaving each screen to handle its own',
        because: 'The transaction, the before-and-after record and the flag that tells phones to re-download are enforced in one place, rather than left to memory in dozens of separate handlers.',
      },
      {
        decision: 'Where the panel keeps its own data',
        chose: 'A separate database for the panel',
        over: 'Panel tables inside the programme databases',
        because: 'The programme databases stay pure phone configuration — accounts, permissions and audit history can never end up synced to a field device.',
      },
      {
        decision: 'Building complex changes',
        chose: 'A planning step kept separate from the writing step',
        over: 'Database commands written inline in each screen',
        because: 'The planning can be tested without a database at all, and the writing stays short enough to read line by line against the old structure.',
      },
    ],
    links: {
      // live link removed 2026-10-29: the Cloudflare edge cert covers only *.mfbmis.net,
      // so this two-level host fails the TLS handshake for every visitor.
    },
    images: {
      thumbnail: '/projects/mis-dcapp-admin/thumbnail.png',
      screens: [
        {
          src: '/projects/mis-dcapp-admin/screens/layout.png',
          width: 956,
          height: 576,
          title: 'Reordering a survey without a developer',
          caption: 'Questions are dragged into the order the interview actually follows, one page at a time. What used to mean a code change and a release is now an afternoon for the programme team.',
          alt: 'A form layout editor listing survey pages in order, each holding one question with its answer type shown at the right.',
        },
        {
          src: '/projects/mis-dcapp-admin/screens/menu.png',
          width: 956,
          height: 576,
          title: 'One console, four client programmes',
          caption: 'The menu each handset shows is assembled here, per client. Retiring a form withdraws it from the field automatically, instead of leaving it live on devices nobody remembered to update.',
          alt: 'A menu editor showing form categories with the individual forms beneath each, hidden entries greyed out and every form carrying its own code.',
        },
        {
          src: '/projects/mis-dcapp-admin/screens/preview.png',
          width: 956,
          height: 576,
          title: 'See the form as the handset will draw it',
          caption: 'The preview renders the saved form exactly as a device will show it, in either language, before it reaches anyone in the field.',
          alt: 'A phone-shaped preview of a household registration form, with English and Bengali language tabs and page numbers above it.',
        },
        {
          src: '/projects/mis-dcapp-admin/screens/locations.png',
          width: 956,
          height: 576,
          title: 'The place list the whole system counts by',
          caption: 'Districts down through wards to survey areas, edited in one place. Saving publishes the change to every device at its next sync, so field teams and reports never disagree about where a record belongs.',
          alt: 'A locations table listing districts with their identifiers and codes, beneath tabs for each smaller administrative level.',
        },
      ],
    },
  },
  {
    slug: 'mis-dipbr-web',
    name: 'Programme Reporting Platform',
    type: 'Enterprise Web · Programme Monitoring',
    oneLiner:
      'A spreadsheet-style reporting grid for Max Foundation and its partner NGOs, replacing a desktop tool whose server would run commands for anyone who asked — the value here is the defects it removes, not the scale it handles.',
    description:
      'Max Foundation and its partner NGOs report programme targets, progress and budgets through a Windows desktop program talking to a set of web scripts — a system I built and ran myself. Its replacement was not a matter of taste. The old upload page accepted a file from anyone and built database commands out of whatever was inside it; another page would run any database command at all for anyone holding a single shared password that shipped inside every copy of the desktop program; a database login sat in plain text in that program; and no request could tell one user from another. This is the replacement: one website where every rule is decided on the server, when the page loads and again when someone saves.\n\nA cell is identified the way a spreadsheet cell is — which activity, which reporting period, which figure, which organisation. Which cells are locked, and which are calculated from other cells, come from rules that can apply broadly or narrowly, so several rules routinely claim the same cell and something has to pick the winner. The old database had a priority setting for exactly that, and the first pass at moving the data quietly dropped it — leaving ties settled by whatever order the database happened to return rows in, so a single-organisation exception could beat an everyone-locked rule one moment and lose to it the next. Priority is now recovered from the old data and the winner picked in a fixed order, and a cell that matches no rule is locked rather than open — a default taken from how the programme actually uses those rows, which is to close reporting periods. Cell formulas are read by a purpose-built parser rather than run as code, and older formula styles this phase does not yet handle appear as a visible "not calculated yet" gap instead of a grid that fails to load.\n\nScale is not the story: about 5,200 existing figures, four organisations, thirteen users. Correctness is. The fast version of the rule matching is automatically checked against the slow, obvious version on generated data, so the shortcut can never quietly diverge from it. The script that decodes the old, undocumented data conventions does nothing unless told to, refuses to run against a database that already holds data, and cannot reach production by design. Built AI-orchestrated in five working days. Phase 1 — the foundation and core data entry — is built and running locally; attachments, report exports and the review workflow are still specifications, and nothing is deployed yet.',
    tier: 'standard',
    status: 'unlaunched',
    statusNote:
      'Phase 1 built and tested locally; not deployed',
    techTags: ['Next.js', 'TypeScript', 'React 19', 'Drizzle ORM', 'MySQL', 'TanStack Table', 'Claude Code'],
    techStack: {
      languages: ['TypeScript (strict)', 'SQL (MySQL 8)'],
      frameworks: [
        'Next.js 16 (App Router)',
        'React 19',
        'TanStack Query + TanStack Table',
        'react-hook-form + Zod 4',
        'Radix primitives',
        'Tailwind CSS',
      ],
      data: ['MySQL 8 (Drizzle ORM, 14 tables, 7 migrations)', 'iron-session 8', 'bcryptjs'],
      tools: [
        'Vitest (dual server/client projects)',
        'Testing Library + jsdom',
        'msw',
        'pnpm',
        'mysqldump → local scratch DB for legacy migration',
      ],
    },
    highlights: [
      'Replaces a desktop-plus-web-scripts system that took uploads from anyone, would run any database command behind one shared password shipped inside every copy, and could not tell one user from another',
      'Recovered a rule-priority setting an earlier migration had dropped — until then, ties were decided by whatever order the database returned rows in',
      'The fast rule matching is automatically checked against the slow, obvious version across a full grid view of roughly 11,500 cells',
      'Cell formulas are read by a purpose-built parser, never executed as code on the server',
      'Phase 1 — foundation and core data entry — built and tested in five working days; not yet deployed',
    ],
    hardProblems: [
      {
        challenge: 'Which cells are locked and which are calculated come from rules that can each apply broadly or narrowly across six different dimensions, so several rules routinely claim the same cell. The old database had a priority setting to break the tie, and the first pass at moving the data silently dropped it — leaving the winner decided by whatever order the database happened to return the rows in, so a single-organisation exception could beat an everyone-locked rule one moment and lose to it the next.',
        solution: 'Priority was recovered from the old data, and the winner is now picked in a fixed, explicit order — priority first, then how narrowly the rule targets that cell, then a stable identifier — so identical inputs always give an identical answer. A cell that matches no rule at all is locked rather than open: a default chosen from how the deployed programme actually uses those rows, which is to close reporting periods rather than open them, not from preference.',
      },
      {
        challenge: 'A single grid view holds roughly 11,500 cells. Testing every rule against every cell is the obvious way to build it and the obvious way to make it slow — but a faster version that quietly disagrees with the obvious one is worse than a slow grid.',
        solution: 'Rules that apply to a whole column are resolved once and reused, with cell-specific rules layered on top — which is only valid because picking a winner behaves like taking a maximum, an argument written down beside the code. A test then generates inputs and checks the fast path against the obvious one on each of them, so the shortcut cannot drift away from it unnoticed.',
      },
      {
        challenge: 'Cells are calculated from other cells using spreadsheet-style expressions, and the grid works out what is editable at the moment the page is drawn — but a period can close, a permission can change, or a formula can be attached between then and the moment someone saves. The old system\'s answer was to believe whatever the desktop program told it.',
        solution: 'Formulas are read by a purpose-built parser rather than run as code, and a reference to something missing produces an empty value instead of an error. On every save the server works out again, from scratch, whether that person may see the cell, whether it is locked, and whether the period is still open, refusing with a specific reason — so the server is the authority and the grid on screen is only a hint.',
      },
      {
        challenge: 'The old data encoded its structure in conventions nobody had written down: an organisation\'s parent implied by the first digits of its ID, multiple values packed into bracketed lists inside a single column, reporting periods hidden inside text codes, and a history that kept another row every time anything was re-saved.',
        solution: 'A migration script and a set of tested helpers unpick each one — ID prefixes into real parent links, bracketed lists into proper rows (catching that one list held record IDs while a near-identical one held positions counted from one, found when a spot-check returned twelve rows where three were expected), text codes into typed period columns, and history reduced to one row per cell. The script does nothing unless explicitly told to, refuses to run against a database that already holds data, and can only ever read production.',
      },
    ],
    keyDecisions: [
      {
        decision: 'How to move off the old system',
        chose: 'Retire it in one move, migrating the data once',
        over: 'Running both systems side by side for a period',
        because: 'A clean break lets the new database be organised properly, instead of being shaped to match the old system\'s quirks.',
      },
      {
        decision: 'What happens when no rule matches a cell',
        chose: 'Lock it',
        over: 'Leave it open unless a rule grants access',
        because: 'The programme uses these rules to close reporting periods, not to open them — assuming open inverts what the people running it actually mean.',
      },
      {
        decision: 'Where permission is decided',
        chose: 'On the server, worked out again on every save',
        over: 'Trusting what the screen showed when the page loaded',
        because: 'What was on screen is out of date the moment it is drawn, and deciding at save time is exactly what the old system got wrong.',
      },
      {
        decision: 'Talking to the database',
        chose: 'A toolkit that tracks each structural change',
        over: 'Hand-written queries, as in the sibling field-data platform',
        because: 'That sibling has to match a structure another app owns and cannot change; here the structure is being redesigned, so tooling that records every change pays for itself.',
      },
    ],
    images: {
      thumbnail: '/projects/mis-dipbr-web/thumbnail.png',
      screens: [
        {
          src: '/projects/mis-dipbr-web/screens/grid.png',
          width: 956,
          height: 576,
          title: 'Targets and results in one grid',
          caption: 'Every indicator carries its baseline, its target and what has actually been reported, by quarter and by year. The reporting officer sees the gap without first assembling a spreadsheet.',
          alt: 'An indicator grid with baseline and target columns beside quarterly reporting columns, each row naming a programme indicator.',
        },
        {
          src: '/projects/mis-dipbr-web/screens/activity.png',
          width: 956,
          height: 576,
          title: 'Down to the activity that produced the number',
          caption: 'Each headline result opens into the activities underneath it, every one with its own target, so a reported figure can be traced back to the work that produced it.',
          alt: 'An activity table listing programme activities grouped under a result, each with a target figure and its own quarterly columns.',
        },
        {
          src: '/projects/mis-dipbr-web/screens/locks.png',
          width: 956,
          height: 576,
          title: 'Entry stays closed until somebody opens it',
          caption: 'Reporting periods are shut by default and have to be opened deliberately. Editing a quarter that has already been signed off stops being possible, rather than being caught afterwards.',
          alt: 'A period locks screen with counters for rules opening and closing entry, showing that no period windows are currently open.',
        },
      ],
    },
  },
  {
    slug: 'funded-academy-platform',
    name: 'Funded Academy',
    type: 'Fintech Platform · Prop Trading',
    oneLiner:
      'I ran the whole technology stack of a prop-trading firm single-handed as its consulting engineer, until the firm closed in September 2026 — the public sites, the checkout, the staff admin panel and the API behind them. It includes a connection to the MetaTrader 5 trading server that I worked out from scratch when ordinary tools couldn\'t hold the login, plus my own AI tooling: an assistant that has read the 482-topic trading-server manual, and reusable fraud-investigation kits.',
    description:
      'Funded Academy was a prop-trading firm — it funded traders and took a share of what they made — until it closed in September 2026. I was its consulting engineer and owned the whole stack: the public sites, the checkout customers pay through, the staff admin panel, and the API tying them to an external customer-management system the firm buys in. Architecture, breaking the work down and verifying it are mine; the typing is done by AI agents I direct. It also absorbed the earlier analytics and security platform I built for them before launch — its visitor tracking, threat detection and staff permissions live on inside this one.\n\nThe hardest engineering sits where the platform meets the trading server and the money. MetaTrader 5, the trading platform this industry runs on, ties a logged-in session to the exact network connection it was opened on, so an ordinary web client can silently lose the login the moment it reuses a different one. The fix was to own the connection outright and work out the login handshake by hand, writing it down as I went. On top of it sits a live competition engine that ranks a whole group of traders from a single request per round, stores each snapshot so spectators never touch the trading server, and picks itself up after a failed round. Payment handling was hardened after a real attempt to pay a fraction of an order and still have it marked paid — caught, closed, and the attacker\'s own payload now lives on as a test that runs on every change.\n\nThe newest layer is tooling rather than a product feature. I built and ran an AI assistant specialised in administering the trading server, grounded in the vendor\'s own manual — 44 MB of it, converted into 482 searchable topics it reads only as needed. It must cite the manual for every answer, is forbidden to guess, and has to ask for confirmation naming exactly what is about to change before any step that could damage a group holding live funded traders. Two more kits grew out of real fraud cases: one reads the trading server\'s activity logs for signs of shared accounts, hidden locations and multiple devices, adds a location lookup, and produces the spreadsheet and written report the firm\'s risk team works from; another produces risk reports on margin and on profit and loss. Working that assistant against the live server is what turned up an undocumented shortcut — a whole group\'s position in about a quarter of a second, in one request no matter how many traders are in it — which overturned an architecture decision and made the competition engine affordable to run.\n\nEngaged as a consultant from September 2025 and building daily from January 2026 until the firm closed in September 2026, across six deployable surfaces. The site ships in five languages, and a missing translation stops the release rather than shipping a half-translated legal page. Releases go out through one orchestrated deploy that checks all six targets first and aborts before touching a single server — and by deliberate design it never changes the database: those changes are read and applied by hand, a safety gate on a platform handling real money.',
    tier: 'standard',
    status: 'archived',
    statusNote:
      'The firm closed in September 2026. The platform ran live until then; I now build for the same owner\'s construction firm (Titan Development).',
    techTags: [
      'Laravel 12',
      'Next.js 16',
      'Vue 3',
      'MT5 Web API',
      'WooCommerce',
      'Redis',
      'Claude Code',
    ],
    techStack: {
      languages: ['PHP 8.2', 'TypeScript', 'Bash', 'Python'],
      frameworks: [
        'Laravel 12 (Sanctum)',
        'Next.js 16 + React 19',
        'Vue 3 + Vite',
        'WordPress/WooCommerce',
      ],
      data: ['MySQL 8', 'Redis'],
      tools: [
        'Custom MT5 Web API client',
        'Paytiko gateway',
        'Cloudflare Turnstile',
        'Nginx + fail2ban',
        'PHPUnit / Vitest / Playwright',
        'Bash deploy pipeline',
      ],
    },
    highlights: [
      'Six live surfaces run solo while the firm operated — the public sites, the checkout, the staff admin panel and the API behind them',
      'An AI assistant I built for administering the trading server: grounded in the vendor\'s 482-topic manual, made to cite it, forbidden to guess, and required to confirm before touching a group holding live funded traders',
      'Reusable fraud-investigation kits used on real cases — trading-server logs read for shared accounts, hidden locations and multiple devices, written up for the firm\'s risk team',
      'A hand-built connection to the MetaTrader 5 trading server, including a login handshake worked out and documented from scratch',
      'A live competition engine that ranks a whole trading group from one request per round and recovers on its own from a failed round',
      'Closed a real attempt to underpay an order and still have it marked paid; threat detection and server-level blocklists guard every surface',
      'A second compliance review across all six surfaces found a live, unprotected interface handing out real participants\' names and account balances — shut off the same day',
    ],
    hardProblems: [
      {
        challenge: 'The MetaTrader 5 trading server ties a logged-in session to the exact network connection it was opened on — and ordinary web clients quietly swap connections between requests, so no standard tool can promise the login will survive.',
        solution: 'Built the client on a connection the code owns from start to finish, which turns that promise into something explicit. The login handshake and the way the server describes a user\'s permissions were worked out by hand and checked against a real account — first as a rough experiment, then rebuilt properly with the protocol notes written down beside the code.',
      },
      {
        challenge: 'Rank competition entrants on their live trading balances without hammering the trading server, without one failed round killing the event, and without spectator traffic ever reaching the trading server at all.',
        solution: 'The shortcut that makes it possible is undocumented — questioning the AI assistant while probing the live server is what surfaced it: a whole group\'s position in about a quarter of a second, in one request regardless of how many traders are in it, which overturned the original one-request-per-trader design. Each round fetches the whole group at once, stores a snapshot, and tracks each trader\'s peak and start-of-day figures across the server\'s own day boundary; ranking and rule-breach checks run off those snapshots. A failed round is logged and skipped so the loop recovers by itself, and spectators only ever read the stored snapshots.',
      },
      {
        challenge: 'A prospective payment provider required the public site to read as an education product on a simulated trading environment, screened by both AI tooling and human reviewers — where words buried in the page\'s code but never shown on screen still count, and a half-finished clean-up reads worse than none at all. The first attempt treated this as a wording problem and rewrote only the main marketing site.',
        solution: 'A deliberate second pass across every surface, on the premise that fixing only the visible pages is incomplete by construction. It found the competition and prize-draw interfaces live and unprotected — the leaderboard was handing out real participants\' names and account balances to anyone who asked for it. So a rewrite about wording surfaced a genuine data exposure that no amount of editing would ever have closed: nine routes and two scheduled jobs were switched off the same day (leaving the poller running would keep computing leaderboard data nobody can read), confirmed live by requesting the addresses and getting "not found" where they had previously answered — switched off rather than deleted, so reopening is a one-line change once the review window closes.',
      },
      {
        challenge: 'The payment gateway\'s "payment succeeded" message was taken at face value — a crafted message capturing a fraction of the order total would still mark it paid, and a real attempt at exactly that was caught in production.',
        solution: 'Wrote the amount check test-first, as a small standalone piece that runs without the shop software around it, rejecting any success message that doesn\'t cover the full order total — with the real attacker\'s payload kept as a permanent test. It is paired with a thank-you page that tells the customer honestly whether the payment is confirmed, still pending or failed, instead of congratulating them either way.',
      },
      {
        challenge: 'Administering a live trading server leaves no room for a wrong click — one bad change to a group lands on funded traders holding open positions — and the vendor\'s documentation is a 44 MB help file no AI context window, and no human memory, can hold.',
        solution: 'Converted that help file into 482 searchable topics and built an AI assistant around it that keeps only a small index in mind and fetches topics as it needs them. Every answer must cite the manual, guessing is forbidden, and anything destructive — deleting a group, changing how a running server routes orders — requires an explicit confirmation naming exactly what is about to change before it runs.',
      },
    ],
    keyDecisions: [
      {
        decision: 'Talking to the trading server',
        chose: 'Owning the network connection outright',
        over: 'A standard web client library',
        because: 'The trading server ties the login to the connection, and a library that quietly reuses a different one breaks the session — owning the connection makes the guarantee explicit.',
      },
      {
        decision: 'Curbing abuse of the public prize-draw entries',
        chose: 'A silent cap on how fast one visitor can enter',
        over: 'A blanket limit on the whole route',
        because: 'An outright refusal tells an abuser to change address and try again, and a blanket limit punishes everyone else\'s traffic too.',
      },
      {
        decision: 'Taking the exposed pages down',
        chose: 'Switching the routes and the scheduled job off, leaving the code in place',
        over: 'Deleting the competition and prize-draw feature',
        because: 'The review window is temporary — switching them off removes the exposure immediately and switching them back on is a one-line change, with the engine and its tests untouched.',
      },
      {
        decision: 'Database changes in production',
        chose: 'Applying them by hand — the deploy never touches the database',
        over: 'Letting the deploy apply them automatically',
        because: 'A deliberate safety gate on a live payment platform: every change to the database is read and applied by a person.',
      },
    ],
    links: {},
    images: {
      thumbnail: '/projects/funded-academy-platform/thumbnail.png',
      video: '/projects/funded-academy-platform/walkthrough.mp4',
      screens: [
        {
          src: '/projects/funded-academy-platform/screens/home.png',
          width: 956,
          height: 576,
          title: 'A trading platform that says what it is up front',
          caption: 'The header states plainly that all trading happens in a simulated environment with virtual funds. In a category where that is often buried, putting it above the fold is the positioning.',
          alt: 'A dark homepage headed with a line about traders who take execution seriously, above pills naming the profit split and reward timing.',
        },
        {
          src: '/projects/funded-academy-platform/screens/academy.png',
          width: 956,
          height: 576,
          title: 'A free course that asks for nothing first',
          caption: 'Nine lessons, about forty-five minutes, no sign-up. Teaching before selling is the acquisition strategy, so the lessons sit outside the login rather than behind it.',
          alt: 'A knowledge base landing page headed learn, trade, grow, with an illustration of stacked books and a rising chart.',
        },
        {
          src: '/projects/funded-academy-platform/screens/affiliate.png',
          width: 956,
          height: 576,
          title: 'A partner programme with its own front door',
          caption: 'Creators and trading communities get a page written for them rather than a footer link, because they are a different audience from the traders themselves.',
          alt: 'A partner programme page headed share opportunity, earn as you grow, over a dark landscape image with a single call to action.',
        },
        {
          src: '/projects/funded-academy-platform/screens/faq.png',
          width: 956,
          height: 576,
          title: 'The rules, searchable, before anyone signs up',
          caption: 'Payouts, drawdown rules and account conditions in one searchable place. The common questions are offered as chips, because most visitors arrive with one of five.',
          alt: 'A help centre page with a large search field and chips for the most-asked topics including profit split and drawdown rules.',
        },
      ],
      objectPosition: 'top',
    },
  },
  {
    slug: 'smart-care-mobile',
    name: 'Smart Care Mobile',
    type: 'Offline-First Mobile · Healthcare',
    oneLiner:
      'An offline-first Android app for women-led mobile health clinics in remote Bangladesh — every form, rule and calculation comes from the database, so new questions reach field workers without anyone installing an update.',
    hook:
      'Offline-first Android for mobile health clinics.',
    description:
      'Smart Care Mobile runs Max Foundation\'s Digital Smart Care programme — women-led mobile health clinics working in the remote char (river-island) areas of Bangladesh, where a phone signal cannot be assumed. It is a standalone modern build, separate from the older monitoring systems: field workers record a full day\'s visits with no connection at all, and everything syncs when they are back in range.\n\nThe heart of it is a form engine driven entirely by the database. The list of questions, the checks that validate the answers, the fields that calculate themselves from other answers, and the questions that only appear once earlier ones are filled in — all of it is configuration that syncs down to the phone, so more than twenty form types can change without touching the app. Syncing is a single compressed download rather than fifty-odd separate requests, which matters a great deal on a weak rural connection; it carries a description of the data structure with it, so even structural changes arrive without a reinstall, and records deleted on the server are marked so phones clear them out too. Locations run six levels deep down to an individual household or child, and shared logic — from working out a location path to deciding whether a growth measurement is a concern — lives in one place instead of being re-implemented behind every screen.\n\nThe app covers every step of a clinic visit across a dozen areas of work, and is fully bilingual in Bengali and English, switchable while it is running. It is live: the backend runs at smcc.mfbmis.net, the app is installed on field devices, and form changes reach them through a database sync rather than a new install. Built AI-orchestrated — architecture, direction and verification by me; implementation via Claude Code agents.',
    tier: 'standard',
    status: 'live',
    techTags: [
      'Kotlin',
      'Jetpack Compose',
      'Laravel',
      'SQLite',
      'WorkManager',
      'Koin',
      'Claude Code',
    ],
    techStack: {
      languages: ['Kotlin (100%)'],
      frameworks: ['Jetpack Compose + Material3', 'Coroutines + StateFlow', 'Navigation Compose'],
      data: ['Raw SQLite (custom DAOs, no Room)', 'MySQL (Laravel backend)'],
      tools: ['Koin DI', 'Retrofit 2 + OkHttp', 'WorkManager', 'Zip4j + OpenCSV', 'Timber'],
    },
    highlights: [
      'Fully bilingual Bengali and English, switchable while the app is running',
      'More than twenty form types come from the database — new forms and new rules reach field workers without an app update',
      'Fifty-plus server tables sync onto the phone as one compressed download, data structure included, so even structural changes need no reinstall',
      'Shared logic kept in one place — location paths, health thresholds — rather than copied behind each screen',
    ],
    hardProblems: [
      {
        challenge: 'Support more than twenty form types with different questions, different checks and dependencies between answers — with every one of them defined in the database and synced from the server, never written into the app.',
        solution: 'A form engine runs each check as a database query with the current answers filled in; calculated fields are worked out in dependency order, so a field that needs another one always waits for it; questions stay disabled until what they depend on has been answered; and one coordinator keeps the pieces of a form workflow in step.',
      },
      {
        challenge: 'Bring more than fifty tables from the server onto the phone over unreliable rural networks — handling changes to the structure of the data itself without an app update, and supporting both a full refresh and a top-up.',
        solution: 'One compressed archive carries the file list, the data structure and every table, replacing fifty-odd separate requests. The phone re-applies the structure only when it has actually changed, imports either everything or only what is new, and clears out records the server has marked as deleted.',
      },
      {
        challenge: 'Some fields have to be calculated from data entered on a different form — a child\'s growth measurement needs the birth date recorded at registration — while the form on screen only knows its own answers.',
        solution: 'When the worker picks a location specific enough to identify an individual, that person\'s registration details are loaded into the form\'s working context so other fields can refer to them. Growth calculations are handed to dedicated WHO reference lookups, and the whole thing still respects the order in which questions unlock.',
      },
    ],
    keyDecisions: [
      {
        decision: 'Storing data on the phone',
        chose: 'Direct queries against the phone\'s own database',
        over: 'A wrapper library that generates them',
        because: 'Direct control over complicated operations, faster builds, and far simpler debugging when something goes wrong in the field.',
      },
      {
        decision: 'How syncing works',
        chose: 'One compressed download for everything',
        over: 'A separate request per table',
        because: 'One request instead of fifty-odd, compressed and checked for corruption — which is what an unreliable rural connection needs.',
      },
      {
        decision: 'Where forms are defined',
        chose: 'In the database',
        over: 'Written into the app',
        because: 'New forms reach field workers through a sync instead of an app install — nobody has to come in from the field to update a phone.',
      },
    ],
    links: {
      live: 'https://smcc.mfbmis.net',
    },
    images: {
      thumbnail: '/projects/smart-care-mobile/thumbnail.png',
      screens: [
        {
          src: '/projects/smart-care-mobile/screens/syncing.png',
          width: 956,
          height: 576,
          title: 'One download, and the phone is ready for the day',
          caption: 'On sign-in the app pulls every table it needs, forms and rules included, as a single compressed file and unpacks it locally. From here the worker can record a full day of visits with no signal at all.',
          alt: 'A phone screen titled Syncing Data with a progress bar at 39 percent, an Importing badge, and a counter reading 11 of 74 tables.',
        },
        {
          src: '/projects/smart-care-mobile/screens/home.png',
          width: 956,
          height: 576,
          title: 'Five doors into a clinic day',
          caption: 'The home screen groups the work a mobile clinic does into registrations, services, monthly reports, health camps and product sales. The greeting names a fictional worker seeded for this capture.',
          alt: 'A phone home screen with five coloured tiles for registrations, services, monthly reports, health camps and product, and a bottom bar for home, upload and reports.',
        },
        {
          src: '/projects/smart-care-mobile/screens/location.png',
          width: 956,
          height: 576,
          title: 'Six levels down to a single courtyard, in Bangla',
          caption: 'Every record starts by placing it: district, upazila, union, ward, community group and courtyard. The whole app switches between Bangla and English from the header while it is running, and the form labels follow.',
          alt: 'A phone form page headed Select Location with six selectors labelled in Bangla, from district down to courtyard, and previous, next and submit buttons.',
        },
        {
          src: '/projects/smart-care-mobile/screens/consent.png',
          width: 956,
          height: 576,
          title: 'Consent comes before the first question',
          caption: 'A new registration opens with a two-page consent notice: what the health information is for, the rights the person keeps, and how the data is protected. The worker cannot reach the form until the person has agreed.',
          alt: 'A phone screen titled Data Collection Consent listing the purpose of collection and the person\'s rights, with page 1 of 2 and a next button.',
        },
      ],
      objectPosition: 'center',
    },
  },
  {
    slug: 'hr-management-system',
    name: 'Max Foundation HR Platform',
    type: 'Enterprise Web · HR',
    oneLiner:
      'A ground-up rebuild of the HR system I had built for the same organisation years earlier — switched over live only after every migrated table was checked row for row, and since extended with modules the old system never had.',
    hook:
      'The old system\'s hidden database rules, brought out into the open.',
    description:
      'The Max Foundation HR Platform handles leave, fingerprint-clock attendance, two-step approvals, work schedules and meeting-room booking for a roughly 30-person organisation. It replaced the older HR system I had built for them myself, which served as both the source of the data and the specification for the new one: matching its behaviour was the bar to clear, because 30 people used it every working day. It has been the live system of record at hrm.mfbmis.net since 31 July 2026.\n\nThe rebuild turns the old design\'s biggest liability inside out. Around 46 rules hidden inside the old database used to change data quietly behind the application\'s back; those were rewritten as ordinary, tested code. Anything that can be worked out — whether someone was present, how much leave they have left, how much time off they are owed — is worked out fresh each time it is asked for, so no stored total can drift away from the truth. One approval engine serves three different kinds of request, re-reading the request inside the transaction so two managers clicking at the same moment can\'t both approve it. And a single leave-overdraft rule backs all four places that enforce it plus the hint shown on the form, because a limit written out five times is a limit that eventually disagrees with itself.\n\nThe switch-over is the headline. Pointing the address at the new system is a one-way door — a leave request left in the wrong state shows up as somebody\'s records being wrong, not as an error — so it ran against a written checklist: a fully green test run, then old-to-new counts matched exactly, table by table (30 staff, 281 leave requests, 483 out-of-office records, 10,143 attendance entries, 36 holidays), with the checks after the flip written down and the old system kept alive in a sandbox for continued comparison. That is how a 15-row leave-status problem was found and repaired the next day.\n\nMatching the old system was the bar for the switch, not the ceiling. Since then the platform has gained modules the old one never had — a support desk, a work log, and team attendance analytics — each behind its own switch that hides it completely until its owner signs off, because "not launched yet" is a rollout question, not a question of who is allowed in. The work log\'s weekly summary is the first AI feature in the system and is built to fail quietly: every way it can fail returns nothing rather than an error, whatever the model writes is re-checked and trimmed before it is used, and the module works perfectly well with the AI switched off. Attendance, meanwhile, stopped depending on someone remembering to export a file from the fingerprint clock: a small agent on a mini-PC in the office polls the device through the working day, remembers where it left off, and forwards the punches to an endpoint that refuses anything unauthenticated rather than accepting it.',
    tier: 'standard',
    status: 'live',
    techTags: ['Next.js', 'Prisma', 'Auth.js', 'TypeScript', 'React 19', 'MySQL', 'Python'],
    techStack: {
      languages: ['TypeScript', 'SQL (MySQL 8)', 'Python (biometric sync agent)'],
      frameworks: [
        'Next.js 16 (App Router)',
        'React 19',
        'Tailwind CSS 4',
        'Prisma 6',
        'Auth.js v5',
        'exceljs',
        '@react-pdf/renderer',
      ],
      data: [
        'MySQL 8 (Prisma-owned schema, 41 models / 18 enums, 25 migrations)',
        'read-only legacy DB connection for migration and parity checks',
        'SQLite watermark on the on-prem sync agent',
      ],
      tools: [
        'Vitest',
        'Playwright',
        'pnpm',
        'PM2 + Apache on cPanel VPS',
        'rsync artifact deploys (prod-only since cutover)',
        'per-module env feature flags',
        'OpenRouter (optional, fail-soft)',
      ],
    },
    highlights: [
      'In production since 31 July 2026 — the switch-over was gated on a fully green test run and an exact, row-for-row match across every migrated table',
      'Around 46 rules hidden inside the old database, rewritten as ordinary, tested code',
      'Nothing that can be calculated is stored: attendance status, leave balances and time owed are worked out fresh on every read, so totals can\'t drift',
      'Three modules the old system never had — support desk, work log, team attendance analytics — each behind its own switch until its owner signs off',
      'Attendance now flows straight from the fingerprint clock through a small on-site agent, instead of waiting for someone to export a file',
    ],
    hardProblems: [
      {
        challenge: 'Around 30 staff depended on the old system every working day. Pointing the address at the new one is a one-way door: any quiet difference in the migrated data shows up as a person\'s records being wrong, not as an error anybody would notice.',
        solution: 'A written switch-over plan with a checklist to pass before the flip and a way back afterwards. The full test suite ran green first, and old-to-new counts were matched exactly, table by table — 30 staff, 281 leave requests, 483 out-of-office records, 10,143 attendance entries, 36 holidays — with the checks after the flip written down and a sandboxed copy of the old system kept alive rather than deleted. That copy is how a 15-row leave-status problem was caught and repaired the next day.',
      },
      {
        challenge: 'After the switch there is no test address any more — every release goes straight to the live system. But three large new modules had to be merged and shipped before their owners had agreed that staff should see them, and doing that by taking permissions away confuses "not launched yet" with "you are not allowed in".',
        solution: 'A switch per module, flipped in the server\'s settings and applied everywhere the module could be reached — its pages, every action that changes data, its file downloads, its dashboard cards and even the counters in the navigation — so a switched-off module is genuinely unreachable rather than merely unlinked. A switched-off feature reports that it doesn\'t exist rather than that it is forbidden, and still refuses any action sent to it directly, since a rollout switch and a permission are independent things.',
      },
      {
        challenge: 'The work log\'s weekly summary is the first AI feature in this system. In an internal HR tool a hosted model is the least reliable thing in the stack, and it must never write bad records or stop somebody from logging their day.',
        solution: 'It runs only on the server and is built to fail quietly: a twenty-second time limit, and every way it can fail — no key, no network, a bad response, unreadable output — returns nothing at all rather than throwing an error, so whatever calls it is obliged to cope with an absent answer. What the model writes is never trusted: a hand-written check re-reads and trims it, and where the model names a category the code looks that name up itself instead of taking an identifier from the model. The module works with the AI switched off entirely.',
      },
      {
        challenge: 'Attendance was only ever as fresh as the last time someone remembered to export a file from the fingerprint clock — but reading the device directly makes the office network and the device itself part of the web application\'s own path.',
        solution: 'Split across the boundary: a small agent on a mini-PC in the office polls the device during working hours, remembers where it left off so it never repeats or misses punches, and forwards them to an endpoint that compares its key safely and refuses anything unauthenticated rather than accepting it. Manual uploads and the live device feed then meet on one shared path, so duplicates are removed and status decided in one place, and a heartbeat page makes a silent agent visible instead of invisible.',
      },
      {
        challenge: 'Monthly attendance reports need a status for every person on every day of the month — but status isn\'t stored anywhere. It is reconciled as it is read, out of clock punches, work schedules, holidays, leave and out-of-office records, and the first version asked the database six separate questions per person, one after another.',
        solution: 'Rebuilt so each person\'s month is worked out at the same time as everyone else\'s, all of them driven by the same shared status engine. The spreadsheet is written using raw day fractions rather than dates, which removes timezone drift from the generated file entirely. The later analytics page reuses those same computed statuses through a small, separately tested piece whose stated rule is to add up the totals across the whole group rather than averaging each person\'s rate.',
      },
    ],
    keyDecisions: [
      {
        decision: 'Where the numbers come from',
        chose: 'Working out status and balances at the moment they are read',
        over: 'Storing running totals kept up to date by the database or a scheduled job',
        because: 'The old system\'s roughly 46 hidden database rules were its single biggest source of invisible state — a figure that is never stored can never drift.',
      },
      {
        decision: 'Releasing a module before it is launched',
        chose: 'A switch per module in the server\'s settings',
        over: 'Withholding people\'s permissions until launch day',
        because: 'Rollout is not a question of who is allowed in; a switch takes effect at once, is reversible without rebuilding anything, and leaves no permissions to be granted back correctly later.',
      },
      {
        decision: 'AI inside a working system',
        chose: 'An optional model that fails quietly and is never trusted',
        over: 'Depending on the model for the feature to work',
        because: 'Every failure simply returns nothing, and a hand-written check re-reads and trims whatever the model produced — the module functions with AI switched off.',
      },
      {
        decision: 'How much to change while rewriting',
        chose: 'Matching the old system\'s behaviour and screens as the bar for switching over',
        over: 'Redesigning it at the same time as rebuilding it',
        because: '30 staff used the old system daily — matching it took the risk out of the flip and made correctness something that could be checked mechanically, table by table.',
      },
    ],
    links: {
      live: 'https://hrm.mfbmis.net',
    },
    images: {
      thumbnail: '/projects/hr-management-system/thumbnail.png',
      screens: [
        {
          src: '/projects/hr-management-system/screens/analytics.png',
          width: 956,
          height: 576,
          title: 'Attendance for the whole office, in one view',
          caption: 'Managers see attendance, absence and late arrivals for every department over any period they choose, worked out from the clock punches, schedules, holidays and leave records rather than typed in by anyone.',
          alt: 'A team attendance analytics page with four summary tiles for attendance rate, absence rate, late rate and average delay, above a line chart of attendance over ten months.',
        },
        {
          src: '/projects/hr-management-system/screens/calendar.png',
          width: 956,
          height: 576,
          title: 'Who is away, at a glance',
          caption: 'Every approved and pending leave request lands on one calendar, colour-coded by status and filterable by department, so a manager planning the week sees the gaps before they become a problem. The names shown here are fictional.',
          alt: 'A monthly leave calendar for July 2026 with green approved and amber pending entries on each day, and filters for department, leave type and status.',
        },
        {
          src: '/projects/hr-management-system/screens/schedules.png',
          width: 956,
          height: 576,
          title: 'Working days set per person, not per office',
          caption: 'Each schedule carries its own start and end time, its own working days and its own late threshold, and staff are assigned to whichever one fits their role, so a field team on a different week is judged by the right rules.',
          alt: 'A schedule management table listing four work schedules with start time, end time, working days, late threshold and the number of staff on each.',
        },
        {
          src: '/projects/hr-management-system/screens/directory.png',
          width: 956,
          height: 576,
          title: 'The staff directory HR actually uses',
          caption: 'Searchable by name, email or staff ID and filterable by department, status and position, with each card opening into the full profile, leave balance and access roles. Names and details shown are fictional.',
          alt: 'A staff management page with a search box, three filter dropdowns and a grid of staff cards showing initials, job title, staff ID, department and email.',
        },
      ],
      objectPosition: 'center',
    },
  },
  {
    slug: 'entrepreneur-lab',
    name: 'Entrepreneurship Lab',
    type: 'Web Platform · Education',
    oneLiner:
      'A learning and community site in both English and Bengali for rural entrepreneurs in Bangladesh — courses with automatic certificates, forums, events, a mentorship programme, and since August 2026 an "anchorship" programme that matches entrepreneurs with business partners.',
    hook:
      'A site in two languages, from empty repository to live in about seven weeks.',
    description:
      'Entrepreneurship Lab is Max Foundation\'s learning and community site for rural entrepreneurs in Bangladesh, rebuilt from scratch to replace the older one. Every page and every piece of content exists in both English and Bengali — courses with interactive lessons, completion certificates issued automatically, discussion forums, events, live sessions, and a mentorship programme whose applicants upload identity and business documents for review. New accounts are approved by staff, matching how the Foundation actually takes people on.\n\nMost of the engineering effort went into making correctness automatic rather than remembered. There are thirteen kinds of lesson content, and the list of what counts as a valid kind is written down once, with an automatic check confirming that the code, the form checks and the database\'s own rules still name exactly the same thirteen. Missing translations are caught in three places: as content is written, as it is loaded, and by a check that afterwards walks every row of every bilingual table. Certificates carry two identifiers: a readable one printed on the certificate that never appears in a web address, and a separate secret one that alone opens the public verification page.\n\nMentors are recruited by staff rather than signing themselves up, so they never choose a password: an administrator sends them a one-time link by phone or WhatsApp, and that link is the only thing standing between a stranger and the account. Four independent safeguards close its failure modes — the link\'s secret is stored only as a scrambled fingerprint, so a stolen copy of the database yields nothing reusable; issuing a new link cancels the previous one; an account that has not yet set a password cannot be logged into at all, rather than falling through to some weaker check; and "no such person" and "person waiting to set a password" are answered identically, down to how long the answer takes, so nobody can probe which identifiers belong to pending mentors. The same pass fixed a quieter hazard: the mentor application\'s eligibility questions were yes/no switches that started on "no". Once stored, a switch nobody touched looks exactly like a deliberate answer, so every skipped question would have been filed as a confident "no". They became required choices with nothing pre-selected, so an unanswered question is refused at submission instead of turning into a plausible lie.\n\nSix consultant training slide decks — the wrong format for the audience, impossible to keep track of and impossible to translate — became a Bengali course library: 12 modules and 27 lessons, each course stored as ordinary files that are reviewed like code rather than typed into a database, so a change to course content is a change anyone can read and approve. They publish in Bengali only, the honest choice over shipping machine-translated English. The whole site went from an empty repository to live in about seven weeks, built with AI coding agents against an architecture and a verification plan I wrote, with a set of automatic checks that must pass before every release. One bug that appeared only on the live server was traced to the framework the site is built on and fixed by upgrading it, rather than by guessing at a workaround.\n\nIn August 2026 the site gained two new programmes. Anchorship goes a step beyond mentorship: an "anchor" is an established business person an entrepreneur could actually go into business with, not just take advice from. Anchors apply through a public form, staff review and approve them, and approved anchors appear in a directory members can browse. Alongside it, a public partnership page lets research institutions and businesses, at home or abroad, register their interest, with a list for staff to work through.',
    tier: 'standard',
    status: 'live',
    techTags: ['Next.js 16', 'PostgreSQL', 'Drizzle', 'TypeScript', 'React 19', 'i18n', 'Claude Code'],
    techStack: {
      languages: ['TypeScript', 'SQL', 'Markdown (course content)'],
      frameworks: [
        'Next.js 16 (App Router)',
        'React 19',
        'Drizzle ORM',
        'Auth.js v5',
        'next-intl',
        'Tailwind + shadcn/Radix',
        'react-hook-form + Zod 4',
        '@react-pdf/renderer',
      ],
      data: ['PostgreSQL (44 tables, 12 domain schema modules, 27 migrations)', 'argon2'],
      tools: [
        'Vitest',
        'Playwright',
        'pnpm',
        'sharp',
        'gray-matter',
        'PM2 + cPanel VPS',
        'rsync deploy',
        '8 pre-deploy quality-gate scripts',
      ],
    },
    highlights: [
      'Empty repository to a live public site in about seven weeks, replacing the previous platform',
      'Every page and every piece of content in both English and Bengali, with automatic checks so no translation can go missing',
      '13 kinds of interactive lesson content, from quizzes to videos, with certificates issued automatically on completion',
      '6 consultant slide decks turned into a 12-module, 27-lesson Bengali course library',
      'Mentorship and, since August 2026, Anchorship programmes with staff-reviewed applications and a member directory; plus an enquiry channel for partner organisations',
    ],
    hardProblems: [
      {
        challenge: 'Mentors are invited by staff rather than signing up, so an administrator hands them a one-time link by phone or WhatsApp — and that link is the only thing authorising whoever opens it. It has to survive a stolen copy of the database, someone reusing an old link, and someone probing whether a given phone number belongs to a pending mentor.',
        solution: 'Four independent safeguards: the link\'s secret appears once in the link itself and is stored only as a scrambled fingerprint; issuing a new link cancels the previous unused one; an account with no password set cannot be logged into by the ordinary route at all; and "no such person" and "waiting to set a password" are answered identically, down to how long the answer takes, so timing leaks nothing. Links last fourteen days on purpose, because delivery by phone is slow.',
      },
      {
        challenge: 'The mentor application\'s eligibility questions were yes/no switches that started on "no". Once stored, a switch nobody touched looks exactly like a deliberate answer, so every skipped question would have been recorded as a real "no" — the applicant never sees it, and the reviewing administrator sees a confident false answer.',
        solution: 'The switches became required choices with nothing pre-selected, so an unanswered question is refused at submission instead of turning into a plausible lie. A wrong default is unrecoverable once stored; making the form complain is the cheaper mistake.',
      },
      {
        challenge: 'Thirteen kinds of lesson content have to line up from the authoring screen through the database to the lesson player — but the list of what is valid lived in three places that can silently drift apart: the code, the form checks, and the database\'s own rules.',
        solution: 'The list is written down once and everything else is derived from it, with a dedicated check that reads the database\'s rules and confirms they name exactly the same thirteen kinds. That check is one of the gates every release must pass, on top of a substantial suite of tests for the lesson-content layer.',
      },
      {
        challenge: 'Every piece of content exists in English and Bengali, and a missing translation shows a reader a blank or wrong-language field. With thousands of interface phrases per language plus both languages on every content field, nobody can catch the gaps by reading.',
        solution: 'Three layers of enforcement: content is refused at the point of writing if neither language is filled in, the loading step asserts completeness, and a final check walks every row of every bilingual table. A separate gate keeps the two interface phrase lists identical in structure, so neither can quietly lose an entry.',
      },
      {
        challenge: 'Mentor registration worked locally and failed on the live server: a timing fault in how the site received submitted forms dropped them, and it only happened under the live setup, so the usual add-a-guard-and-ship loop could never confirm a fix.',
        solution: 'Traced to the framework the site is built on rather than to the site\'s own code, and fixed by upgrading it. The two deployment problems that surfaced alongside were written into the deploy script rather than left as things to remember — live builds forced onto the build tool that actually works on the server, and leftover development files cleared before every build so one can never reach the live site.',
      },
    ],
    keyDecisions: [
      {
        decision: 'Getting mentors into their accounts',
        chose: 'One-time set-password links handed out by an administrator',
        over: 'Emailed password resets, or letting mentors pick a password when they apply',
        because: 'Mentors are reached by phone and WhatsApp, not reliable email, and an administrator already vets each one — handing over a link off-platform fits how the programme actually runs and needs no mail system at all.',
      },
      {
        decision: 'Where course content lives',
        chose: 'Ordinary files loaded in by a script',
        over: 'Typing the courses into the admin screens',
        because: 'Course content sits alongside the code where every change can be read and approved, is checked as it is loaded, and can be reloaded onto any copy of the site.',
      },
      {
        decision: 'How the two languages are stored',
        chose: 'English and Bengali side by side on the same record',
        over: 'A separate table of translations',
        because: 'One record per thing keeps queries simple and lets the automatic completeness checks look straight at it.',
      },
      {
        decision: 'Publishing the consultant courses',
        chose: 'Bengali only, with the gap recorded in the data',
        over: 'Machine-translating them into English so both languages match',
        because: 'The source decks and the audience are both Bengali — recording the gap is honest, where unreviewed translations would mean switching off the very checks that keep translations complete.',
      },
    ],
    links: {
      live: 'https://entrepreneurship-lab.org',
    },
    images: {
      thumbnail: '/projects/entrepreneur-lab/thumbnail.png',
      screens: [
        {
          src: '/projects/entrepreneur-lab/screens/home.png',
          width: 956,
          height: 576,
          title: 'A learning platform for rural entrepreneurs',
          caption: 'The homepage leads with the number it is judged on — the rural entrepreneurs it has reached — beside a photograph of an actual training session rather than stock imagery.',
          alt: 'A learning platform homepage headed transform your business dreams into reality, beside a photograph of a training session in progress.',
        },
        {
          src: '/projects/entrepreneur-lab/screens/courses.png',
          width: 956,
          height: 576,
          title: 'Courses filtered the way learners search',
          caption: 'Thirteen courses filtered by category, level and language, because the catalogue serves people learning in more than one language and at very different starting points.',
          alt: 'A course catalogue headed explore our courses, with a search field and filters for category, level and language above the course cards.',
        },
      ],
      objectPosition: 'top',
    },
  },
  {
    slug: 'entresoft',
    name: 'EntreSoft Platform',
    type: 'ERP Suite · Micro-Enterprise Commerce',
    oneLiner:
      'The working trading system for a micro-entrepreneur programme in Bangladesh, handed over by an outside contractor with no documentation at all. I wrote the missing documentation, added new features, and moved it onto its permanent home — as the only person looking after it.',
    hook:
      'An inherited system nobody had documented, moved live in a day.',
    description:
      'EntreSoft runs the day-to-day trading for Max Foundation\'s micro-entrepreneur programme in Bangladesh. One system serves four groups at once — head office, regional offices, suppliers, and the entrepreneurs themselves — through a back office for staff, a bilingual ordering app on the Play Store for entrepreneurs, and a separate planning console for the people who forecast demand. An outside contractor built the original and handed it over in late 2024 with no documentation of any kind. Everything since has been mine alone: writing the documentation that was missing, adding new business features on top of inherited code, and moving the whole thing onto its production home. I set the architecture, direction, and verification; AI coding agents did the implementation.\n\nThe features added since the handover follow how the programme actually trades. A volume-discount engine pools the quantities across a whole order before deciding which discount level applies, so a buyer is not penalised for splitting an order across several lines. Entrepreneurs can revise an order after placing it — totals are always recalculated by the system rather than trusted from the customer\'s device, and every change is written to a record that can only be added to, never edited over. The planning console works like a spreadsheet, and when two planners touch the same figure the second save is refused instead of quietly wiping the first. When the contractor\'s next release moved the staff panel and would have broken every bookmark staff had, I refused the move and gave the new entrepreneur shop its own web address instead.\n\nThe riskiest part was the move to production. The live system was a hand-copied snapshot running month-old code, with real users on it, and the change had to land the back office, the planning console, and a new Play Store release together. So the release tooling came first — scripted deployments, plus a way to copy live data down to a test copy with personal details stripped out, rehearsed across 34 recorded runs. The move itself followed a written script in July 2026 and all three parts went live in one day; the single problem that surfaced afterwards was found and fixed the same day.',
    tier: 'standard',
    status: 'live',
    techTags: [
      'Laravel 10',
      'Flutter',
      'MySQL',
      'Next.js 16',
      'React 19',
      'Firebase',
      'Claude Code',
    ],
    techStack: {
      languages: ['PHP 8.1', 'Dart', 'TypeScript', 'SQL'],
      frameworks: [
        'Laravel 10 (Passport, Sanctum, spatie/laravel-permission)',
        'Flutter (Dio, get_it, Syncfusion)',
        'Next.js 16 / React 19 (iron-session, TanStack Query/Table)',
      ],
      data: ['MySQL', 'exceljs / maatwebsite-excel pipelines', 'mPDF'],
      tools: [
        'PM2 + Apache reverse proxy',
        'cPanel/rsync deploy scripts',
        'Vitest + MSW',
        'PHPUnit',
        'Firebase push',
        'Play Store distribution',
      ],
    },
    highlights: [
      'Four codebases kept in step: the main system, the entrepreneurs\' ordering app, the planning console, and the documentation',
      'A full set of written architecture documentation, produced from scratch for a system that arrived with none',
      '34 rehearsed deployments first, then a scripted move to production with all three parts switched over in one day',
      'The discount engine and the planning console are both covered by automated tests that run on every change',
    ],
    hardProblems: [
      {
        challenge: 'The contractor handed over a live system with three different faces and a large phone app, and not one page of documentation. Any tidying up risked breaking bookmarked addresses and the app already installed on people\'s phones.',
        solution: 'Documentation first: a numbered set of architecture documents written onto every part of the system, plus a standing rule that inherited names stay exactly as they are — misspellings included — because those names are wired into web addresses and into the app already out in the field.',
      },
      {
        challenge: 'The contractor\'s next release moved the staff panel and put the new entrepreneur shop at the front door — which would have broken every bookmark head office, the regional offices, and suppliers had saved.',
        solution: 'Refused the move and gave the shop its own web address instead, so shop pages answer only on the shop\'s address and staff pages stay where staff left them. The trade-off is written into the code, and the address rule switches itself off during testing so the full test suite still passes.',
      },
      {
        challenge: 'The live system was a hand-copied snapshot running month-old code, with real users on it — and the changeover had to land the back office, the planning console, and a new Play Store release together.',
        solution: 'Built the release tooling first — scripted deployments plus a way to copy live data down to a test copy with personal details stripped, proven over 34 recorded runs — then worked through a written script during a window with users paused: check the ground, take backups, deploy, switch over the console, test end to end, and fix the one problem that surfaced the same day.',
      },
    ],
    keyDecisions: [
      {
        decision: 'Tidying up inherited code',
        chose: 'Leaving the contractor\'s names exactly as they were, misspellings included',
        over: 'Renaming things for tidiness',
        because: 'Those names are wired into web addresses and into the app already installed on people\'s phones — a rename breaks both.',
      },
      {
        decision: 'How the entrepreneur shop reads data',
        chose: 'Having the shop ask the system\'s own app service for data, the same way the phone app does',
        over: 'Letting the shop reach straight into the database',
        because: 'That service is already tested and in daily use — one set of business rules serves the shop and the phone app alike.',
      },
      {
        decision: 'Two planners editing the same figure',
        chose: 'Refusing the second save when the figure changed underneath it',
        over: 'Letting the last save win, or locking rows while someone edits',
        because: 'Nobody is blocked from working and no edit is silently lost — which is what people expect from a spreadsheet.',
      },
    ],
    links: {
      live: 'https://bdentresoft.com',
    },
    images: {
      thumbnail: '/projects/entresoft/thumbnail.png',
      screens: [
        {
          src: '/projects/entresoft/screens/dashboard.png',
          width: 956,
          height: 576,
          title: 'The month, for whoever runs the region',
          caption: 'Entrepreneurs, suppliers and products in one count, with order value trends and the delivered-against-pending split beside them.',
          alt: 'A dashboard with count tiles for entrepreneurs, suppliers and products, a bar chart of order amounts and a doughnut chart of order status.',
        },
        {
          src: '/projects/entresoft/screens/products.png',
          width: 956,
          height: 576,
          title: 'The catalogue a rural seller orders from',
          caption: 'Everyday household goods with their price, supplier and stock status. Micro-entrepreneurs order from this list, so what appears here is what they can actually sell that week.',
          alt: 'A product catalogue laid out as cards of household goods, each showing a photograph, price, supplier and whether it is in stock.',
        },
      ],
    },
  },
  {
    slug: 'titan-platform',
    name: 'Titan Development Platform',
    type: 'Multi-Surface Platform · Construction',
    oneLiner:
      'A public website, an editing tool the client\'s own staff use, and a supplier portal for a New York construction firm — three audiences served by one system under one set of publishing rules. Live since July 2026; the supplier half is built but deliberately still switched off.',
    description:
      'Titan Development, a construction firm in New York, needed one system to serve three different audiences at once: the public, its own staff who write the content, and the subcontractors and suppliers it hires. That means a marketing website, an editing tool simple enough that the client\'s team actually uses it, and a portal where suppliers will handle applications, proposals, invoices, and bank payment details. Rather than three separate products, it is one application with three front doors, plus an administration panel for staff. I set the architecture, broke the work down, and verified it; AI coding agents did the implementation.\n\nThe hard part is keeping the two editing tools in agreement. Client staff work in the friendly editor while the firm\'s administrators review from the more powerful panel, so one part of the system owns every approve, reject, and publish step and the two tools only display what state a page is in. Each page keeps its working draft, its submitted version, and its published version side by side, so the public site keeps serving the last approved version even while someone is halfway through rewriting it, and every change is recorded against the person who made it. On the supplier side, each uploaded document gets a fingerprint either party can re-check to prove the file was not altered after submission, bank details are stored encrypted and superseded rather than overwritten when they change, and no supplier file sits anywhere the public could reach it.\n\nThe marketing site and the editing tool went live at titandevelopment.com on 29 July 2026, with 19 real projects moved across. The old staging address is kept as a test copy, hidden from search engines. The supplier portal is built and already sitting in production, but behind a switch that is off by default and still mid-development — it will be turned on when suppliers are ready to be brought in. Every release rebuilds the site, clears the development leftovers that would otherwise point the live site at a developer\'s laptop, and takes a database backup first as the way back if anything goes wrong.',
    tier: 'flagship',
    status: 'live',
    techTags: [
      'Laravel 12',
      'React 18',
      'Inertia SSR',
      'TypeScript',
      'Filament 3',
      'MySQL',
      'Claude Code',
    ],
    techStack: {
      languages: ['PHP 8', 'TypeScript'],
      frameworks: ['Laravel 12', 'Inertia.js 2', 'React 18', 'Filament 3', 'Tailwind CSS', 'Pest 4'],
      data: ['MySQL'],
      tools: [
        'Vite 7 (SSR build + supervisor)',
        'MapLibre GL',
        'spatie/laravel-permission',
        'Ploi + DigitalOcean',
        'Docker (staging)',
        'rsync deploy with pre-deploy DB dumps',
      ],
    },
    highlights: [
      'Three audiences — public visitors, the client\'s own editors, and suppliers — plus a staff admin panel, in one system with one release',
      'Both editing tools obey one publishing rulebook, so the client\'s editor and the staff panel can never drift apart on what "published" means',
      'An automated test suite exercises the publishing workflow and the supplier flows on every change',
      'Live at titandevelopment.com since 29 July 2026, with 19 real projects moved into the new editor',
      'The supplier portal is built and deployed but switched off by default — shipped quietly, not yet opened to suppliers',
    ],
    hardProblems: [
      {
        challenge: 'Two editing tools — the client\'s own editor and the staff panel — change the same page through the same life cycle, from draft to submitted to approved to published. And a published page being rewritten must keep showing its last approved version to the public.',
        solution: 'One part of the system is the sole authority on approve, reject, and publish; both tools call it and only display the result. Every page keeps its draft, its submitted version, and its published version in separate places, so the public site reads the last approved one even mid-rewrite. Each step either completes fully or not at all, and each leaves a record of who did it and when.',
      },
      {
        challenge: 'Suppliers submit invoices, proposals, and bank payment details — the client needed proof that nothing had been altered after submission, and bank numbers could not sit in the database as plain readable text.',
        solution: 'Every file gets a fingerprint the moment it is uploaded, shown to both parties; checking it later re-reads the file from disk and compares in a way that gives nothing away about the answer. Bank details get their own fingerprint, are stored encrypted, and move through pending, confirmed, and superseded — so changed details replace the old ones without erasing the record of them.',
      },
      {
        challenge: 'This kind of site has one sharp failure mode on a managed server: a leftover marker file from development makes the live site try to load its styling and scripts from a developer\'s own laptop — and there was no versioned release to fall back to.',
        solution: 'A release script rebuilds everything, deletes that marker explicitly and refuses to copy it up, restarts the process that renders pages on the server, and takes a consistent database backup before every release — keeping the last ten as the way back.',
      },
    ],
    keyDecisions: [
      {
        decision: 'How many applications to build',
        chose: 'One application with three front doors',
        over: 'Separate products for the website, the editor, and the portal',
        because: 'Shared data, one login system, and one set of publishing rules — and a single thing to release, for a project maintained by one person.',
      },
      {
        decision: 'Who edits what, and where',
        chose: 'A purpose-built editor for the client plus a fuller panel for staff',
        over: 'Giving everyone the same admin panel, or buying an off-the-shelf one',
        because: 'The client\'s editors get something simple they will actually use and staff get the power they need — while both obey the same publishing rules, so they cannot diverge.',
      },
      {
        decision: 'How pages are built and delivered',
        chose: 'Pages assembled on the server, then made interactive in the browser',
        over: 'A separate data service with the whole site built in the browser',
        because: 'Search engines can read the marketing pages properly, without maintaining a second service, and every page checks who you are on the server.',
      },
    ],
    links: {
      live: 'https://titandevelopment.com',
    },
    images: {
      thumbnail: '/projects/titan-platform/thumbnail.png',
      video: '/projects/titan-platform/walkthrough.mp4',
      screens: [
        {
          src: '/projects/titan-platform/screens/home.png',
          width: 956,
          height: 576,
          title: 'Construction that starts at the drawing, not the build',
          caption: 'The homepage argues the firm\'s whole differentiator in one line: most contractors arrive on build day, this one joins at schematic design. The five-stage pipeline underneath shows exactly where they come in.',
          alt: 'A construction firm\'s homepage over a photograph of a site crew, headed with a quote about starting at schematic design, above a five-stage project pipeline.',
        },
        {
          src: '/projects/titan-platform/screens/services.png',
          width: 956,
          height: 576,
          title: 'Each service gets its own argument',
          caption: 'Construction management, development, general construction and facility management each have their own page rather than a shared list, because a client arrives looking for one of them specifically.',
          alt: 'A construction management service page over a photograph of a site hoarding, with a subtitle about advocacy from schematic design through final delivery.',
        },
        {
          src: '/projects/titan-platform/screens/projects.png',
          width: 956,
          height: 576,
          title: 'A portfolio you can filter by sector',
          caption: 'Nineteen projects across five sectors, filterable by the one a visitor cares about, with a map view for anyone who wants to know what has been built near them.',
          alt: 'A project portfolio page showing counts of projects and sectors, with sector filter tabs and a grid of project cards below.',
        },
        {
          src: '/projects/titan-platform/screens/project.png',
          width: 956,
          height: 576,
          title: 'Every project answers the same questions',
          caption: 'Client, role and sector sit directly under the title on every project, so a prospective client can see what the firm was actually responsible for rather than guessing from photographs.',
          alt: 'A project detail page for the Barclays Center plaza improvements, with client, role and sector listed beneath a full-width photograph.',
        },
      ],
      objectPosition: 'top',
    },
  },
  {
    slug: 'onupom-shopno',
    name: 'Onupom Shopno',
    type: 'Scholarship Platform · Education',
    oneLiner:
      'Bangladeshi students find scholarships and get matched with donors without their identities being handed over.',
    hook:
      'Anonymity built into the data, not promised in a policy.',
    description:
      'Onupom Shopno helps students in Bangladesh reach scholarships, donors, and learning material. One website sits over one shared service and covers six areas: scholarships, fundraising, e-learning, exchange, cafe, and resources.\n\nStudent privacy is built into the data rather than promised in a policy. Every student carries two identities — a public one used everywhere a donor can see, and an internal one that never leaves the system. Public pages can therefore only ever show a curated set of details with nothing identifying in them, until a match has been verified. A scholarship application is not one form but five to ten documents reviewed one by one: each carries its own status, its own feedback from the reviewer, and its own history, so a student replaces a single rejected document rather than starting over.\n\nThe shape of the system is set by where it has to run — a low-cost shared host with no background workers, no live connections, and no scheduled jobs, the machinery a site this size would normally lean on. So everything happens in the moment a request arrives: notification emails are stored and sent in batches an administrator triggers, the abuse checks keep their working data only for the length of one request, and pages ask for updates instead of being pushed them. Rules such as who is eligible for what are written in one place and called from everywhere, so they cannot quietly drift apart.',
    tier: 'standard',
    status: 'live',
    techTags: ['Laravel 11', 'Vue 3', 'Sanctum'],
    techStack: {
      languages: ['PHP 8.2', 'TypeScript', 'JavaScript'],
      frameworks: ['Laravel 11', 'Vue 3', 'Tailwind CSS', 'Pinia'],
      data: ['MySQL', 'Laravel Sanctum'],
      tools: ['Vite', 'Composer', 'PHPUnit', 'Vitest', 'Playwright'],
    },
    highlights: [
      'Six areas — scholarships, fundraising, e-learning, exchange, cafe, and resources — served by one system',
      'Donors browse and match with students without ever being shown who they are',
      'Scholarship applications reviewed document by document, each with its own status, feedback, and history',
      'Eligibility and other business rules written once and called from everywhere, so they cannot drift apart',
    ],
    hardProblems: [
      {
        challenge: 'Matching donors with students means showing donors something real, while a student\'s identity must not be exposed.',
        solution: 'Each student has a public identity separate from the internal one, and public pages show only a curated set of details that cannot identify anybody.',
      },
      {
        challenge: 'A scholarship application means five to ten documents per student, each needing its own review, its own feedback, and its own resubmission if it is rejected — across seven possible stages.',
        solution: 'Each document is tracked in its own right, with its own status, its own note from the reviewer, and its own history for the audit trail; the queries behind the reviewers\' work queues live in one place rather than being rewritten wherever they are needed.',
      },
      {
        challenge: 'The host it has to run on offers no background workers, no live connections, and no scheduled jobs — exactly the machinery a site this size would normally rely on.',
        solution: 'Everything happens while the request is being handled: notification emails are stored and sent in batches an administrator triggers, the abuse checks hold their working data only for the length of one request, and pages ask for updates instead of being pushed them. Anything that would normally run in the background is turned into a deliberate batch job someone starts.',
      },
      {
        challenge: 'During development the site and the service behind it ran at two different addresses, which broke the security check that stops other websites submitting forms on a user\'s behalf.',
        solution: 'Routed the service through the same address as the site during development, so the browser treats them as one place and the login cookies behave exactly as they do in production.',
      },
    ],
    keyDecisions: [
      {
        decision: 'How people stay logged in',
        chose: 'The framework\'s own cookie-based login',
        over: 'Token-based login schemes',
        because: 'It fits a single-page site natively, needs no token-refresh machinery, and brings protection against forged form submissions with it.',
      },
      {
        decision: 'Where database queries live',
        chose: 'A dedicated layer that owns every query',
        over: 'Queries written directly into each page',
        because: 'A query is written once, behaves the same everywhere it is used, and can be tested on its own.',
      },
    ],
    links: {
      live: 'https://onupomshopno.com',
    },
    images: {
      thumbnail: '/projects/onupom-shopno/thumbnail.png',
      screens: [
        {
          src: '/projects/onupom-shopno/screens/home.png',
          width: 956,
          height: 576,
          title: 'A scholarship platform that opens with why',
          caption: 'The landing page leads with the idea behind the fund rather than the application form, then states how many students have been supported and that the programme takes no fee.',
          alt: 'A dark scholarship platform homepage built around a proverb about lighting a candle, above counts of students supported and programmes offered.',
        },
      ],
      objectPosition: 'top',
    },
  },
  {
    slug: 'ru-rokeya-hall',
    name: 'Rokeya Hall Alumni Network',
    type: 'Alumni Platform · Education',
    oneLiner:
      'Bengali-first alumni network for Rajshahi University\'s Rokeya Hall: members register and pay their fee online, choose exactly what the public directory shows about them, and the committee edits the site\'s own wording themselves.',
    description:
      'The alumni association of Rajshahi University\'s Rokeya Hall needed a public website in Bengali, a member directory, online membership registration with payment, and a way to welcome back 845 existing members without making them start from scratch. The site is live at rurokeyahall.org. It is a modest project done carefully — the interesting parts are how it handles privacy, money, and a non-technical committee.\n\nPrivacy first. The association\'s written policy says each member decides not just whether she appears in the public directory, but which details appear — occupation yes, phone number no. The site enforces exactly that, field by field, rather than offering a single "show me" switch. Existing members find their old record, confirm it is theirs, and the registration form is pre-filled — the old data is kept separate from fresh registrations, and every claim leaves a trail of who claimed which record and when.\n\nPayment came in August 2026. Membership costs ৳3,000, paid through SSLCommerz — Bangladesh\'s main payment gateway, which accepts bKash, cards and bank transfer. The rule throughout is that nobody becomes a member until the gateway has confirmed the money, and the site double-checks every confirmation against the gateway itself rather than trusting the message that arrives. If a member closes her browser mid-payment she gets a link to pick up where she left off; if a confirmation is lost, an administrator can re-check any transaction with one request. The first real payment settled on launch day, and members receive a registration acknowledgement and a receipt by email.\n\nThe committee also wanted to change the site\'s wording themselves without calling a developer. Rather than a full content-management system — which would mean an empty or broken database shows a blank site — the site ships with all its text built in and stores only the edits. Committee members click a paragraph, change it, and save; if anything goes wrong with the edits, visitors simply see the original text. Nothing they can do takes the site down.\n\nIt runs in a small, locked-down container on a shared server, and the live database change for payments was done by hand with a verified backup so the 845 legacy records were never at risk. One honest caveat: formal client sign-off on the editing feature is still pending.',
    tier: 'standard',
    status: 'live',
    techTags: ['React 19', 'TypeScript', 'Express 5', 'Prisma 7', 'MySQL', 'SSLCommerz', 'Docker'],
    techStack: {
      languages: ['TypeScript'],
      frameworks: ['React 19', 'Vite 7', 'Express 5', 'Prisma 7', 'Tailwind CSS'],
      data: ['MySQL (shared Docker instance)'],
      tools: [
        'SSLCommerz v4 REST client (init, IPN, validation, reconcile)',
        'Nodemailer over cPanel SMTP relay (SPF/DKIM verified)',
        'react-hook-form + zod v4',
        'bcryptjs + httpOnly JWT cookie auth',
        'sharp build-time image pipeline',
        '3-stage Dockerfile + docker-compose',
        'Playwright',
      ],
    },
    highlights: [
      'Online membership registration with ৳3,000 fee via SSLCommerz (bKash, cards, bank) — live since 28 Aug 2026, first real payment settled on launch day',
      'Nobody becomes a member until the gateway confirms the money — every confirmation is verified with the gateway, not taken on trust',
      '845 existing members can find and claim their old record instead of re-registering from nothing',
      'Members choose which details the public directory shows — the policy is enforced field by field',
      'The committee edits site wording in place; if the editing layer ever fails, visitors see the original site, never a blank one',
    ],
    hardProblems: [
      {
        challenge: 'Taking real money for membership means two systems have to agree: the payment gateway says "paid", and the site has to mark the right person as a member — exactly once — even when the gateway\'s confirmation arrives twice, late, or not at all.',
        solution: 'A payment record is created before the member is ever sent to the gateway, so there is always something to reconcile against. Both ways a confirmation can arrive — the gateway\'s server-to-server notice and the member\'s browser returning — go through one settlement step that verifies the transaction with the gateway and refuses any confirmation that doesn\'t match the original request. Settlement is safe to repeat, so duplicates are harmless; an administrator can re-check any transaction on demand; and a member who drops out mid-payment gets a link to resume. Membership is activated only once the money is confirmed.',
      },
      {
        challenge: 'The association\'s policy lets each member choose which details appear in the public directory, not just whether she appears — so a single "show me" switch cannot express "show my occupation, hide my phone."',
        solution: 'Each member record carries a directory opt-in plus a per-field consent list, and the directory checks that list for every detail it shows. The code cites the relevant policy sections, so the privacy behaviour can be traced back to the rule it implements.',
      },
      {
        challenge: 'The committee wanted to reword site text themselves. A content-management system would have made the database the source of every sentence — so an empty or unreachable database would show a blank site. A heavy price for a committee editing a few paragraphs a year.',
        solution: 'The site ships with all its text built in and stores only the edits. Every sentence shows its edited version if one exists and the original otherwise. If the edits table is empty, the request fails, or the server is down, visitors see exactly the original site — and "revert" is simply deleting the edit.',
      },
      {
        challenge: 'Committee members edit live text with no preview step — saving is immediately public, by their own choice — from a box that will inevitably receive text pasted from Word, on a login that may have quietly expired by the time they press Save.',
        solution: 'Pasted formatting is stripped to plain text on the server so what the editor sees is what visitors get. Saves apply instantly on screen and roll back if they fail; an expired login shows "please log in again" beside the text instead of silently losing it.',
      },
      {
        challenge: '845 pre-existing member records of uneven quality: importing them straight in would mix unverified data with fresh registrations; discarding them would force long-standing alumnae to re-register from nothing.',
        solution: 'The old records are kept in a separate, quarantined table. A returning member looks up her record, confirms it, and the registration form is pre-filled from it — with a note of which record was claimed and when.',
      },
      {
        challenge: 'A small site still shares a server with other applications — it must not hog memory, expose itself to the open internet, or run with more privileges than it needs. And the editing tools are dead weight for the public visitors on mobile connections who are nearly all of the traffic.',
        solution: 'The site runs as a restricted user in a container capped at 256 MB, reachable only through the server\'s front door. The editing tools are downloaded only after a committee member logs in, so ordinary visitors never fetch them.',
      },
    ],
    keyDecisions: [
      {
        decision: 'Trusting a payment confirmation',
        chose: 'Verify every confirmation with the gateway and require it to match the original request',
        over: 'Accepting the gateway\'s "success" callback as-is',
        because: 'A confirmation can be delayed, duplicated, or forged; the only safe rule is that money is real when the gateway itself says so for that exact transaction.',
      },
      {
        decision: 'Changing the live database for payments',
        chose: 'Hand-written SQL with a verified backup first',
        over: 'Letting the schema tool push the change',
        because: 'The tool\'s "sync" can drop and recreate tables; 845 real member records were not worth the convenience.',
      },
      {
        decision: 'Directory privacy model',
        chose: 'Per-field consent list',
        over: 'A single directory-visibility switch',
        because: 'The association\'s policy mandates field-level opt-in — the site enforces the policy instead of approximating it.',
      },
      {
        decision: 'Client-editable copy',
        chose: 'The database stores overrides only',
        over: 'A CMS owning all copy',
        because: 'An empty table or a dead server renders the site unchanged — the editing feature cannot take the public site down.',
      },
      {
        decision: 'Legacy data handling',
        chose: 'Separate legacy table plus a claim-your-record flow',
        over: 'Direct import into the member table',
        because: 'Uneven legacy data stays quarantined; members verify and claim their own record, with an audit trail.',
      },
    ],
    links: {
      live: 'https://rurokeyahall.org',
    },
    images: {
      thumbnail: '/projects/ru-rokeya-hall/thumbnail.png',
      screens: [
        {
          src: '/projects/ru-rokeya-hall/screens/home.png',
          width: 956,
          height: 576,
          title: 'An alumni association, entirely in its own language',
          caption: 'The site is built in Bengali throughout, not translated into it — the navigation, the membership flow and the reunion registration all read natively for the alumnae who use them.',
          alt: 'An alumni association homepage in Bengali over a photograph of the residence hall, with membership and reunion buttons.',
        },
        {
          src: '/projects/ru-rokeya-hall/screens/about.png',
          width: 956,
          height: 576,
          title: 'Who the association is, for members deciding to join',
          caption: 'The organisation page explains what the association is and is not, which matters when the ask on every other page is a paid membership.',
          alt: 'An about page in Bengali over an image of the hall lit up at night, introducing the association and its purpose.',
        },
      ],
      objectPosition: 'top',
    },
  },

  // ==================== MINOR PROJECTS ====================
  {
    slug: 'mfnl-site',
    name: 'Max Foundation Netherlands Site',
    type: 'CMS Rebuild · International Nonprofit',
    oneLiner:
      'An international charity\'s global WordPress site rebuilt from scratch — every piece of content in English and Dutch, old web addresses that still work, a spam filter that cannot silently bin a real enquiry, and automated checks most charity websites never get.',
    description:
      'Max Foundation Netherlands wanted its global website off WordPress and onto something structured: proper content types instead of a pile of plugins, an admin panel the team can trust, and English and Dutch treated as two versions of every single field rather than an afterthought. The rebuild has fourteen content types, an admin panel covering all of them, and a homepage whose nine sections the content team reorders, switches on, and switches off itself without waiting for a developer.\n\nThe migration is the real engineering. Content came out of a live WordPress site with no editing freeze, using an import safe to run over and over, paired with a separate clean-up pass that strips the formatting residue a WordPress export drags along — 39 news posts, 10 insights, 10 stories, 48 team profiles, 8 programmes, and 109 images and files came across. Years of addresses already indexed by search engines survive the change: the redirect check runs only when nothing else on the site matched the address, so ordinary page loads pay nothing for it, and old addresses are pointed at their new homes.\n\nPublic forms get a two-level spam guard rather than one yes-or-no verdict, because a partner enquiry is exactly the message a charity cannot afford to lose. A field invisible to humans, and therefore filled in only by a bot, is rejected outright and never saved. The weaker signals — a form submitted in under three seconds, or a failed anti-bot check — save the message and flag it, so sorting it out is one click in the admin panel instead of a lost lead. The timing check is stored in a form a bot cannot rewrite, and the anti-bot check lets everyone through when its keys are not set up, so a fresh installation never turns away every real visitor.\n\nNone of it is taken on trust: automated tests assert the page titles and search-engine markup, the site map, the old-address redirects, the submission limits, the spam handling, and the cleaning of pasted formatting. Phase one — the public site plus the admin panel — runs on a demo address only. The organisation\'s own domain still serves the old WordPress site, and no switchover has been agreed or scheduled.',
    tier: 'minor',
    status: 'staging',
    statusNote:
      'Phase one is on a demo address; the organisation\'s own domain still serves the old WordPress site',
    techTags: ['Laravel 12', 'Filament 4', 'Pest 4', 'MySQL', 'Blade', 'Translatable'],
    techStack: {
      languages: ['PHP 8.2+', 'Blade', 'JavaScript'],
      frameworks: ['Laravel 12', 'Filament 4', 'Pest 4'],
      data: ['MySQL', 'spatie/laravel-translatable JSON columns'],
      tools: [
        'Filament media-library + settings plugins',
        'mews/purifier',
        'Cloudflare Turnstile (env-gated)',
        'Vite',
        'bash deploy script to the demo host',
      ],
    },
    highlights: [
      'Brought over from WordPress: 39 news posts, 10 insights, 10 stories, 48 team profiles, 8 programmes, and 109 images and files',
      'Automated checks cover page titles, search-engine markup, the site map, old-address redirects, submission limits, spam handling, and pasted-formatting cleanup',
      'Fourteen content types in English and Dutch, and a homepage the content team reorders itself without a developer',
      'Two-level spam guard: near-certain bots rejected outright, borderline messages saved and flagged rather than thrown away',
      'The site\'s entire icon set arrives as one image, so pages fetch it once instead of nineteen times',
    ],
    hardProblems: [
      {
        challenge: 'Newsletter and partner-enquiry forms on a charity site are bot targets — but a partner enquiry is the one message you cannot afford to drop, and every cheap anti-spam trick has a way of catching real people: a browser autofilling a form trips the timing check, and an anti-bot service with no keys set up rejects everybody.',
        solution: 'One guard that sorts the signals by how certain they are and treats them differently. A field invisible to humans, filled in only by a bot, is rejected outright and never saved. A too-fast submission or a failed anti-bot check saves the message and flags it, so sorting it out is one click in the admin panel. The timing check is stored in a form a bot cannot rewrite, and the anti-bot check passes everyone when it is not configured, so an installation without keys lets people through rather than turning them all away.',
      },
      {
        challenge: 'Move a live charity\'s content out of WordPress — articles, team, programmes, images — without freezing editing and without betting everything on a script that runs once, when the exported HTML carries residue that would pollute the new content.',
        solution: 'An import safe to run over and over, paired with a separate pass that cleans and tidies the imported text, both covered by their own tests — so the import could be re-run throughout the build while WordPress stayed live. The same pattern was reused twice more, for partner logos and for the client\'s own tagging scheme.',
      },
      {
        challenge: 'Years of WordPress addresses indexed by search engines must not go dead when the site is rebuilt — but checking a redirect list on every single page load is wasted work.',
        solution: 'The redirect check is attached only to the last resort: it runs solely when nothing else on the site matched the address, looks the address up in a simple list, and sends the visitor on permanently. The reasoning is written into the code, seven renamed sections are handled by hand, and a test locks the behaviour in.',
      },
      {
        challenge: 'Partner logos came out as solid black circles and team photos gained black edges — caused not by this site but by the image library it uses, which forces every resized copy into a format that has no transparency. There is no single fix, because the two kinds of image want opposite things.',
        solution: 'A per-collection rule layered on top of the shared resizing rather than a fork of it: team photos get a deliberate cream background, while logos keep their original format so transparency survives, because they sit on many different page backgrounds. A dedicated test locks it in.',
      },
    ],
    keyDecisions: [
      {
        decision: 'How spam is handled',
        chose: 'Reject only the near-certain bot; flag everything else for a human',
        over: 'Rejecting on any suspicious signal',
        because: 'Timing checks and anti-bot services genuinely catch real people — and a dropped partner enquiry costs more than a flagged message an administrator dismisses.',
      },
      {
        decision: 'How the homepage is built',
        chose: 'Sections stored as data, each with an on/off switch',
        over: 'Sections written into the page\'s code',
        because: 'The homepage is the organisation\'s most-edited page — the content team reorders and hides sections from the admin panel without a developer.',
      },
      {
        decision: 'How launch quality is protected',
        chose: 'Automated tests for search-engine markup, redirects, pasted-content cleaning, and spam',
        over: 'A manual checklist before launch',
        because: 'Page titles, markup, the site map, redirects, submission limits, and spam flagging stay correct on every future change, instead of being verified once on launch day.',
      },
    ],
    images: {
      thumbnail: '/projects/mfnl-site/thumbnail.png',
      screens: [
        {
          src: '/projects/mfnl-site/screens/home.png',
          width: 956,
          height: 576,
          title: 'A fundraising site that leads with the child',
          caption: 'The rebuild puts the promise and the two things a visitor can actually do — partner, or donate — ahead of everything else, on a page that loads fast enough to keep them there.',
          alt: 'A nonprofit homepage with a full-width photograph of a child being lifted up, a headline about a healthy start, and partner and donate buttons.',
        },
        {
          src: '/projects/mfnl-site/screens/impact.png',
          width: 956,
          height: 576,
          title: 'Proof, before the ask',
          caption: 'The impact page opens with independent validation and the number of measurements behind it, because the audience is institutional funders who will check.',
          alt: 'An impact page headed proof it works, with a strip naming the validating institute, the journal that published the findings and the measurement count.',
        },
      ],
    },
  },
  {
    slug: 'bmsf',
    name: 'BMSF Human Rights Site',
    type: 'Static Site · Human Rights Nonprofit',
    oneLiner:
      'A Bengali-language website for a human-rights journalism charity, rebuilt so there is nothing left to maintain. The site is deliberately small — the real work was moving it safely and getting it back online when the old host cut it off.',
    description:
      'The organisation reports on human rights in Bangladesh and has nobody on staff to look after a website, so the rebuild removed the part that needs looking after. The old site ran on WordPress, with a database, a login screen and a plugin list that had already gone stale; the new one is a set of plain files assembled once and then left alone — no database, no admin panel, nothing to keep patched. Twelve Bengali news articles were carried across from the old site, each one required to record the address it used to live at so nothing loses its trail. The facts about the organisation itself — history, aims, regional structure, finances — were transcribed once from the client\'s own profile document into a single file that four different pages read from, so the next revision is one edit rather than a hunt.\n\nThe hard part was invisible. Bengali file names carried over from the old site were stored in a different underlying form from the one the new site produces — identical on screen, different to the computer — and the web server compares web addresses character by character without reconciling the two. Links that worked perfectly on my machine, and passed ordinary link checkers because those quietly reconcile the two forms, would have shown real visitors a "page not found". The fix settles every address into one form before a link is written, keeps the old addresses working as redirects in both spellings, and adds a checker that runs before every upload and treats "this link only works if you tidy the spelling first" as a failure in its own right. Publishing had its own constraint: the host allows only old-fashioned file transfer, no remote login and no automation, so the deploy is a small program that mirrors the site up carefully — skipping files that have not changed, retrying failed uploads, deleting remote files only when asked, and refusing to touch the host\'s own system folders.\n\nThe most instructive incident had no fault in the site at all. Every page started returning an error, and two things pointed the wrong way: the error looked like a crash on the server, and the development machine\'s stale address cache meant local checks bypassed the content network and reached the abandoned old server directly. Asking public and authoritative name servers instead of trusting the local one separated the real failure from the artefact — the client\'s shared hosting account had gone over its monthly traffic allowance, 12.25 GB used against 11.79 GB allowed, and was refusing every request regardless of what the page contained. The answer was a move, not a code change: on 10 August 2026 the site went onto a new host with its own isolated upload account, the publishing setup was repointed, and the domain was put behind a content network with its own certificate — verified loading correctly end to end.',
    tier: 'minor',
    status: 'live',
    techTags: ['Astro 5', 'TypeScript', 'zod', 'YAML', 'Python 3', 'Cloudflare'],
    techStack: {
      languages: ['TypeScript', 'Python 3', 'YAML'],
      frameworks: ['Astro 5 (content collections, zod schemas)', 'js-yaml'],
      data: ['Flat-file content collections + YAML data — no database by design'],
      tools: [
        'LiteSpeed/cPanel shared hosting',
        'Cloudflare (proxied DNS + origin certificate)',
        'FTP via Python ftplib',
        'Node build scripts',
        'PHP contact-form mailer',
        '301 redirect generation',
      ],
    },
    highlights: [
      'Twelve Bengali news articles carried across from the old site, each one required to record the address it came from',
      'A pre-publish checker that models how the server really compares Bengali web addresses, so a link that only works after tidying counts as broken',
      'A small publishing tool that mirrors the site over plain file transfer — skips unchanged files, retries, and never touches the host\'s system folders',
      'Brought a dead site back by proving the fault was the hosting, not the site — the account was over its monthly traffic allowance',
      'Nothing runs on the server but the finished pages themselves, plus one small script behind the contact form',
    ],
    hardProblems: [
      {
        challenge: 'Bengali file names carried over from the old site were stored in a different underlying form from the one the new site produces — identical on screen, different to the computer — and the web server compares web addresses character by character without reconciling the two. Links looked fine locally and passed ordinary link checkers, which quietly reconcile the two forms, but would have shown visitors a "page not found".',
        solution: 'Every address is settled into one form before a link is written, and the old site\'s addresses keep working as redirects in both spellings. A purpose-built checker runs before every upload and treats "this link only resolves once the spelling is tidied" as its own kind of failure, so the problem cannot quietly return.',
      },
      {
        challenge: 'The site was returning an error for every visitor, and the obvious reading — a bad publish or a bug in the site — was wrong. Two things actively misled: the error looked like a crash on the server, and the development machine\'s stale address cache meant local checks skipped the content network and reached the abandoned old server.',
        solution: 'Asking public and authoritative name servers rather than trusting the local one showed the "server crash" reading was an artefact and exposed the real cause: the client\'s shared hosting account was over its monthly traffic allowance and was refusing every request whatever the page contained. The fix was a move — a new host with its own isolated upload account, the publishing setup repointed, and the domain put behind a content network with its own certificate, verified loading correctly end to end.',
      },
      {
        challenge: 'The host offers only old-fashioned file transfer — no remote login, no automation — and a careless upload or delete could wipe out the files that keep the site\'s security certificate renewing, or the host\'s own system folder.',
        solution: 'A small publishing program mirrors the site up: it skips files that have not changed, retries a failed upload three times, deletes remote files only when explicitly told to, and treats the certificate and system folders as untouchable. It rebuilds the site and runs the link check before a single byte goes up, then afterwards checks a real content page rather than the home page — the home page can look fine via a redirect while every other page is broken.',
      },
    ],
    keyDecisions: [
      {
        decision: 'Platform',
        chose: 'A site made of plain files',
        over: 'Rebuilding on WordPress',
        because: 'Nobody at the organisation can look after a content system — plain files remove the parts that need patching, which is exactly what had already degraded the old site.',
      },
      {
        decision: 'Link checking',
        chose: 'A checker that models how the server really compares addresses',
        over: 'An off-the-shelf link checker',
        because: 'Standard tools quietly tidy Bengali spellings and pass links that a visitor would find broken.',
      },
      {
        decision: 'Bringing the dead site back',
        chose: 'Moving the site to a clean host',
        over: 'Waiting out or upgrading the client\'s over-limit account',
        because: 'The account had run out of traffic allowance and the old WordPress on it had been compromised — moving restored service the same day and left a clean starting point.',
      },
    ],
    links: {
      live: 'https://bmsf-bd.com',
    },
    images: {
      thumbnail: '/projects/bmsf/thumbnail.png',
      screens: [
        {
          src: '/projects/bmsf/screens/home.png',
          width: 956,
          height: 576,
          title: 'Three decades of work, said plainly',
          caption: 'A national network of journalists working on human rights and press freedom, with its founding year, reach and training numbers stated up front for the funders and members who come looking for them.',
          alt: 'A nonprofit homepage headed with the organisation\'s full name and purpose, above tiles for founding year, districts covered and journalists trained.',
        },
        {
          src: '/projects/bmsf/screens/programs.png',
          width: 956,
          height: 576,
          title: 'What the organisation actually does',
          caption: 'Programme areas laid out one card each, in both languages, so a visitor finds the work that matters to them without reading through a wall of text first.',
          alt: 'A programmes page with cards for human rights journalism, press freedom monitoring, women\'s and child rights and good governance.',
        },
      ],
    },
  },
  {
    slug: 'mfb-blog',
    name: 'Max Foundation Blog',
    type: 'Corporate Blog',
    oneLiner:
      'The corporate blog of Max Foundation Bangladesh, where a Word document from the editorial team becomes a finished, illustrated article in about five minutes instead of two hours, in any of nine article styles.',
    description:
      'Max Foundation Bangladesh needed a place to publish its own stories, and its editorial team writes in Word. The blog offers nine article styles — plain posts, photo features, impact reports, staff profiles, event recaps, data stories and more — all sharing one underlying structure and one image handler, so every picture path and web address is produced in exactly one place rather than reinvented per template.\n\nThe headline feature is the import. Editorial hands over Word files with inconsistent formatting, no structured labelling, and photographs of 10–25MB each. The import reads the document, has an AI model work out what kind of article it is, proposes the matching style, pulls out and shrinks the images, builds the page, and creates the record. What took over two hours of manual reformatting now takes about five minutes — the client\'s own estimate.\n\nThe less visible half is the operational care. Articles are written on my machine and pushed to the live site, and that push was rewritten against a written rule for who may touch the live database: permission to write is granted for the few seconds it is needed and withdrawn afterwards even when the run fails, reading and backing up run under an account that cannot write at all, a copy of every affected table is taken before anything changes and the run stops if that copy fails, and rows are updated in place rather than wiped and reloaded — so there is never a moment when the live site has no articles. Separately, the pre-launch holding page carried an owner-only launch button, but the first version only hid the button; its web address was unprotected, so anyone who guessed it could open the site to the public. The owner found it, and it is now checked on the server against a list of permitted network addresses — not showing a control is not the same as protecting it.\n\nLetting the editorial team publish for themselves is the current work, and is deliberately not claimed as done: a visual editor with per-article image uploads, a cleaner that strips anything not on an approved list the moment an editor saves, and permission rules that refuse by default are built and tested locally, on a branch that has not been merged or deployed. The live site still runs the earlier code, where publishing goes through me and the import pipeline, behind a holding page only recognised network addresses can see past.',
    tier: 'minor',
    status: 'live',
    statusNote:
      'Live at blog-bd.maxfoundation.org since Aug 2026, still behind a pre-launch holding page; the tools that would let the editorial team publish for themselves are built but not yet released',
    techTags: ['Laravel 11', 'Tailwind', 'Alpine.js', 'TipTap'],
    techStack: {
      languages: ['PHP 8.2', 'JavaScript'],
      frameworks: ['Laravel 11 (Policies, Observers, Form Requests)', 'Blade', 'TailwindCSS', 'Alpine.js'],
      data: ['MySQL (raw-SQL managed schema)'],
      tools: [
        'TipTap WYSIWYG',
        'mews/purifier',
        'intervention/image',
        'Vite',
        'Bash deploy + governed DB sync',
        'rsync over SSH to cPanel',
      ],
    },
    highlights: [
      'Word document in, finished article out: the import reads it, works out the article type, picks a matching style, shrinks the photos, and creates the post',
      'Article preparation cut from over two hours to about five minutes (the client\'s own estimate)',
      'Nine article styles from one shared structure — five an editor can edit visually, four hand-built',
      'The push to the live site grants write permission only for the seconds it is used, takes a backup first, and updates rows instead of wiping and reloading',
      'The self-service publishing tools are built and tested, but not merged and not deployed',
    ],
    hardProblems: [
      {
        challenge: 'Editorial submits articles as Word files with inconsistent formatting, photographs of 10–25MB each, and no structured labelling — reformatting one by hand took over two hours and regularly went wrong, with broken formatting and missing images.',
        solution: 'An automated import reads the Word file, has an AI model classify the article, matches it to one of the nine styles, extracts and compresses the images, builds the page, creates the record, and files the original documents under the article\'s own number — about five minutes per article.',
      },
      {
        challenge: 'Letting non-developers write article bodies means the site publishes text it did not author, and that text is rendered as formatted layout rather than plain characters — the classic route for slipping malicious code onto a page. But four of the nine styles carry hand-built markup that any sensible safety filter would strip out and no visual editor would survive.',
        solution: 'Split the two apart. Bodies for the four hand-built styles are excluded from the editing form altogether, so the form physically cannot overwrite or mangle developer markup. Every other style\'s body passes through a strict approved-tags-only cleaner at the moment it is saved rather than each time it is shown — so what is stored is already safe and every page that reads it is safe by default. One place in the code does this, and the list of styles is checked when the form is submitted.',
      },
      {
        challenge: 'The pre-launch holding page carried an owner-only launch button, but the first version only decided whether the button appeared on screen. The web address behind it was unprotected, so anyone who guessed it could take the whole site public.',
        solution: 'The check moved to the server: the request\'s network address is matched against a list of permitted ones and refused otherwise, standing aside when no list is configured so local development still works. Found and closed by the owner — the general rule being that not showing a control is not the same as protecting it.',
      },
      {
        challenge: 'Articles are written locally and pushed to the live site, but the old push used a database account that could write at any time and worked by emptying the tables and refilling them — a permanent key, plus a window in which the live site has no articles and anything created on the live site is gone for good.',
        solution: 'The push now asks for write permission only when it is about to write and hands it back the moment it finishes, even on failure; reading and backing up run under an account that cannot write; a copy of every affected table is taken on the server before anything changes and the run aborts if that copy fails; and rows are updated in place, so nothing is deleted and the site is never empty. Pushing content is kept deliberately separate from deploying code.',
      },
    ],
    keyDecisions: [
      {
        decision: 'Keeping published text safe',
        chose: 'Clean it once, when it is saved',
        over: 'Cleaning it every time the page is shown, or stripping all formatting',
        because: 'Article bodies are shown as formatted layout for rich design — cleaning at the point of writing means what is stored is already trusted, and every page that reads it is safe without anyone having to remember.',
      },
      {
        decision: 'The hand-built article styles',
        chose: 'Keeping them out of the editing form entirely',
        over: 'One safety filter loose enough to allow both',
        because: 'A filter wide enough to let hand-built markup through would be wide enough to let an attack through; removing the field is a guarantee, not a setting to tune.',
      },
      {
        decision: 'Pushing content to the live site',
        chose: 'Temporary write permission, a backup first, and updates in place',
        over: 'A permanent write account and wipe-then-reload',
        because: 'The write key exists only for the seconds it is used, and there is never a moment when the live site has no articles.',
      },
      {
        decision: 'Cleaning up an article\'s files',
        chose: 'Letting the system do it automatically whenever an article is deleted',
        over: 'Remembering to delete the files everywhere an article can be deleted',
        because: 'It cannot be forgotten, and it works the same whatever style the article used.',
      },
    ],
    links: {
      live: 'https://blog-bd.maxfoundation.org',
    },
    images: {
      thumbnail: '/projects/mfb-blog/thumbnail.png',
      screens: [
        {
          src: '/projects/mfb-blog/screens/home.png',
          width: 956,
          height: 576,
          title: 'A publication, not a news page',
          caption: 'Stories are grouped by theme and carry an author and a reading time, so the site reads as something worth subscribing to rather than a list of announcements.',
          alt: 'A blog homepage headed latest stories, with theme filter chips above a three-column grid of article cards carrying photographs and author bylines.',
        },
      ],
      objectPosition: 'top',
    },
  },
  {
    slug: 'portfolio-app',
    name: 'This Portfolio Site',
    type: 'Personal Site · Next.js',
    oneLiner:
      'The site you are reading — designed and built from scratch, with one rule enforced in code rather than by good intentions: a project can only claim to be live if it actually is.',
    description:
      'A personal portfolio, designed and built end to end. The colours, spacing and typefaces are defined once in a single place, so the warm light look and the dark look are the same site with one set of values swapped — a page is written once and comes out right in both. There are five accent colours, two of them reserved for showing a project\'s state so a colour never means two things at once, and a reference page that shows every building block on its own.\n\nThe more interesting decision is what the code refuses to let me do. A portfolio\'s easiest lie is calling everything "live": a half-finished app, a venture that closed, something built but never launched and a site that has gone dark all want the same green badge, and working the state out from whether a link exists spread that judgement across every page. State is now something each project has to say outright — one of seven values — with a short note beside it for the nuance a single word cannot carry. That is why some entries here read staging, unlaunched or archived instead of green. The diagram on the ecosystem page follows the same rule: it draws a "replaced by" arrow only where a rebuilt system actually names the older one it retired, because drawing one from every old app to every new one would have been a lie.\n\nThe site also lost a layer. It used to publish two versions of the same career from one codebase — a general site and a parallel AI-focused one — which meant two sets of claims to keep true. That second version was deleted outright, with no leftover stand-ins; continuity lives entirely at the front door, as permanent redirects declared in one configuration file that also cover two projects since renamed. Hosting moved from shared hosting to a single packaged image on a small server behind a content network — memory-capped, health-checked, built on my own machine and shipped as one artefact.',
    tier: 'minor',
    status: 'live',
    techTags: ['Next.js 16', 'React 19', 'Tailwind 4', 'TypeScript', 'Docker'],
    techStack: {
      languages: ['TypeScript', 'CSS'],
      frameworks: ['Next.js 16 (App Router)', 'React 19', 'Tailwind CSS 4', 'framer-motion 12'],
      data: ['Typed TypeScript data files (no CMS)'],
      tools: [
        'Self-authored token system (2 themes, 5 semantic accents)',
        'Vitest + Playwright',
        'Docker (multi-stage Node 22 Alpine) + Compose',
        'Nginx + Cloudflare',
        'OpenAI SDK (streaming, currently kill-switched)',
      ],
    },
    highlights: [
      'A design system built from scratch: one place defining both themes, a set of reusable building blocks, and a reference page showing every one of them',
      'Honesty enforced in code — seven possible project states plus a note field, so not every project gets a green badge',
      'Retired the parallel AI-focused version of the site outright, with no leftover stand-ins — old links kept alive by redirects declared in one configuration file',
      'An interactive diagram of one client\'s two eras of systems, where every "replaced by" arrow comes from the data rather than being drawn for effect',
      'Automated tests covering both themes, the reduced-motion setting, and the diagram',
    ],
    hardProblems: [
      {
        challenge: 'A portfolio\'s easiest lie is calling everything "live". A half-finished app, a venture that closed, something built but never launched and a site that has gone dark all want the same green badge, and working the state out from whether a link exists scattered that judgement across every page, where nothing could enforce it.',
        solution: 'A project\'s state became something it has to declare outright — one of seven values, grouped into three tones that drive a simple legend, plus an optional note for the nuance one word cannot carry. The rule now lives in one place instead of in every page, and recent edits to this data walk claims back rather than up.',
      },
      {
        challenge: 'The site published two versions of the same career from one codebase. Collapsing to one meant deleting a live, publicly linked part of the site — and every stand-in page left behind would have been a second version to keep honest forever.',
        solution: 'The whole second version was deleted, along with the pieces left with nothing to do once it went, and continuity was handled at the front door instead: permanent redirects declared in one configuration file, which also cover two projects since renamed, so old inbound links still land somewhere real without a stub page.',
      },
      {
        challenge: 'A hand-built palette has to hold up in light and dark without patching individual pages — and this machine reports that its owner prefers reduced motion, so every animation was frozen locally while automated browsers, which ignore that setting, showed full motion. Building motion you cannot see is building blind.',
        solution: 'All the colour lives in one block of values, and the dark theme redefines the same names rather than piling extra rules on top. The animation code respects a visitor\'s reduced-motion preference by default but accepts a switch in the web address that forces motion back on, so the author can review his own animations — read in a way that keeps the first render stable, with a test covering both.',
      },
      {
        challenge: 'The chat assistant passes questions to a paid service from a public page with no login — an unprotected endpoint invites both runaway bills and people probing it for mischief.',
        solution: 'Four checks run before a single word comes back: a per-visitor limit on how often it can be asked (ten a minute, fifty an hour, two hundred a day, with a note of when to try again), a guard against malformed requests, a check that the message is the shape it claims to be, and monitoring for suspicious input — all behind a switch that currently has the widget turned off in production.',
      },
    ],
    keyDecisions: [
      {
        decision: 'How a project\'s state is recorded',
        chose: 'Each project states it outright, plus a note',
        over: 'Assuming "live" whenever a link to the site exists',
        because: 'Assuming it scattered the rule across pages and made overclaiming the default rather than the exception.',
      },
      {
        decision: 'Retiring the second version of the site',
        chose: 'Deleting it and redirecting at the front door',
        over: 'Leaving stand-in pages behind',
        because: 'Old and renamed addresses still work, with no second version left to keep honest.',
      },
      {
        decision: 'Theming',
        chose: 'One shared set of colour values',
        over: 'Adding dark-mode styling page by page',
        because: 'One block of values flips the whole site, and each page is written once.',
      },
      {
        decision: 'Hosting',
        chose: 'One packaged image shipped to a small server',
        over: 'Publishing plain files plus a separate process per version of the site',
        because: 'One artefact, one thing running, one way to roll back — the old two-target scripts had three ways to fall out of date.',
      },
    ],
    links: {
      live: 'https://rafirasa.com',
    },
    images: {
      thumbnail: '/projects/portfolio-app/thumbnail.png',
      screens: [
        {
          src: '/projects/portfolio-app/screens/home.png',
          width: 956,
          height: 576,
          title: 'The site you are reading now',
          caption: 'Built to answer one question quickly: what has this engineer actually shipped, and is it still running? Every claim at the top is checkable against a case study further down.',
          alt: 'A portfolio homepage with a headline about engineering production systems and directing the AI that builds them, above a summary panel.',
        },
        {
          src: '/projects/portfolio-app/screens/gallery.png',
          width: 956,
          height: 576,
          title: 'Every project, filterable by what built it',
          caption: 'Work across Android, desktop and web, each carrying its real status, so a visitor can tell at a glance what is running in production from what has been retired.',
          alt: 'A project gallery page with a large featured card showing a project\'s statistics tiles, above the filterable list of the rest.',
        },
      ],
    },
  },
  {
    slug: 'bd-muscle',
    name: 'BD Muscle & Fitness',
    type: 'E-commerce · Unlaunched',
    oneLiner:
      'An online shop for fitness supplements aimed at Bangladeshi customers — cash on delivery, two delivery zones, separate sign-ins for shoppers and staff. It reached a working test build and was then shelved.',
    description:
      'A complete online shop for fitness supplements, built for the Bangladeshi market. It never launched: the work reached a test deployment and has sat unfinished since February 2026 — no public release, no real customers, no live shop.\n\nWhat exists is the ordering core. Customers pay cash on delivery, with the delivery charge set by where they are — ৳60 inside Dhaka, ৳120 outside it. Every order is given its own reference number automatically, and someone who buys without creating an account can still follow the order by phone number as it moves from pending through to delivered. Shoppers and staff sign in through separate systems, and every request the shop\'s back end accepts is checked against a defined shape before anything acts on it.',
    tier: 'minor',
    status: 'unlaunched',
    statusNote:
      'Built as far as a working test deployment; never launched',
    techTags: ['Next.js 14', 'Prisma', 'PostgreSQL'],
    techStack: {
      languages: ['TypeScript', 'SQL'],
      frameworks: ['Next.js 14', 'React 18', 'Tailwind CSS', 'shadcn/ui'],
      data: ['PostgreSQL', 'Prisma'],
      tools: ['NextAuth.js', 'Zod', 'PM2', 'Nginx'],
    },
    highlights: [
      'Status: unfinished draft — a test deployment only, never released to customers',
      'Cash-on-delivery checkout with two delivery zones (৳60 inside Dhaka, ৳120 outside)',
      'Separate sign-in systems for shoppers and for staff',
      'Every request the back end accepts is checked against a defined shape before anything acts on it',
    ],
    hardProblems: [
      {
        challenge: 'Designing a checkout for a market where card payments are rare, so there is no payment provider to lean on — the order itself has to be solid before any money changes hands.',
        solution: 'Custom order handling: the delivery zone is worked out from the address, each order gets its own reference number automatically, and guests who buy without an account are tracked by phone number through the stages from pending to delivered.',
      },
      {
        challenge: 'Two kinds of user with different needs — shoppers who want accounts, saved addresses and order history, and staff who need administrative access — without either one weakening the other.',
        solution: 'Two separate sign-in systems with separate sessions: a standard, well-tested one for staff, and a custom one with properly hashed passwords for customer accounts.',
      },
    ],
    keyDecisions: [
      {
        decision: 'Architecture',
        chose: 'One codebase for the shop and its back end',
        over: 'A separate back end behind a separate front end',
        because: 'One project to build, deploy and keep consistent, and pages arrive ready-rendered so the shop stays quick on modest phones.',
      },
    ],
    images: {
      thumbnail: '/projects/bd-muscle/thumbnail.png',
      screens: [
        {
          src: '/projects/bd-muscle/screens/shop.png',
          width: 956,
          height: 576,
          title: 'A shop front built for supplements',
          caption: 'Products are filtered by category and by brand from a side panel, with the discount and the featured flag shown on the picture itself, so a shopper scanning on a phone sees the deal before the name.',
          alt: 'An all-products page for a supplement shop with category and brand filters on the left and two large product cards showing prices in taka.',
        },
        {
          src: '/projects/bd-muscle/screens/cart.png',
          width: 956,
          height: 576,
          title: 'Cash on delivery, priced by where you live',
          caption: 'The cart states the delivery charge for inside and outside Dhaka before the shopper goes to checkout, because the shop takes cash on delivery and the order has to be right before any money changes hands.',
          alt: 'A shopping cart with two supplement items and an order summary card showing the subtotal, shipping calculated at checkout and a checkout button.',
        },
      ],
      objectPosition: 'center',
    },
  },

  // ==================== HIDDEN — ECOSYSTEM SUB-APPS ====================
  {
    slug: 'field-data-collection-app',
    name: 'Field Data Collection App',
    type: 'Enterprise Android',
    oneLiner:
      'The Android app field workers use to collect household health data with no internet — survey questions come from a database, not from the app. Over a million records collected, across 183 releases.',
    description:
      'The collection layer of Max Foundation\'s monitoring systems. Field workers in rural Bangladesh and Nepal record household, child and sanitation data on Android phones with no connection required, syncing when they are back in range. The questions, the checks that validate them and the logic that shows or hides them are stored in a database rather than written into the app, so a new survey instrument goes out without anyone rebuilding or reinstalling anything. One installable app serves four programmes — three in Bangladesh and one in Nepal — each with its own database, chosen when the worker signs in.',
    tier: 'standard',
    status: 'live',
    hidden: true,
    parentSlug: 'mfb-mis-ecosystem',
    techTags: ['Java', 'Android SDK', 'Firebase'],
    techStack: {
      languages: ['Java', 'Kotlin', 'SQL'],
      frameworks: ['Android SDK', 'Retrofit 2.9', 'OkHttp 4.10'],
      data: ['SQLite', 'MySQL'],
      tools: ['Firebase Analytics/Crashlytics', 'MPAndroidChart', 'Zip4j'],
    },
    highlights: [
      'New survey questions deploy from the database — no rebuild, no reinstall',
      'One app serves four programmes — three in Bangladesh and one in Nepal — instead of four separate codebases',
      'More than a million field records collected across four health and sanitation programmes',
    ],
    hardProblems: [
      {
        challenge: 'Survey questions changed often, but before this system every change meant rebuilding and redistributing the app — roughly a two-week round trip (owner-attested).',
        solution: 'Answers are stored in generic, reusable database columns, with a mapping layer deciding which question uses which column. Forms are assembled on the phone from the database configuration each time it runs, so a new question is a database change rather than a release.',
      },
      {
        challenge: 'Three near-identical apps were being maintained separately, and the differences between them kept growing.',
        solution: 'One app that switches to a different programme database when the worker chooses their programme at sign-in — every form, field and rule comes from that database, so there is only ever one codebase.',
      },
    ],
    keyDecisions: [
      {
        decision: 'How survey answers are stored',
        chose: 'Generic reusable columns with a name-to-column mapping',
        over: 'A dedicated table per form',
        because: 'New questions can be added from the database alone — no change to the database structure, and no app release.',
      },
    ],
    images: {
      thumbnail: '/projects/field-data-collection-app/thumbnail.png',
      screens: [
        {
          src: '/projects/field-data-collection-app/screens/chooser.png',
          width: 956,
          height: 576,
          title: 'One app, every programme',
          caption: 'After signing in, the worker picks a form family for the programme they are on. The same installed app serves four programmes in Bangladesh and Nepal, each with its own questions, because the survey lives in the database rather than in the app.',
          alt: 'A phone screen headed Form Chooser with the Max Foundation logo and five buttons: household, GMP, PGM, entrepreneurship and surveys.',
        },
        {
          src: '/projects/field-data-collection-app/screens/household.png',
          width: 956,
          height: 576,
          title: 'Built for days without signal',
          caption: 'A household registration starts from four actions: enter new data, open what was saved offline, and revisit records the supervisor or the head office sent back. Nothing here needs a connection until the worker chooses to upload.',
          alt: 'A phone screen titled Household Registration with buttons to input new data, view saved offline data, view rejected data and view data rejected by the office.',
        },
        {
          src: '/projects/field-data-collection-app/screens/location.png',
          width: 956,
          height: 576,
          title: 'Bilingual, down to the village',
          caption: 'Every form opens on a location page that walks from district to union, ward and community group before the first question, and the whole form switches between English and Bangla with one toggle in the header.',
          alt: 'A phone screen showing a household registration form in Bangla with district, upazila and union already chosen and select buttons for ward and community group.',
        },
        {
          src: '/projects/field-data-collection-app/screens/drawer.png',
          width: 956,
          height: 576,
          title: 'The worker always knows where each record stands',
          caption: 'The side drawer counts records at every stage: still offline, submitted, re-submitted, approved by the supervisor, verified by the head office, or rejected at either step. The account shown is a seeded test user.',
          alt: 'A phone side drawer listing counts for offline, submitted, re-submitted, approved, verified and rejected records, with a log out link at the bottom.',
        },
      ],
      objectPosition: 'center',
    },
  },
  {
    slug: 'digital-evidence-centre',
    name: 'Desktop Evidence Centre',
    type: 'Desktop MIS',
    oneLiner:
      'The Windows desktop tool programme administrators use on a national child nutrition survey — pulls field data down from the phones, builds reports across a dozen kinds of dataset, and classifies child growth against WHO standards.',
    description:
      'The desktop system programme administrators use to manage data from a national child nutrition surveillance programme. It pulls field-collected records down from the mobile devices into a database held on the administrator\'s own machine, so the work carries on when the office connection does not, then builds reports and Excel or CSV exports from it.\n\nEvery kind of dataset — child registration, child progress, household, entrepreneur, programme monitoring and more — sits at a different depth in an eight-level geography running from district down to the individual child. Rather than hardcoding a report for each one, the tool reads the shape of each dataset from the server\'s own configuration and assembles the query it needs at the moment it runs, so a new dataset takes no new code.\n\nExports work the same way: the columns are described on the server, and any one of them may be a plain value, a date stored as a number, a coded list, a calculated figure such as an age, or a picture. Each is resolved into something a person can read — filling blanks, computing values, expanding codes into words, formatting dates and renaming headings — before the file is written. Child growth status is worked out locally against the WHO reference tables.',
    tier: 'standard',
    status: 'live',
    hidden: true,
    parentSlug: 'mfb-mis-ecosystem',
    techTags: ['C#', 'WinForms', '.NET 4.8'],
    techStack: {
      languages: ['C#'],
      frameworks: ['.NET Framework 4.8', 'WinForms', 'Entity Framework 6', 'ADO.NET'],
      data: ['SQLite', 'PHP/MySQL (remote)'],
      tools: ['OpenXML SDK', 'Newtonsoft.Json', 'DotNetZip', 'ClickOnce'],
    },
    highlights: [
      'Builds its reports at run time from the server\'s own configuration, instead of one hardcoded query per dataset',
      'Classifies child growth — stunting, underweight and wasting — against WHO reference tables',
      'Exports turn coded values, stored dates and calculated fields into something a reader can understand',
    ],
    hardProblems: [
      {
        challenge: 'Every kind of dataset sits at a different depth in the geography, from district down to an individual child, so a report has to combine a different set of tables each time — and which tables those are is described on the server, not fixed in the code.',
        solution: 'The tool reads each dataset\'s description as it runs and assembles the query from it, including a readable location ID built from every level of the hierarchy. Datasets that stand in for a location level are resolved on the fly, so adding a dataset needs no new code.',
      },
      {
        challenge: 'The columns in an export are chosen on the server, and any one of them may be a plain value, a date, a coded list, a calculated figure or a picture.',
        solution: 'The export builds a temporary working table and applies each transformation in turn — filling blanks, computing values such as age from a date of birth, converting types, expanding codes into words, formatting dates and finally renaming the headings — so what reaches the file is already readable.',
      },
    ],
    keyDecisions: [
      {
        decision: 'Building the reports',
        chose: 'Assembling each query as it runs',
        over: 'A toolkit that maps fixed tables to code',
        because: 'The shape of each dataset is defined on the server and can change — the reports have to follow whatever configuration they find.',
      },
      {
        decision: 'Where the data lives',
        chose: 'A local copy on the administrator\'s machine, topped up from the server',
        over: 'A live connection to the central database',
        because: 'Offices and field teams in rural Bangladesh have intermittent connectivity — the work has to continue when the connection does not.',
      },
    ],
    images: {
      thumbnail: '',
      screens: [],
      objectPosition: 'center',
    },
  },
  {
    slug: 'healthy-village-tracker',
    name: 'Healthy Village Tracker',
    type: 'Desktop MIS',
    oneLiner:
      'A Windows desktop tool that let a health charity\'s field offices track village health indicators and see them rolled up all the way to the national picture — working even where there was no internet.',
    description:
      'A desktop system used by a health charity\'s programme staff to follow around fifty health indicators — water and sanitation, nutrition, and reproductive health — collected in villages and rolled up through six levels of geography, from the village group to the national picture. Field offices often had little or no connectivity, so the application kept its own copy of the data and asked the central server only for what had changed since it last checked. Staff could filter by year, quarter, area and organisation and watch the charts redraw without the program locking up. It has since been retired, replaced by Digital Evidence Centre, the web rebuild I built to take over the charity\'s analytics and monitoring.',
    tier: 'standard',
    status: 'archived',
    statusNote:
      'Retired in 2026, replaced by my web rebuild',
    hidden: true,
    parentSlug: 'mfb-mis-ecosystem',
    techTags: ['C#', 'WinForms', 'EF6'],
    techStack: {
      languages: ['C#', 'SQL'],
      frameworks: ['.NET Framework 4.8', 'WinForms', 'Entity Framework 6'],
      data: ['SQLite', 'MySQL (via PHP backend)'],
      tools: ['Newtonsoft.Json', 'NReco.Csv', 'Ionic.Zip', 'iText7'],
    },
    highlights: [
      'Worked offline: each office kept its own copy of the data and pulled only what had changed since last time',
      'Rolled village-level data up through six levels of geography, to district and national summaries',
      'Dashboards that stayed responsive while redrawing a page of charts on low-specification office machines',
    ],
    hardProblems: [
      {
        challenge: 'Keeping field offices up to date over slow, unreliable connections, where sending the whole dataset every time was not realistic.',
        solution: 'The office application tells the server when it last synced, and the server sends back only the records that have changed since, compressed for the journey. Large downloads arrive in parts and resume where they left off.',
      },
      {
        challenge: 'Summing village data up through six levels of geography while the definition of those summaries kept changing as the programme evolved.',
        solution: 'The summaries are generated from the current rules each time rather than fixed into the database, checked against the official list of locations, and incomplete areas are left out so a half-reported village group cannot distort a district total.',
      },
    ],
    keyDecisions: [
      {
        decision: 'How offices get their data',
        chose: 'Sending only what has changed since last time',
        over: 'Sending the whole dataset every sync',
        because: 'Field offices worked on slow or intermittent connections — moving only the changes was the difference between a sync that finished and one that did not.',
      },
    ],
    images: {
      thumbnail: '/projects/healthy-village-tracker/thumbnail.png',
      screens: [
        {
          src: '/projects/healthy-village-tracker/screens/status.png',
          width: 956,
          height: 576,
          title: 'Every village ranked against the healthy-village bar',
          caption: 'For one union and one quarter, the tracker shows how many villages met the 90 percent healthy-village standard, how many are close, and how each ward is doing, so a programme officer sees where to go next without opening a spreadsheet.',
          alt: 'A desktop window with a bar chart of target, healthy, graduate and non-graduate villages and two ward-by-ward stacked bar charts, with district, upazila and union pickers on the left.',
        },
        {
          src: '/projects/healthy-village-tracker/screens/bangla.png',
          width: 956,
          height: 576,
          title: 'The same dashboard in Bangla',
          caption: 'A radio button in the corner switches the whole interface, charts and legends included, so district staff could work in the language they read fastest.',
          alt: 'The same village status dashboard rendered in Bangla, with a quarter picker dropdown open at the top right.',
        },
        {
          src: '/projects/healthy-village-tracker/screens/coverage.png',
          width: 956,
          height: 576,
          title: 'Fifty indicators, one page',
          caption: 'Coverage of water, sanitation, nutrition and maternal-health indicators, each with its current rate and a quarter-by-quarter trend beside it. Hovering a point gives the exact figure. This was the page that had to stay responsive on old office machines.',
          alt: 'A desktop window with three rows of paired charts: horizontal bars of indicator coverage rates on the left and quarterly trend lines on the right, with a tooltip open on one line.',
        },
      ],
      objectPosition: 'center',
    },
  },
  {
    slug: 'child-growth-dashboard',
    name: 'Child Growth Dashboard',
    type: 'Desktop & Web Analytics',
    oneLiner:
      'Desktop and web tools that turned children\'s height and weight measurements into malnutrition figures programme managers could act on — covering more than 10,000 children.',
    description:
      'Two tools doing one job: a Windows application for analysts and a web dashboard for programme managers, both classifying child malnutrition using the World Health Organization\'s growth standards — comparing a child\'s height and weight against the international reference for their age and sex to flag stunting, wasting and underweight.\n\nThe desktop application did the heavy analysis. It scored each child against the right reference curve, kept those results ready so filtering across district, sub-district, union and ward stayed instant, and produced ward-by-ward reports as PDF and Excel files with the charts embedded.\n\nThe web dashboard gave managers the same picture in a browser for more than 10,000 children — limited to whichever part of the organisation they belong to, with three years of monthly trends behind it. Both have since been retired, replaced by Digital Evidence Centre, the web rebuild I built to take over the charity\'s analytics and monitoring.',
    tier: 'standard',
    status: 'archived',
    statusNote:
      'Retired in 2026, replaced by my web rebuild',
    hidden: true,
    parentSlug: 'mfb-mis-ecosystem',
    techTags: ['C#', 'WinForms', 'PHP', 'Chart.js', 'MySQL'],
    techStack: {
      languages: ['C#', 'PHP 7+', 'JavaScript', 'SQL'],
      frameworks: ['.NET Framework 4.8', 'WinForms', 'Bootstrap 3'],
      data: ['SQLite', 'MySQL', 'Entity Framework 6'],
      tools: ['iText7', 'ClosedXML', 'Chart.js', 'Newtonsoft.Json', 'NReco.Csv'],
    },
    highlights: [
      'Classified stunting, wasting and underweight against the WHO growth standards, by age and sex',
      'A page of charts that stayed responsive on low-specification office machines',
      'Ward-by-ward reports exported as PDF and Excel with the charts included',
      'Three years of monthly trends for more than 10,000 children, read straight off each record rather than searched for',
      'Cross-checked all three malnutrition measures against each other across more than 10,000 children',
    ],
    hardProblems: [
      {
        challenge: 'Turning raw height, weight and date of birth into malnutrition classifications for more than a hundred thousand measurements, against reference curves that differ by age and by sex.',
        solution: 'The WHO reference tables were kept locally and indexed so a child\'s age in months could be matched to the right curve instantly, with the results stored for reuse rather than recalculated every time a screen was opened.',
      },
      {
        challenge: 'Showing ten or more charts on a single screen without the program freezing on the low-specification office computers it had to run on.',
        solution: 'The totals behind each chart were worked out in advance and stored, and the charts shared one common piece of drawing code instead of each carrying its own.',
      },
      {
        challenge: 'Showing three years of monthly trends meant asking questions that would otherwise sweep through millions of rows every time a chart redrew.',
        solution: 'Which months a child has data for is stored as one compact number per year, a digit per month, so the answer is read straight off the record instead of being searched for.',
      },
      {
        challenge: 'Each manager should see their own part of the organisation and everything beneath it, but the database in use could not walk a tree of parent and child organisations.',
        solution: 'The organisation tree is worked out once when a manager signs in and turned into a plain list of the areas they are allowed to see, which every later query is filtered against.',
      },
    ],
    keyDecisions: [
      {
        decision: 'How the desktop tool reads its data',
        chose: 'Hand-written queries',
        over: 'A layer that writes the queries for you',
        because: 'The analysis queries needed exact control over which indexes were used; the convenience layer cost speed on precisely the biggest ones.',
      },
      {
        decision: 'How monthly history is stored (web)',
        chose: 'One compact number per year, a digit per month',
        over: 'Searching date ranges for every chart',
        because: 'A chart covering three years reads one value per record instead of scanning the full history — the difference between an instant dashboard and a slow one.',
      },
    ],
    images: {
      thumbnail: '/projects/child-growth-dashboard/thumbnail.png',
      screens: [
        {
          src: '/projects/child-growth-dashboard/screens/summary.png',
          width: 956,
          height: 576,
          title: 'Twenty thousand children, summarised',
          caption: 'The opening page counts registered households and children, splits them by age band and household economic status, and plots how many records arrived each month, filterable down to a single community group.',
          alt: 'A desktop dashboard with counters for households and children registered, two pie charts, a bar chart of household economic status and a line chart of monthly submissions.',
        },
        {
          src: '/projects/child-growth-dashboard/screens/growth.png',
          width: 956,
          height: 576,
          title: 'Stunting, underweight and wasting, ward by ward',
          caption: 'Each child\'s measurements are classified against the WHO growth standards for their age and sex, then shown as severe, moderate or normal for every ward, with a monthly trend underneath so a programme can see whether its work is moving the line.',
          alt: 'A desktop dashboard with three stacked bar charts of stunting, underweight and wasting status by ward and three trend line charts below them, with a legend for severe, moderate and normal.',
        },
      ],
      objectPosition: 'center',
    },
  },
];

export const visibleProjects = projects.filter((p) => !p.hidden);
export const ecosystemProject = projects.find((p) => p.tier === 'ecosystem')!;

/**
 * Display order for the flagship band: production AI work, then visual client
 * proof, then the engine behind the method. (2026-10-29: the Digital Evidence
 * Centre — governed AI layer in production — replaced Funded Academy, which
 * closed in Sep 2026.)
 *
 * It lives here so the home showcase and the gallery agree — they used to read
 * in data-file order, which put a screenshot-less card in the lead slot of the
 * gallery while the home page opened with a different system entirely. A
 * flagship missing from this list still renders, at the end.
 */
export const flagshipOrder = ['mis-dash-web', 'titan-platform', 'jarvis'];

export function flagshipRank(slug: string): number {
  const i = flagshipOrder.indexOf(slug);
  return i === -1 ? flagshipOrder.length : i;
}

export const flagshipProjects = projects
  .filter((p) => p.tier === 'flagship')
  .sort((a, b) => flagshipRank(a.slug) - flagshipRank(b.slug));
export const standardProjects = projects.filter(
  (p) => p.tier === 'standard' && !p.hidden
);
export const minorProjects = projects.filter((p) => p.tier === 'minor');
