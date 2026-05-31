# Naveen Singh — Portfolio & Tech Blog

Next.js 16 site with a portfolio home page and a markdown-driven tech blog.

## Stack

- Next.js 16 (App Router), React 19, Tailwind CSS 4
- File-based blog in `/content` (no database)
- Fuse.js client search, Shiki syntax highlighting, RSS at `/rss.xml`

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Blog: [http://localhost:3000/blog](http://localhost:3000/blog).

## Environment

Copy `.env.example` to `.env.local`:

- `SITE_URL` — canonical URL for RSS links
- `NEXT_PUBLIC_EMAILJS_*` — contact form (optional)

## Adding articles

Add a `.md` file under `content/` with YAML frontmatter, then rebuild. See existing articles for the required fields.

## Deploy (Vercel)

1. Import the repo in Vercel (framework: Next.js).
2. Set environment variables from `.env.example`.
3. Deploy — `npm run build` runs automatically.

The legacy Azure Static Web Apps workflow is disabled; this project targets Vercel.

## Scripts

| Command        | Description              |
|----------------|--------------------------|
| `npm run dev`  | Start dev server         |
| `npm run build`| Production build         |
| `npm run start`| Run production server    |
