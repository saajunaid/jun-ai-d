"use client";
import { useEffect, useRef } from "react";

const srand = (seed: number) => {
  const s = Math.sin(seed * 9301.0 + 49297.0) * 233280.0;
  return s - Math.floor(s);
};

const NUM = 145;

interface Dot {
  bx: number; by: number; // base position
  x: number; y: number;   // current position (displaced by mouse)
  r: number;
  baseAlpha: number;
  phase: number;
  speed: number;
  distRatio: number;
}

interface Spark {
  angle: number;
  dist: number;
  speed: number;
  maxDist: number;
  r: number;
}

function buildDots(size: number): Dot[] {
  const cx = size / 2, cy = size / 2;
  const sigma = size * 0.175;
  const minR = size * 0.065;
  const maxR = size * 0.46;

  return Array.from({ length: NUM }, (_, i) => {
    const angle = srand(i * 7) * Math.PI * 2;
    const u1 = Math.max(0.001, srand(i * 13 + 1));
    const u2 = srand(i * 13 + 2);
    const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    const dist = Math.min(maxR, Math.max(minR, Math.abs(z) * sigma));
    const dr = dist / maxR;
    const bx = cx + Math.cos(angle) * dist;
    const by = cy + Math.sin(angle) * dist;
    return {
      bx, by, x: bx, y: by,
      r: (1 - dr) * 2.0 + srand(i * 23) * 0.9 + 0.5,
      baseAlpha: (1 - dr) * 0.74 + srand(i * 41) * 0.14 + 0.07,
      phase: srand(i * 31) * Math.PI * 2,
      speed: srand(i * 37) * 0.008 + 0.003,
      distRatio: dr,
    };
  });
}

function themeRgb(v: string): [number, number, number] {
  const ch = getComputedStyle(document.documentElement)
    .getPropertyValue(v).trim().split(/\s+/).map(Number);
  return [ch[0], ch[1], ch[2]];
}

export function DotField({ size = 300 }: { size?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = el.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;
    el.width = size * dpr;
    el.height = size * dpr;
    ctx.scale(dpr, dpr);

    const dots = buildDots(size);
    const sparks: Spark[] = [];
    const cx = size / 2, cy = size / 2;
    const REPEL = size * 0.2;
    let frame = 0;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onLeave = () => { mouse.current = { x: -9999, y: -9999 }; };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    const tick = () => {
      ctx.clearRect(0, 0, size, size);
      const [sr, sg, sb] = themeRgb("--accent-soft");
      const [nr, ng, nb] = themeRgb("--accent-strong");
      const { x: mx, y: my } = mouse.current;

      // Spawn a spark occasionally
      if (Math.random() < 0.008 && sparks.length < 8) {
        sparks.push({
          angle: Math.random() * Math.PI * 2,
          dist: size * 0.075,
          speed: size * (0.007 + Math.random() * 0.005),
          maxDist: size * (0.26 + Math.random() * 0.16),
          r: 1.0 + Math.random() * 1.3,
        });
      }

      // Draw & update sparks (below the main dots so they feel like background bursts)
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.dist += s.speed;
        const life = 1 - s.dist / s.maxDist;
        if (life <= 0) { sparks.splice(i, 1); continue; }
        ctx.beginPath();
        ctx.arc(
          cx + Math.cos(s.angle) * s.dist,
          cy + Math.sin(s.angle) * s.dist,
          s.r, 0, Math.PI * 2
        );
        ctx.fillStyle = `rgba(${nr},${ng},${nb},${(life * 0.88).toFixed(3)})`;
        ctx.fill();
      }

      // Draw main dot cloud
      dots.forEach(d => {
        // Mouse repulsion — dots flee from cursor, spring back
        const mdx = d.x - mx, mdy = d.y - my;
        const md = Math.sqrt(mdx * mdx + mdy * mdy);
        if (md < REPEL && md > 0) {
          const f = ((REPEL - md) / REPEL) * 1.3;
          d.x += (mdx / md) * f;
          d.y += (mdy / md) * f;
        }
        d.x += (d.bx - d.x) * 0.08;
        d.y += (d.by - d.y) * 0.08;

        const pulse = Math.sin(frame * d.speed + d.phase) * 0.08;
        const a = Math.min(0.95, Math.max(0.03, d.baseAlpha + pulse));

        // Blend accent-strong (inner) → accent-soft (outer)
        const t = Math.min(1, d.distRatio * 1.6);
        const rr = nr + (sr - nr) * t;
        const gg = ng + (sg - ng) * t;
        const bb = nb + (sb - nb) * t;

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${Math.round(rr)},${Math.round(gg)},${Math.round(bb)},${a.toFixed(3)})`;
        ctx.fill();
      });

      frame++;
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [size]);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <canvas
        ref={ref}
        style={{ width: size, height: size, cursor: "crosshair" }}
        aria-hidden="true"
      />
      <span
        className="absolute inset-0 flex items-center justify-center text-mint pointer-events-none select-none"
        style={{ fontSize: Math.round(size * 0.085), lineHeight: 1, marginTop: -size * 0.02 }}
        aria-hidden="true"
      >
        ✦
      </span>
    </div>
  );
}
