import Link from "next/link";

export default function WorkReadLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container-x py-16">
      <Link
        href="/#work"
        className="mb-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted transition hover:text-mint"
      >
        ← All work
      </Link>
      <article className="prose-notes mx-auto max-w-3xl">{children}</article>
      <div className="mx-auto mt-16 max-w-3xl border-t border-white/10 pt-8">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 rounded-full border border-teal-400/40 px-5 py-2.5 text-sm font-semibold text-teal-200 transition hover:bg-teal-400/10"
        >
          ← Back to all work
        </Link>
      </div>
    </div>
  );
}
