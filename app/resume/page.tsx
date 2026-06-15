import type { Metadata } from "next";
import { profile, experience, certs } from "@/lib/content";

export const metadata: Metadata = {
  title: "Résumé — Junaid Shaik",
  description:
    "Résumé of Junaid Shaik — AI Solutions Lead & Architect. 15+ years across telecom and technology, now focused on enterprise Generative AI. TOGAF-certified, AWS AI Practitioner.",
};

export default function Resume() {
  return (
    <section className="container-x py-20">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="kicker mb-3">Résumé · CV</p>
          <h1 className="max-w-3xl font-display text-4xl font-bold text-fg md:text-5xl">
            Enterprise architect turned AI builder.
          </h1>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href={profile.cv}
            className="inline-flex w-fit items-center gap-2 rounded-full bg-mint px-5 py-2.5 text-sm font-semibold text-onaccent transition hover:brightness-110"
          >
            ↓ Download CV
            <span className="font-mono text-[11px] opacity-70">2-page</span>
          </a>
          <a
            href={profile.cvDetailed}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-teal-400/40 px-5 py-2.5 text-sm font-semibold text-teal-200 transition hover:bg-teal-400/10"
          >
            ↓ Detailed CV
            <span className="font-mono text-[11px] opacity-70">3-page</span>
          </a>
        </div>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-5 text-[15px] leading-7 text-body">
          <p>
            I&apos;m a Solutions &amp; AI Architect with 15+ years across telecom and
            technology. I spent the first half of my career deep in networks, BSS/OSS, and
            large-scale provisioning — including the end-to-end architecture for a €200M
            fibre programme. That backbone is exactly what lets me build AI that works in the
            real world, not just in a notebook.
          </p>
          <p>
            Today I design and ship production Generative AI: LLM integration across cloud and
            on-prem models, retrieval-augmented generation grounded in real customer data, and
            agentic systems built on the Model Context Protocol. I&apos;m a core member of my
            organisation&apos;s AI Centre of Excellence, and I&apos;ve published three agentic
            developer tools to the VS Code and Claude Code marketplaces.
          </p>
          <p>
            I care about systems that are <strong>resilient, grounded, and honest</strong> —
            AI that cites its sources, fails gracefully, and earns trust. The{" "}
            <a className="text-mint hover:underline" href="/learn">
              Learn
            </a>{" "}
            section is where I explain how these pieces actually fit together.
          </p>
        </div>

        <aside className="space-y-8">
          <div className="card p-6">
            <h2 className="kicker mb-4">Certifications</h2>
            <ul className="space-y-2 text-sm text-body">
              {certs.map((c) => (
                <li key={c} className="flex gap-2">
                  <span className="text-mint">▹</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div className="card p-6">
            <h2 className="kicker mb-3">Education</h2>
            <p className="text-sm text-fg">MBA, Business Administration</p>
            <p className="text-xs text-muted">Heriot-Watt University</p>
            <p className="mt-3 text-sm text-fg">B.Tech, Computer Science &amp; IT</p>
            <p className="text-xs text-muted">JNTU</p>
          </div>
        </aside>
      </div>

      {/* Experience timeline */}
      <div className="mt-20">
        <p className="kicker mb-6">Experience</p>
        <ol className="relative border-l border-line/10">
          {experience.map((e) => (
            <li key={e.role + e.period} className="mb-10 ml-6">
              <span className="absolute -left-[7px] mt-1.5 h-3 w-3 rounded-full border-2 border-mint bg-bg" />
              <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                <h3 className="font-display text-lg font-semibold text-fg">{e.role}</h3>
                <span className="font-mono text-xs text-muted">{e.period}</span>
              </div>
              <p className="text-sm font-medium text-teal-200">{e.org}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">{e.note}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
