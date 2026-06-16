import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { HamsterLogo } from "@/components/claudster/HamsterLogo";
import { ReferenceTabs } from "@/components/claudster/ReferenceTabs";

export const metadata: Metadata = {
  title: "Claudster — a Claude Code plugin",
  description:
    "Claudster amplifies Claude Code with a TDD pipeline, 12 specialist agents, 136 skills, automatic hooks and relay.md session continuity — subscription-friendly and local-LLM ready.",
  robots: "noindex",
};

const STATS = [
  { value: "8", label: "commands" },
  { value: "12", label: "agents" },
  { value: "39", label: "core skills" },
  { value: "97", label: "extra skills" },
  { value: "4", label: "hooks" },
];

const PIPELINE = [
  { cmd: "/prd", desc: "Capture requirements through a structured discovery dialogue.", out: "PRD document" },
  { cmd: "/feature-plan", desc: "A phased, TDD-structured plan — the durable spine for multi-session work.", out: ".claudster/plans/" },
  { cmd: "/tdd ↺", desc: "Red → Green → Refactor per unit of behaviour. Agents auto-spawn here.", out: "repeat per phase" },
  { cmd: "/ship", desc: "Commit, push and monitor the deploy. Detects Gitea, GitHub Actions, local.", out: "code deployed" },
  { cmd: "/handoff", desc: "Capture exact state so the next session resumes with zero re-discovery.", out: "relay.md updated" },
];

const HOOKS = [
  { name: "SessionStart", script: "inject_relay.py", does: "Reads relay.md and injects full context into every new session." },
  { name: "PreCompact", script: "inject_relay.py", does: "Re-reads relay.md so context survives compression." },
  { name: "PostToolUse", script: "auto_lint.py", does: "Lints silently after edits — ruff for .py, eslint for .ts/.tsx/.js." },
  { name: "Stop", script: "session_end.py", does: "relay.md nudge + token-usage digest when a turn finishes." },
];

const AGENTS = [
  { name: "anchor", desc: "Verify hotfix / migration safety before applying." },
  { name: "code-reviewer", desc: "Review a diff for bugs, security, conventions." },
  { name: "debug", desc: "Diagnose a bug's root cause, return a fix plan." },
  { name: "codebase-audit", desc: "Deep audit before new architecture or a feature." },
  { name: "preflight", desc: "Validate a plan against the codebase before coding." },
  { name: "security-analyst", desc: "OWASP findings, severity-ranked." },
  { name: "tester", desc: "Write + run tests, return a pass/fail report." },
  { name: "sql-expert", desc: "Review and optimise SQL and schema." },
  { name: "data-engineer", desc: "ETL / pipeline / data-contract design." },
  { name: "ui-design-reviewer", desc: "Screenshot + critique a running UI." },
  { name: "knowledge-transfer", desc: "Capture session learnings into the docs." },
  { name: "claude-md-curator", desc: "Prune and consolidate bloated CLAUDE.md files." },
];

const CATS = [
  { name: "frontend", n: 30 },
  { name: "workflow", n: 23 },
  { name: "coding", n: 21 },
  { name: "docs", n: 13 },
  { name: "media", n: 12 },
  { name: "productivity", n: 12 },
  { name: "devops", n: 10 },
  { name: "testing", n: 7 },
  { name: "cloud", n: 6 },
  { name: "data", n: 6 },
];

const MODELS = [
  { local: "qwen2.5-vl-32b", maps: "opus" },
  { local: "qwen2.5-coder-14b", maps: "sonnet" },
  { local: "mistral-7b", maps: "haiku" },
];

export default function ClaudsterPage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="container-x relative py-20 md:py-28">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:gap-12">
          <HamsterLogo className="shrink-0" />
          <div>
            <p className="kicker mb-2">Claude Code plugin</p>
            <h1 className="font-display text-5xl font-bold lowercase tracking-tight text-fg md:text-7xl">
              claud<span className="text-mint">ster</span>
            </h1>
          </div>
        </div>

        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-body">
          A plugin that amplifies Claude Code into a disciplined delivery system — a
          TDD pipeline, specialist sub-agents, a tiered skill library, automatic hooks,
          and <span className="text-mint">relay.md</span> session continuity that
          survives context compaction.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <span className="pill">claude code · amplified</span>
          <span className="pill">subscription-friendly · local-LLM ready</span>
        </div>

        <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line/10 bg-surface/5 sm:grid-cols-5">
          {STATS.map((s) => (
            <div key={s.label} className="bg-bg/60 px-5 py-5 text-center">
              <dt className="font-display text-3xl font-bold text-mint">{s.value}</dt>
              <dd className="mt-1 text-xs text-muted">{s.label}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-8 inline-flex max-w-full items-center gap-3 overflow-x-auto rounded-xl border border-line/10 bg-[var(--code-bg)] px-5 py-3 font-mono text-sm text-teal-200">
          <span className="text-mint">$</span>
          <span className="whitespace-nowrap">claude plugin install claudster@claudster</span>
        </div>
      </section>

      {/* ===== PIPELINE ===== */}
      <section className="container-x py-16">
        <SectionHead
          kicker="The pipeline"
          title="One disciplined path from idea to ship"
          sub="Each command produces a durable artefact the next one builds on. /ui-brief slots in before any UI phase."
        />
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
          {PIPELINE.map((p, i) => (
            <Reveal key={p.cmd} delay={i * 60} className="h-full">
              <div className="card flex h-full flex-col p-5">
                <p className="font-mono text-base font-bold text-mint">{p.cmd}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{p.desc}</p>
                <p className="mt-4 font-mono text-[11px] text-teal-300">→ {p.out}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== MEMORY ===== */}
      <section className="container-x py-16">
        <SectionHead
          kicker="Memory & continuity"
          title="Context that survives the session"
          sub="Files-first memory, not a black box — everything lives in the repo where you can read it."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              h: "relay.md",
              b: "A continuity file at the repo root. /handoff writes it; the SessionStart hook reads it back. The next session resumes with zero cold-start.",
            },
            {
              h: "Files-first memory",
              b: "State is plain markdown in the repo — diffable, reviewable, and portable across tools. No hidden vector store you can't inspect.",
            },
            {
              h: "CLAUDE.md hierarchy",
              b: "Project, package and folder-level CLAUDE.md files route the right context to the right work. The curator agent keeps them lean.",
            },
          ].map((c, i) => (
            <Reveal key={c.h} delay={i * 70} className="h-full">
              <div className="card h-full p-6">
                <h3 className="font-mono text-lg font-semibold text-mint">{c.h}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{c.b}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== HOOKS ===== */}
      <section className="container-x py-16">
        <SectionHead
          kicker="Automatic hooks"
          title="Cross-platform Python, wired once"
          sub="Run /setup-project-ai once to wire four hooks plus a git pre-push gate that blocks a red push."
        />
        <div className="overflow-hidden rounded-2xl border border-line/10">
          {HOOKS.map((h, i) => (
            <div
              key={h.name}
              className={`grid grid-cols-1 gap-1 px-6 py-4 sm:grid-cols-[180px_1fr] sm:gap-6 ${
                i % 2 ? "bg-surface/[0.02]" : "bg-surface/[0.05]"
              }`}
            >
              <div>
                <p className="font-mono text-sm font-bold text-mint">{h.name}</p>
                <p className="font-mono text-[11px] text-muted">{h.script}</p>
              </div>
              <p className="text-sm leading-relaxed text-body">{h.does}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== AGENTS ===== */}
      <section className="container-x py-16">
        <SectionHead
          kicker="Specialist agents"
          title="12 read-only advisors"
          sub="Each spawns in an isolated context and returns structured findings — they never edit code. The main thread applies their output."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {AGENTS.map((a, i) => (
            <Reveal key={a.name} delay={(i % 3) * 60} className="h-full">
              <div className="card h-full p-5">
                <p className="font-mono text-sm font-bold text-teal-200">{a.name}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{a.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== SKILLS ===== */}
      <section className="container-x py-16">
        <SectionHead
          kicker="Skill library"
          title="39 core, 97 extras — toggle on demand"
          sub="Core skills are always on. Extras stay disabled by default to keep the context footprint lean; enable them per session when you need the long tail."
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {CATS.map((c, i) => (
            <Reveal key={c.name} delay={i * 40} className="h-full">
              <div className="card flex h-full items-center justify-between p-4">
                <span className="font-mono text-sm text-teal-200">{c.name}</span>
                <span className="font-display text-2xl font-bold text-mint">{c.n}</span>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-3 font-mono text-xs text-muted">
          <code className="rounded bg-teal-400/10 px-2 py-1 text-teal-200">claude plugin enable claudster-extras</code>
          <code className="rounded bg-teal-400/10 px-2 py-1 text-teal-200">claude plugin disable claudster-extras</code>
        </div>
      </section>

      {/* ===== LOCAL LLM ===== */}
      <section className="container-x py-16">
        <SectionHead
          kicker="Local LLM & GPU"
          title="A provider seam, not a lock-in"
          sub="A LiteLLM seam lets local models stand in for the cloud tiers — run hybrid (cloud + local) or fully local profiles on your own GPU."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {MODELS.map((m, i) => (
            <Reveal key={m.local} delay={i * 70} className="h-full">
              <div className="card flex h-full items-center justify-between p-6">
                <span className="font-mono text-sm text-teal-200">{m.local}</span>
                <span className="font-mono text-xs text-muted">
                  ≈ <span className="text-mint">{m.maps}</span>
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== REFERENCE POSTERS ===== */}
      <section className="container-x py-16">
        <SectionHead
          kicker="Reference"
          title="The whole system on two posters"
          sub="Re-themed to match this site. Switch tabs to flip between the workflow lifecycle and the full command/agent/skill reference."
        />
        <ReferenceTabs />
      </section>

      {/* ===== RESOURCES ===== */}
      <section className="container-x py-16">
        <div className="card p-8 md:p-10">
          <p className="kicker mb-3">Resources</p>
          <h2 className="font-display text-2xl font-bold text-fg">Dig deeper</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              { label: "Marketplace — saajunaid/junai", href: "https://github.com/saajunaid/junai" },
              { label: "Workflow lifecycle poster", href: "/claudster-flow.svg" },
              { label: "Commands · agents · skills poster", href: "/claudster-reference.svg" },
              { label: "Install — claude plugin install claudster@claudster", href: "https://github.com/saajunaid/junai" },
            ].map((r) => (
              <li key={r.label}>
                <a
                  href={r.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-xl border border-line/10 bg-surface/[0.02] px-4 py-3 text-sm text-body transition hover:border-teal-400/40 hover:text-fg"
                >
                  {r.label}
                  <span className="text-mint">→</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

function SectionHead({ kicker, title, sub }: { kicker: string; title: string; sub?: string }) {
  return (
    <div className="mb-8">
      <p className="kicker mb-3">{kicker}</p>
      <h2 className="font-display text-3xl font-bold text-fg md:text-4xl">{title}</h2>
      {sub && <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{sub}</p>}
    </div>
  );
}
