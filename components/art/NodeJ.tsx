"use client";
import { useEffect, useRef } from "react";

// ── Letter "j" shape ─────────────────────────────────────────────────────────
// Points are fractions of canvas size [0-1].
// Cubic bezier helper (for the hook curve).
function cubicBezier(
  t: number,
  p0: [number, number],
  p1: [number, number],
  p2: [number, number],
  p3: [number, number],
): [number, number] {
  const m = 1 - t;
  return [
    m ** 3 * p0[0] + 3 * m ** 2 * t * p1[0] + 3 * m * t ** 2 * p2[0] + t ** 3 * p3[0],
    m ** 3 * p0[1] + 3 * m ** 2 * t * p1[1] + 3 * m * t ** 2 * p2[1] + t ** 3 * p3[1],
  ];
}

interface Target { tx: number; ty: number; spring: number; r: number; alpha: number; isDot: boolean }

function buildTargets(size: number): Target[] {
  const cx = size * 0.50;     // horizontal centre of the letter
  const dotY = size * 0.130;
  const stemTop = size * 0.210;
  const stemBot = size * 0.660;

  const targets: Target[] = [];

  // ── Tittle (dot above the j) ──────────────────────────────────────────────
  targets.push({ tx: cx, ty: dotY, spring: 0.038, r: 4.5, alpha: 1.0, isDot: true });

  // ── Stem (top → bottom) ──────────────────────────────────────────────────
  const STEM = 12;
  for (let i = 0; i <= STEM; i++) {
    const t = i / STEM;
    targets.push({
      tx: cx,
      ty: stemTop + t * (stemBot - stemTop),
      spring: 0.036,
      r: 2.0,
      alpha: 0.92,
      isDot: false,
    });
  }

  // ── Hook (cubic bezier, curving left & up at the bottom) ─────────────────
  const P0: [number, number] = [cx, stemBot];
  const P1: [number, number] = [cx, stemBot + size * 0.115];
  const P2: [number, number] = [cx - size * 0.115, stemBot + size * 0.145];
  const P3: [number, number] = [cx - size * 0.155, stemBot + size * 0.040];
  const HOOK = 9;
  for (let i = 1; i <= HOOK; i++) {
    const [bx, by] = cubicBezier(i / HOOK, P0, P1, P2, P3);
    targets.push({ tx: bx, ty: by, spring: 0.034, r: 2.0, alpha: 0.88, isDot: false });
  }

  return targets;
}

// ── Particle ──────────────────────────────────────────────────────────────────
interface Pt {
  x: number; y: number;
  vx: number; vy: number;
  tx: number; ty: number;
  spring: number;
  r: number;
  alpha: number;
  isDot: boolean;
  isLetter: boolean;
}

function themeRgb(v: string): [number, number, number] {
  const ch = getComputedStyle(document.documentElement)
    .getPropertyValue(v).trim().split(/\s+/).map(Number);
  return [ch[0], ch[1], ch[2]];
}

const LINK = 72;
const MAX_SPEED = 1.4;
const FRICTION = 0.88;       // damping — brings letter nodes back smoothly
const AMBIENT_FRICTION = 0.985;
const REPEL_R = 85;
const REPEL_F = 0.5;
const DRIFT = 0.06;           // random jitter per frame on letter nodes

export function NodeJ({ size = 300 }: { size?: number }) {
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

    // Build letter-constrained nodes
    const letterTargets = buildTargets(size);
    const pts: Pt[] = letterTargets.map(t => ({
      x: t.tx + (Math.random() - 0.5) * 20,
      y: t.ty + (Math.random() - 0.5) * 20,
      vx: 0, vy: 0,
      tx: t.tx, ty: t.ty,
      spring: t.spring,
      r: t.r,
      alpha: t.alpha,
      isDot: t.isDot,
      isLetter: true,
    }));

    // Add ambient free-floating nodes in a loose halo
    const AMBIENT = 16;
    const cx = size * 0.5, cy = size * 0.48;
    for (let i = 0; i < AMBIENT; i++) {
      const angle = (i / AMBIENT) * Math.PI * 2;
      const spread = size * (0.28 + Math.random() * 0.17);
      const ax = cx + Math.cos(angle) * spread * 0.7;
      const ay = cy + Math.sin(angle) * spread;
      pts.push({
        x: ax, y: ay, vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
        tx: ax, ty: ay,
        spring: 0,                // no spring — floats freely
        r: Math.random() * 1.2 + 0.6,
        alpha: 0.45 + Math.random() * 0.3,
        isDot: false,
        isLetter: false,
      });
    }

    let raf: number;
    let frame = 0;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onLeave = () => { mouse.current = { x: -9999, y: -9999 }; };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    const tick = () => {
      ctx.clearRect(0, 0, size, size);
      const [nr, ng, nb] = themeRgb("--accent-strong");
      const [lr, lg, lb] = themeRgb("--accent-soft");
      const { x: mx, y: my } = mouse.current;

      // ── Connections ──────────────────────────────────────────────────────
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < LINK) {
            const a = (1 - d / LINK) * 0.28;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(${lr},${lg},${lb},${a.toFixed(3)})`;
            ctx.lineWidth = 0.65;
            ctx.stroke();
          }
        }
      }

      // ── Nodes ─────────────────────────────────────────────────────────────
      pts.forEach(p => {
        // Mouse repulsion
        const mdx = p.x - mx, mdy = p.y - my;
        const md = Math.sqrt(mdx * mdx + mdy * mdy);
        if (md < REPEL_R && md > 0) {
          const f = ((REPEL_R - md) / REPEL_R) * REPEL_F;
          p.vx += (mdx / md) * f;
          p.vy += (mdy / md) * f;
        }

        if (p.isLetter) {
          // Spring toward letter target
          p.vx += (p.tx - p.x) * p.spring + (Math.random() - 0.5) * DRIFT;
          p.vy += (p.ty - p.y) * p.spring + (Math.random() - 0.5) * DRIFT;
          p.vx *= FRICTION;
          p.vy *= FRICTION;
        } else {
          // Ambient: free float with bounce
          p.vx *= AMBIENT_FRICTION;
          p.vy *= AMBIENT_FRICTION;
          if (p.x < 8 || p.x > size - 8) p.vx *= -1;
          if (p.y < 8 || p.y > size - 8) p.vy *= -1;
        }

        // Speed cap
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (spd > MAX_SPEED) { p.vx *= MAX_SPEED / spd; p.vy *= MAX_SPEED / spd; }

        p.x += p.vx;
        p.y += p.vy;

        // Draw node
        const near = md < REPEL_R;
        let nodeR = near ? p.r * 1.3 : p.r;
        let nodeA = near ? Math.min(1, p.alpha * 1.15) : p.alpha;

        // Tittle gets a slow pulse ring
        if (p.isDot) {
          nodeR = p.r + Math.sin(frame * 0.04) * 0.8;
          nodeA = 1.0;
          // Outer glow ring
          ctx.beginPath();
          ctx.arc(p.x, p.y, nodeR + 5 + Math.sin(frame * 0.04) * 2, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${nr},${ng},${nb},0.18)`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, nodeR, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${nr},${ng},${nb},${nodeA.toFixed(3)})`;
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
    <canvas
      ref={ref}
      style={{ width: size, height: size, cursor: "crosshair" }}
      aria-hidden="true"
    />
  );
}
