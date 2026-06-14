# Junaid Shaik — Personal Site

Personal portfolio + AI concept notes. Built with **Next.js 14 (App Router)**, **Tailwind CSS**,
and **MDX** for the `/learn` explainer pages. Deploys free on **Vercel**.

## Structure

```
app/
  page.tsx                 Home (hero, expertise, work, tools, learn teaser)
  about/page.tsx           Bio, experience timeline, certs
  learn/page.tsx           Notes index
  learn/(read)/<slug>/page.mdx   Concept explainers (vibo-rag, faiss, rag, mcp, llm-serving)
components/                Nav, Footer
lib/content.ts            All editable content (projects, tools, capabilities, concepts)
public/                   CV download + static assets
```

To edit text, change `lib/content.ts`. To add a new note, drop a `page.mdx` in
`app/learn/(read)/<slug>/` and add an entry to the `concepts` array in `lib/content.ts`.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Deploy to Vercel

**Option A — Vercel CLI (fastest):**

```bash
npm i -g vercel
cd site
vercel           # follow prompts: log in, accept defaults
vercel --prod    # promote to production → yourname.vercel.app
```

**Option B — GitHub import:**

1. Push this `site/` folder to a GitHub repo.
2. On [vercel.com](https://vercel.com) → *Add New Project* → import the repo.
3. Framework preset: **Next.js** (auto-detected). Click **Deploy**.

A custom domain can be added later under the project's **Domains** settings.
