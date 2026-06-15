import Link from "next/link";
import {
  profile,
  stats,
  capabilities,
  projects,
  tools,
  concepts,
} from "@/lib/content";
import { Reveal } from "@/components/Reveal";
import { NodeCluster } from "@/components/art/NodeCluster";

export default function Home() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden">
        <div className="container-x relative py-24 md:py-32">
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16">

            {/* Left: text content */}
            <div className="flex-1 min-w-0">
              <div className="mb-8 animate-fade-up">
                <div className="font-display text-4xl font-bold lowercase tracking-tight text-fg md:text-5xl">
                  jun<span className="text-mint">ai</span>d
                </div>
                <p className="kicker mt-2">Junaid Shaik · AI Solutions Lead</p>
              </div>
              <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] text-fg animate-fade-up md:text-6xl">
                Production <span className="text-mint">Generative AI</span>, built on
                enterprise-grade architecture.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-body animate-fade-up">
                {profile.tagline}
              </p>
              <div className="mt-9 flex flex-wrap gap-4 animate-fade-up">
                <Link
                  href="/#work"
                  className="rounded-full bg-mint px-6 py-3 text-sm font-semibold text-onaccent transition hover:brightness-110"
                >
                  See the work
                </Link>
                <Link
                  href="/learn"
                  className="rounded-full border border-teal-400/40 px-6 py-3 text-sm font-semibold text-teal-200 transition hover:bg-teal-400/10"
                >
                  Learn the concepts →
                </Link>
              </div>

              <dl className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line/10 bg-surface/5 md:grid-cols-4">
                {stats.map((s) => (
                  <div key={s.label} className="bg-bg/60 px-6 py-6">
                    <dt className="font-display text-3xl font-bold text-mint">{s.value}</dt>
                    <dd className="mt-1 text-xs text-muted">{s.label}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Right: node cluster — desktop only, fades in after text */}
            <div
              className="hidden lg:flex shrink-0 items-center justify-center animate-fade-up"
              style={{ animationDelay: "0.35s" }}
            >
              <NodeCluster size={360} />
            </div>

          </div>
        </div>
      </section>

      {/* ===== EXPERTISE ===== */}
      <section id="expertise" className="container-x py-20">
        <SectionHead kicker="What I do" title="Expertise" />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c, i) => (
            <Reveal key={c.title} delay={i * 60} className="h-full">
              <div className="card h-full p-6">
                <h3 className="font-display text-lg font-semibold text-fg">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== WORK ===== */}
      <section id="work" className="container-x py-20">
        <SectionHead
          kicker="Selected work"
          title="AI platforms & systems"
          sub="Grounded in real, shipped (and shipping) projects — not slideware."
        />
        <div className="grid gap-5 lg:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.name} delay={(i % 2) * 80} className="h-full">
              <article className="card flex h-full flex-col p-7">
                <div className="mb-3 flex items-center gap-3">
                  <span className="pill">{p.tag}</span>
                  {p.status && (
                    <span className="font-mono text-[11px] uppercase tracking-wider text-mint">
                      ● {p.status}
                    </span>
                  )}
                </div>
                <h3 className="font-display text-xl font-bold text-fg">{p.name}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{p.blurb}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-md border border-line/10 bg-surface/5 px-2 py-1 font-mono text-[11px] text-teal-200"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                {p.href && (
                  <Link
                    href={p.href}
                    className="mt-5 inline-block text-sm font-medium text-mint hover:underline"
                  >
                    Read the case study →
                  </Link>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== PUBLISHED TOOLS ===== */}
      <section className="container-x py-20">
        <SectionHead
          kicker="Built & published"
          title="Agentic developer tools"
          sub="My own AI products — installable from the VS Code & Claude Code marketplaces."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {tools.map((t) => (
            <div key={t.name} className="card p-6">
              <p className="font-mono text-[11px] uppercase tracking-wider text-teal-300">{t.kind}</p>
              <h3 className="mt-1 font-display text-xl font-bold text-fg">{t.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{t.blurb}</p>
              {t.link && (
                <a
                  href={t.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-block text-sm text-mint hover:underline"
                >
                  View listing →
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ===== LEARN TEASER ===== */}
      <section className="container-x py-20">
        <div className="card overflow-hidden p-8 md:p-12">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <p className="kicker mb-3">Learn / Notes</p>
              <h2 className="font-display text-2xl font-bold text-fg md:text-3xl">
                The concepts behind the work — explained simply.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Plain-English walkthroughs of the AI building blocks I use: RAG, FAISS,
                MCP, and how LLMs are served in production. Useful whether you&apos;re an
                engineer, a leader, or just curious.
              </p>
              <Link
                href="/learn"
                className="mt-6 inline-block rounded-full border border-teal-400/40 px-5 py-2.5 text-sm font-semibold text-teal-200 transition hover:bg-teal-400/10"
              >
                Browse all notes →
              </Link>
            </div>
            <ul className="grid w-full max-w-sm gap-2">
              {concepts.slice(0, 4).map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/learn/${c.slug}`}
                    className="flex items-center justify-between rounded-xl border border-line/10 bg-surface/[0.02] px-4 py-3 text-sm text-body transition hover:border-teal-400/40 hover:text-fg"
                  >
                    {c.title}
                    <span className="text-mint">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

function SectionHead({
  kicker,
  title,
  sub,
}: {
  kicker: string;
  title: string;
  sub?: string;
}) {
  return (
    <div className="mb-10">
      <p className="kicker mb-3">{kicker}</p>
      <h2 className="font-display text-3xl font-bold text-fg md:text-4xl">{title}</h2>
      {sub && <p className="mt-3 max-w-2xl text-sm text-muted">{sub}</p>}
    </div>
  );
}
