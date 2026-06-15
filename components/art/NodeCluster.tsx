"use client";
import { useEffect, useRef } from "react";

interface Pt { x: number; y: number; vx: number; vy: number; r: number }

const N = 32;
const LINK = 82;
const MAX_SPEED = 1.5;
const FRICTION = 0.984;
const REPEL_R = 90;
const REPEL_F = 0.55;

function themeRgb(v: string): [number, number, number] {
  const ch = getComputedStyle(document.documentElement)
    .getPropertyValue(v).trim().split(/\s+/).map(Number);
  return [ch[0], ch[1], ch[2]];
}

export function NodeCluster({ size = 300 }: { size?: number }) {
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

    const pts: Pt[] = Array.from({ length: N }, () => ({
      x: 14 + Math.random() * (size - 28),
      y: 14 + Math.random() * (size - 28),
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      r: Math.random() * 1.6 + 0.8,
    }));

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onLeave = () => { mouse.current = { x: -9999, y: -9999 }; };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    let raf: number;
    const tick = () => {
      ctx.clearRect(0, 0, size, size);
      const [nr, ng, nb] = themeRgb("--accent-strong");
      const [lr, lg, lb] = themeRgb("--accent-soft");
      const { x: mx, y: my } = mouse.current;

      // Connections
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < LINK) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(${lr},${lg},${lb},${((1 - d / LINK) * 0.32).toFixed(3)})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      // Nodes
      pts.forEach(p => {
        const mdx = p.x - mx, mdy = p.y - my;
        const md = Math.sqrt(mdx * mdx + mdy * mdy);

        // Mouse repulsion
        if (md < REPEL_R && md > 0) {
          const f = ((REPEL_R - md) / REPEL_R) * REPEL_F;
          p.vx += (mdx / md) * f;
          p.vy += (mdy / md) * f;
        }

        // Friction + speed cap
        p.vx *= FRICTION;
        p.vy *= FRICTION;
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (spd > MAX_SPEED) { p.vx *= MAX_SPEED / spd; p.vy *= MAX_SPEED / spd; }

        const near = md < REPEL_R;
        const dotR = near ? p.r * 1.35 : p.r;
        const alpha = near ? 1 : 0.88;

        ctx.beginPath();
        ctx.arc(p.x, p.y, dotR, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${nr},${ng},${nb},${alpha})`;
        ctx.fill();

        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > size) p.vx *= -1;
        if (p.y < 0 || p.y > size) p.vy *= -1;
      });

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
    <canvas
      ref={ref}
      style={{ width: size, height: size, cursor: "crosshair" }}
      aria-hidden="true"
    />
  );
}
