"use client";

import Link from "next/link";
import { useState } from "react";
import { profile } from "@/lib/content";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#expertise", label: "Expertise" },
  { href: "/learn", label: "Learn" },
  { href: "/about", label: "About" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink-900/70 backdrop-blur-md">
      <nav className="container-x flex h-16 items-center justify-between">
        <Link href="/" className="group flex items-center gap-2 font-display text-lg font-bold text-white">
          <span className="text-mint">{"</"}</span>
          Junaid&nbsp;Shaik
          <span className="text-mint">{">"}</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-muted transition hover:text-white">
              {l.label}
            </Link>
          ))}
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-muted transition hover:text-white"
          >
            <LinkedInIcon />
          </a>
          <Link
            href="/#contact"
            className="rounded-full border border-teal-400/40 bg-teal-400/10 px-4 py-1.5 text-sm font-medium text-teal-200 transition hover:bg-teal-400/20"
          >
            Contact
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="text-muted md:hidden"
          aria-label="Toggle menu"
        >
          <div className="space-y-1.5">
            <span className="block h-0.5 w-6 bg-current" />
            <span className="block h-0.5 w-6 bg-current" />
            <span className="block h-0.5 w-6 bg-current" />
          </div>
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/10 md:hidden">
          <div className="container-x flex flex-col gap-1 py-3">
            {[...links, { href: profile.linkedin, label: "LinkedIn" }, { href: "/#contact", label: "Contact" }].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-2 text-sm text-muted transition hover:bg-white/5 hover:text-white"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.25 8h4.5V23h-4.5V8zM8 8h4.31v2.05h.06c.6-1.14 2.07-2.34 4.26-2.34 4.56 0 5.4 3 5.4 6.9V23h-4.5v-6.5c0-1.55-.03-3.55-2.16-3.55-2.16 0-2.49 1.69-2.49 3.44V23H8V8z" />
    </svg>
  );
}
