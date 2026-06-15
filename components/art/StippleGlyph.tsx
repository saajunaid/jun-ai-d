"use client";
import { useEffect, useRef } from "react";

const COLS = 26;
const ROWS = 20;
const CX = (COLS - 1) / 2;
const CY = (ROWS - 1) / 2;

const srand = (x: number, y: number) => {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return s - Math.floor(s);
};

const GRID: number[][] = Array.from({ length: ROWS }, (_, y) =>
  Array.from({ length: COLS }, (_, x) => {
    const r = Math.sqrt((x - CX) ** 2 + (y - CY) ** 2) / 9.5;
    const g = Math.exp(-r * r * 0.85);
    return g > srand(x, y) * 0.70 ? g : 0;
  })
);

const charFor = (v: number) => (v > 0.68 ? "●" : v > 0.38 ? "•" : "·");

const MAX_DOT_R = Math.sqrt(CX ** 2 + CY ** 2); // ~15.8 grid units
const WAVE_PERIOD = 480; // frames (~8s at 60fps)

interface DotAnim {
  el: HTMLSpanElement;
  base: number;
  amp: number;
  phase: number;
  speed: number;
  distFromCenter: number;
}

export function StippleGlyph() {
  const containerRef = useRef<HTMLDivElement>(null);
  const glyphRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const glyphEl = glyphRef.current;
    if (!container || !glyphEl) return;

    const spans = Array.from(
      container.querySelectorAll<HTMLSpanElement>("span[data-v]")
    );

    // Build animation data for visible dots only
    const anims: DotAnim[] = spans
      .filter(el => parseFloat(el.dataset.v!) > 0)
      .map(el => {
        const v = parseFloat(el.dataset.v!);
        const xi = parseInt(el.dataset.x!);
        const yi = parseInt(el.dataset.y!);
        return {
          el,
          distFromCenter: Math.sqrt((xi - CX) ** 2 + (yi - CY) ** 2),
          base: Math.min(1, v * 0.88 + 0.1),
          amp: Math.min(0.18, v * 0.22),
          phase: srand(xi * 53, yi * 97) * Math.PI * 2,
          speed: 0.004 + srand(xi * 71, yi * 113) * 0.010,
        };
      });

    let frame = 0;
    let raf: number;

    const tick = () => {
      // Scan wave: expands from centre every WAVE_PERIOD frames
      const waveR = ((frame % WAVE_PERIOD) / WAVE_PERIOD) * (MAX_DOT_R + 1);

      anims.forEach(a => {
        const diff = a.distFromCenter - waveR;
        // Leading ring
        const ringBoost = Math.abs(diff) < 1.6 ? (1 - Math.abs(diff) / 1.6) * 0.40 : 0;
        // Fading trail just inside the ring
        const trailBoost = diff < 0 && diff > -3.5
          ? (1 - Math.abs(diff) / 3.5) * 0.12
          : 0;
        const breathe = Math.sin(frame * a.speed + a.phase) * a.amp;
        const opacity = Math.min(0.98, Math.max(0.03, a.base + breathe + ringBoost + trailBoost));
        a.el.style.opacity = opacity.toFixed(3);
      });

      // Glyph pulse
      glyphEl.style.opacity = (0.62 + Math.sin(frame * 0.016) * 0.22).toFixed(3);

      frame++;
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="select-none" aria-hidden="true">
      <div className="text-center mb-1" style={{ fontSize: 13 }}>
        <span ref={glyphRef} className="text-mint" style={{ opacity: 0.62 }}>
          ✦
        </span>
      </div>
      <div ref={containerRef} className="font-mono">
        {GRID.map((row, y) => (
          <div key={y} className="flex justify-center" style={{ lineHeight: 1.18 }}>
            {row.map((v, x) => (
              <span
                key={x}
                data-v={v}
                data-x={x}
                data-y={y}
                className="text-mint inline-block text-center"
                style={{
                  fontSize: 10,
                  width: 8,
                  opacity: v > 0 ? Math.min(1, v * 0.88 + 0.1) : 0,
                }}
              >
                {v > 0 ? charFor(v) : " "}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
