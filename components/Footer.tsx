import Link from "next/link";
import { profile } from "@/lib/content";

export function Footer() {
  return (
    <footer id="contact" className="border-t border-line/10 bg-bg/60">
      <div className="container-x py-14">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="kicker mb-3">Get in touch</p>
            <h2 className="font-display text-2xl font-bold text-fg md:text-3xl">
              Let&apos;s build something intelligent.
            </h2>
            <p className="mt-2 max-w-md text-sm text-muted">
              Open to AI Solutions Lead / AI Architect roles and collaboration.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={`mailto:${profile.email}`} className="pill hover:border-mint">
              {profile.email}
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="pill hover:border-mint">
              GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="pill hover:border-mint">
              LinkedIn
            </a>
            <a href={profile.cv} className="pill hover:border-mint">
              Download CV
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-line/10 pt-6 text-xs text-muted md:flex-row md:items-center">
          <p>
            © {new Date().getFullYear()} {profile.name} · {profile.location}
          </p>
          <div className="flex gap-5">
            <Link href="/learn" className="hover:text-fg">
              Learn
            </Link>
            <Link href="/resume" className="hover:text-fg">
              Résumé
            </Link>
            <span className="font-mono text-muted/60">Built with Next.js · Vercel</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
