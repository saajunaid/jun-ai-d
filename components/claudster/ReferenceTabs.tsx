"use client";

import { useState } from "react";

const TABS = [
  {
    id: "flow",
    label: "Workflow lifecycle",
    sub: "Poster 1 — relay.md, the pipeline, agents & hooks",
    src: "/claudster-flow.svg",
  },
  {
    id: "reference",
    label: "Commands · agents · skills",
    sub: "Poster 2 — full command/agent/skill reference",
    src: "/claudster-reference.svg",
  },
];

export function ReferenceTabs() {
  const [active, setActive] = useState(TABS[0].id);
  const tab = TABS.find((t) => t.id === active)!;

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={`rounded-full px-4 py-2 font-mono text-xs uppercase tracking-wider transition ${
              active === t.id
                ? "bg-mint text-onaccent"
                : "border border-teal-400/30 text-teal-200 hover:bg-teal-400/10"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <p className="mt-4 text-sm text-muted">{tab.sub}</p>

      <div className="card mt-4 overflow-hidden p-2 md:p-3">
        <div className="overflow-x-auto">
          {/* SVGs are 1600px wide; min-width keeps them legible, scroll on mobile */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={tab.src}
            alt={tab.label}
            className="block h-auto w-full min-w-[760px] rounded-lg"
          />
        </div>
      </div>

      <a
        href={tab.src}
        target="_blank"
        rel="noreferrer"
        className="mt-3 inline-block text-sm font-medium text-mint hover:underline"
      >
        Open full-size poster →
      </a>
    </div>
  );
}
