import type { Metadata } from "next";
import { NodeCluster } from "@/components/art/NodeCluster";
import { NodeJ } from "@/components/art/NodeJ";
import { NodeJMorph } from "@/components/art/NodeJMorph";
import { StippleGlyph } from "@/components/art/StippleGlyph";
import { StippleMorph } from "@/components/art/StippleMorph";
import { TrailGhost } from "@/components/art/TrailGhost";
import { FlowField } from "@/components/art/FlowField";
import { CircuitPulse } from "@/components/art/CircuitPulse";
import { DotField } from "@/components/art/DotField";

export const metadata: Metadata = { robots: "noindex" };

const OPTIONS = [
  {
    id: "01",
    title: 'Node "j" — living letter',
    desc: 'Spring-constrained nodes always hold the "j" shape. Hover to repel nodes away — they spring back. Classic interaction.',
    component: <NodeJ size={280} />,
  },
  {
    id: "01c",
    title: 'Node "j" — morph on hover',
    desc: 'Nodes start as a scattered cloud. Hover the canvas and they coalesce into the "j" shape. Move your cursor away and they drift apart again. The letter only exists when you reach for it.',
    component: <NodeJMorph size={280} />,
  },
  {
    id: "01b",
    title: "Neural Node Network (original)",
    desc: "Fully random floating nodes — no fixed shape. Good if you want pure abstract energy rather than an identifiable mark.",
    component: <NodeCluster size={280} />,
  },
  {
    id: "02",
    title: "Stipple Dot Portrait",
    desc: "Unicode halftone character art. Dense at centre, dispersing at edges with a ✦ above. Scan wave + breathing animation.",
    component: <StippleGlyph />,
  },
  {
    id: "02b",
    title: "Stipple Morph",
    desc: 'Same halftone cloud — but hover the canvas and the dots rearrange density to resolve into a "j". The cloud literally crystallises into the letter character by character.',
    component: <StippleMorph text="j" />,
  },
  {
    id: "05",
    title: "Trail Ghost",
    desc: 'Nodes drift as a glowing cloud leaving phosphorescent trails. Hover to watch them coalesce into the "j", streaking light paths as they travel to their positions.',
    component: <TrailGhost size={280} />,
  },
  {
    id: "06",
    title: "Flow Field",
    desc: 'Particles follow Perlin noise currents — organic, river-like streams. Hover and the currents bend toward the "j", particles orienting and assembling while still flowing.',
    component: <FlowField size={280} />,
  },
  {
    id: "03",
    title: "Circuit Pulse",
    desc: "SVG grid traces with three animated pulses — one orbiting the outer ring, two crossing the centre. Technical infrastructure feel, like a PCB or signal routing diagram.",
    component: <CircuitPulse size={260} />,
  },
  {
    id: "04",
    title: "Dot Field",
    desc: "Canvas dot cloud with a Gaussian density falloff from a central ✦ glyph. Dots breathe subtly. Most like the reference image's dispersing-from-centre energy.",
    component: <DotField size={260} />,
  },
];

export default function ArtPreviewPage() {
  return (
    <div className="container-x py-20">
      <p className="kicker mb-3">Art Preview</p>
      <h1 className="font-display text-3xl font-bold text-fg md:text-4xl">
        Choose a style
      </h1>
      <p className="mt-3 mb-2 max-w-xl text-sm text-muted">
        All adapt to light and dark mode. Options 01c, 02b, 05, 06 are morph-on-hover —
        move your cursor over the canvas. Tell me which one you want on the live site.
      </p>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {OPTIONS.map(({ id, title, desc, component }) => (
          <div
            key={id}
            className="card flex flex-col items-center gap-8 p-8"
          >
            {/* Art */}
            <div className="flex min-h-[270px] items-center justify-center">
              {component}
            </div>

            {/* Label */}
            <div className="w-full border-t border-line/10 pt-6 text-center">
              <p className="kicker mb-1">Option {id}</p>
              <h2 className="font-display text-xl font-semibold text-fg">
                {title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
