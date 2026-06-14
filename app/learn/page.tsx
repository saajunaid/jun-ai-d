import Link from "next/link";
import type { Metadata } from "next";
import { concepts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Learn — AI Concepts | Junaid Shaik",
  description:
    "Plain-English explainers of the AI building blocks behind my work: RAG, FAISS, MCP, and LLM serving.",
};

export default function LearnIndex() {
  return (
    <section className="container-x py-20">
      <p className="kicker mb-3">Learn / Notes</p>
      <h1 className="font-display text-4xl font-bold text-white md:text-5xl">
        AI concepts, explained simply.
      </h1>
      <p className="mt-4 max-w-2xl text-[#c4d0d0]">
        The building blocks behind the systems I design — written to be understood by
        engineers and non-engineers alike. Each note is grounded in how it&apos;s actually
        used in production.
      </p>

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {concepts.map((c, i) => (
          <Link key={c.slug} href={`/learn/${c.slug}`} className="card group flex flex-col p-7">
            <div className="mb-3 flex items-center gap-3">
              <span className="font-mono text-xs text-muted/60">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-wrap gap-2">
                {c.tags.map((t) => (
                  <span key={t} className="pill">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <h2 className="font-display text-xl font-bold text-white transition group-hover:text-mint">
              {c.title}
            </h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{c.summary}</p>
            <span className="mt-5 text-sm font-medium text-mint">Read the note →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
