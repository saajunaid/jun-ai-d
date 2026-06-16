"use client";
import { useEffect, useRef } from "react";

const COLS = 24;
const ROWS = 18;
const SCAN_PERIOD = 480;
const MORPH_SPEED = 0.045;

function srand(x: number, y: number): number {
  return (Math.abs(Math.sin(x * 127.1 + y * 311.7) * 43758.5453)) % 1;
}

function charFor(v: number): string {
  if (v > 0.68) return "●";
  if (v > 0.35) return "•";
  return "·";
}

// Grid A: Gaussian cloud — computed once at module level (SSR-safe)
const GRID_A: number[][] = Array.from({ length: ROWS }, (_, yi) =>
  Array.from({ length: COLS }, (_, xi) => {
    const nx = (xi / (COLS - 1)) * 2 - 1;
    const ny = (yi / (ROWS - 1)) * 2 - 1;
    const dist = Math.sqrt(nx * nx + ny * ny);
    const base = Math.exp(-(dist * dist) / (2 * 0.28 * 0.28));
    return Math.max(0, Math.min(1, base + srand(xi * 53, yi * 97) * 0.12 - 0.06));
  })
);

// Per-cell breathing params (stable)
const B_PHASE = Array.from({ length: ROWS }, (_, yi) =>
  Array.from({ length: COLS }, (_, xi) => srand(xi * 71, yi * 113) * Math.PI * 2)
);
const B_SPEED = Array.from({ length: ROWS }, (_, yi) =>
  Array.from({ length: COLS }, (_, xi) => 0.008 + srand(xi, yi) * 0.006)
);
const B_AMP = Array.from({ length: ROWS }, (_, yi) =>
  Array.from({ length: COLS }, (_, xi) => 0.04 + srand(xi + 50, yi) * 0.10)
);

// Grid B: sample canvas text at COLS×ROWS resolution — called inside useEffect (browser only)
function buildLetterGrid(text: string): number[][] {
  const S = 8; // oversample factor
  const oc = document.createElement("canvas");
  oc.width = COLS * S;
  oc.height = ROWS * S;
  const ctx = oc.getContext("2d")!;
  const fontSize = Math.floor(Math.min(ROWS * S * 0.88, COLS * S * 0.55));
  ctx.fillStyle = "#fff";
  ctx.font = `bold ${fontSize}px sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, (COLS * S) / 2, (ROWS * S) / 2);
  const { data } = ctx.getImageData(0, 0, COLS * S, ROWS * S);
  return Array.from({ length: ROWS }, (_, yi) =>
    Array.from({ length: COLS }, (_, xi) => {
      let sum = 0;
      for (let dy = 0; dy < S; dy++)
        for (let dx = 0; dx < S; dx++)
          sum += data[((yi * S + dy) * COLS * S + (xi * S + dx)) * 4] / 255;
      return Math.min(1, (sum / (S * S)) * 2.2); // boost contrast
    })
  );
}

export function StippleMorph({ text = "j", className = "" }: { text?: string; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const active = useRef(false);
  const morphRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const GRID_B = buildLetterGrid(text);
    const spans = Array.from(container.querySelectorAll<HTMLElement>("span[data-xi]"));

    let raf: number;
    let frame = 0;

    const tick = () => {
      const m = morphRef.current + ((active.current ? 1 : 0) - morphRef.current) * MORPH_SPEED;
      morphRef.current = m;

      const cx = COLS / 2, cy = ROWS / 2;
      const maxR = Math.sqrt(cx * cx + cy * cy);
      const waveR = ((frame % SCAN_PERIOD) / SCAN_PERIOD) * (maxR + 1);

      spans.forEach(el => {
        const xi = +el.dataset.xi!;
        const yi = +el.dataset.yi!;
        const vA = GRID_A[yi][xi];
        const vB = GRID_B[yi][xi];

        // Breathing fades as letter solidifies
        const breathe = Math.sin(frame * B_SPEED[yi][xi] + B_PHASE[yi][xi]) * B_AMP[yi][xi] * (1 - m * 0.85);

        // Scan wave only in idle / transition
        const dist = Math.sqrt((xi - cx) ** 2 + (yi - cy) ** 2);
        const diff = dist - waveR;
        const wave = (Math.abs(diff) < 1.6 ? 0.38 : diff < 0 && diff > -3.5 ? 0.11 : 0) * (1 - m);

        const v = Math.max(0, Math.min(1, vA * (1 - m) + vB * m + breathe + wave));
        el.style.opacity = v.toFixed(3);

        // Character updates as density shifts
        const c = charFor(v);
        if (el.textContent !== c) el.textContent = c;
      });

      frame++;
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, [text]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ userSelect: "none", lineHeight: 1.15, cursor: "crosshair" }}
      onMouseMove={() => { active.current = true; }}
      onMouseLeave={() => { active.current = false; }}
      aria-hidden="true"
    >
      <div style={{ textAlign: "center", fontSize: "1.1rem", marginBottom: "0.3em", color: "rgb(var(--accent-strong))", opacity: 0.82 }}>
        ✦
      </div>
      {Array.from({ length: ROWS }, (_, yi) => (
        <div key={yi} style={{ display: "flex", justifyContent: "center", gap: "0.18em" }}>
          {Array.from({ length: COLS }, (_, xi) => {
            const v = GRID_A[yi][xi];
            return (
              <span
                key={xi}
                data-xi={xi}
                data-yi={yi}
                style={{
                  fontSize: "0.68rem",
                  color: "rgb(var(--accent-strong))",
                  opacity: v,
                  transition: "none",
                }}
              >
                {charFor(v)}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
}
