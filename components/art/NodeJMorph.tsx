"use client";
import { useEffect, useRef } from "react";

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
  const cx = size * 0.50;
  const dotY = size * 0.130;
  const stemTop = size * 0.210;
  const stemBot = size * 0.660;
  const targets: Target[] = [];

  targets.push({ tx: cx, ty: dotY, spring: 0.038, r: 4.5, alpha: 1.0, isDot: true });

  const STEM = 12;
  for (let i = 0; i <= STEM; i++) {
    targets.push({ tx: cx, ty: stemTop + (i / STEM) * (stemBot - stemTop), spring: 0.036, r: 2.0, alpha: 0.92, isDot: false });
  }

  const P0: [number, number] = [cx, stemBot];
  const P1: [number, number] = [cx, stemBot + size * 0.115];
  const P2: [number, number] = [cx - size * 0.115, stemBot + size * 0.145];
  const P3: [number, number] = [cx - size * 0.155, stemBot + size * 0.040];
  for (let i = 1; i <= 9; i++) {
    const [bx, by] = cubicBezier(i / 9, P0, P1, P2, P3);
    targets.push({ tx: bx, ty: by, spring: 0.034, r: 2.0, alpha: 0.88, isDot: false });
  }
  return targets;
}

interface Pt {
  x: number; y: number;
  vx: number; vy: number;
  tx: number; ty: number;
  springBase: number;
  r: number; alpha: number;
  isDot: boolean; isLetter: boolean;
}

function themeRgb(v: string): [number, number, number] {
  const ch = getComputedStyle(document.documentElement)
    .getPropertyValue(v).trim().split(/\s+/).map(Number);
  return [ch[0], ch[1], ch[2]];
}

const LINK = 72;
const MAX_SPEED = 1.6;
const IDLE_FRICTION  = 0.984;
const ACTIVE_FRICTION = 0.88;
const DRIFT = 0.06;
const MORPH_SPEED = 0.055;

export function NodeJMorph({ size = 300 }: { size?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  // useRef — always fresh in the RAF loop, never stale
  const active = useRef(false);
  const morph  = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = el.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;
    el.width  = size * dpr;
    el.height = size * dpr;
    ctx.scale(dpr, dpr);

    const cx = size * 0.50;
    const cy = size * 0.46;

    // Letter nodes — start scattered around canvas centre
    const pts: Pt[] = buildTargets(size).map(t => {
      const angle = Math.random() * Math.PI * 2;
      const dist  = size * (0.1 + Math.random() * 0.35);
      return {
        x: cx + Math.cos(angle) * dist,
        y: cy + Math.sin(angle) * dist,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        tx: t.tx, ty: t.ty,
        springBase: t.spring,
        r: t.r, alpha: t.alpha,
        isDot: t.isDot, isLetter: true,
      };
    });

    // Ambient halo nodes
    for (let i = 0; i < 14; i++) {
      const angle = (i / 14) * Math.PI * 2;
      const dist  = size * (0.22 + Math.random() * 0.20);
      pts.push({
        x: cx + Math.cos(angle) * dist * 0.75,
        y: cy + Math.sin(angle) * dist,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        tx: cx, ty: cy, springBase: 0,
        r: Math.random() * 1.2 + 0.6,
        alpha: 0.38 + Math.random() * 0.25,
        isDot: false, isLetter: false,
      });
    }

    // Same event pattern as NodeJ — mousemove activates, mouseleave deactivates
    const onMove  = () => { active.current = true; };
    const onLeave = () => { active.current = false; };
    el.addEventListener("mousemove",  onMove);
    el.addEventListener("mouseleave", onLeave);

    let raf: number;
    let frame = 0;

    const tick = () => {
      ctx.clearRect(0, 0, size, size);
      const [nr, ng, nb] = themeRgb("--accent-strong");
      const [lr, lg, lb] = themeRgb("--accent-soft");

      // Lerp morph toward 0 or 1
      const m = morph.current + ((active.current ? 1 : 0) - morph.current) * MORPH_SPEED;
      morph.current = m;

      // Connection lines
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
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

      pts.forEach(p => {
        if (p.isLetter) {
          // Spring scales 0 → full as morph grows
          p.vx += (p.tx - p.x) * p.springBase * m;
          p.vy += (p.ty - p.y) * p.springBase * m;
          // Drift fades out as shape forms
          p.vx += (Math.random() - 0.5) * DRIFT * (1 - m);
          p.vy += (Math.random() - 0.5) * DRIFT * (1 - m);
          // Soft gravity toward centre when idle
          p.vx += (cx - p.x) * 0.0009 * (1 - m);
          p.vy += (cy - p.y) * 0.0009 * (1 - m);
          // Friction blends from idle → snappy
          p.vx *= IDLE_FRICTION + (ACTIVE_FRICTION - IDLE_FRICTION) * m;
          p.vy *= IDLE_FRICTION + (ACTIVE_FRICTION - IDLE_FRICTION) * m;
          // Soft wall bounce when still scattered
          if (m < 0.15) {
            if (p.x < 6 || p.x > size - 6) p.vx *= -0.8;
            if (p.y < 6 || p.y > size - 6) p.vy *= -0.8;
          }
        } else {
          p.vx += (Math.random() - 0.5) * DRIFT * 0.5;
          p.vy += (Math.random() - 0.5) * DRIFT * 0.5;
          p.vx += (cx - p.x) * 0.0006;
          p.vy += (cy - p.y) * 0.0006;
          p.vx *= IDLE_FRICTION;
          p.vy *= IDLE_FRICTION;
          if (p.x < 6 || p.x > size - 6) p.vx *= -0.8;
          if (p.y < 6 || p.y > size - 6) p.vy *= -0.8;
        }

        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (spd > MAX_SPEED) { p.vx *= MAX_SPEED / spd; p.vy *= MAX_SPEED / spd; }
        p.x += p.vx;
        p.y += p.vy;

        let nodeR = p.r;
        if (p.isDot && m > 0.15) {
          nodeR = p.r + Math.sin(frame * 0.04) * 0.8;
          ctx.beginPath();
          ctx.arc(p.x, p.y, nodeR + 5 + Math.sin(frame * 0.04) * 2, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${nr},${ng},${nb},${(0.18 * m).toFixed(3)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, nodeR, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${nr},${ng},${nb},${p.alpha.toFixed(3)})`;
        ctx.fill();
      });

      frame++;
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("mousemove",  onMove);
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
