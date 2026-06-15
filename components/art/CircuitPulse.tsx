"use client";

const NODES: [number, number][] = [
  [45, 45], [145, 45], [245, 45],
  [45, 145], [145, 145], [245, 145],
  [45, 245], [145, 245], [245, 245],
];

const TRACES = [
  "M 45 45 H 245",
  "M 45 145 H 245",
  "M 45 245 H 245",
  "M 45 45 V 245",
  "M 145 45 V 245",
  "M 245 45 V 245",
];

const traceStyle: React.CSSProperties = {
  stroke: "rgb(var(--accent-soft))",
  strokeOpacity: 0.18,
  strokeWidth: 1,
  fill: "none",
};

const nodeStyle: React.CSSProperties = {
  fill: "rgb(var(--accent-soft))",
  fillOpacity: 0.22,
};

export function CircuitPulse({ size = 290 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 290 290"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <path id="cp-outer" d="M 45 45 H 245 V 245 H 45 Z" />
        <path id="cp-midh" d="M 45 145 H 245" />
        <path id="cp-midv" d="M 145 45 V 245" />
      </defs>

      {/* Grid traces */}
      {TRACES.map((d, i) => (
        <path key={i} d={d} style={traceStyle} />
      ))}

      {/* Junction nodes */}
      {NODES.map(([cx, cy], i) => {
        const isCenter = cx === 145 && cy === 145;
        return (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={isCenter ? 5.5 : 3}
            style={{
              ...nodeStyle,
              fillOpacity: isCenter ? 0.45 : 0.22,
            }}
          />
        );
      })}

      {/* Center node glow ring */}
      <circle
        cx={145}
        cy={145}
        r={12}
        style={{ fill: "rgb(var(--accent-strong))", fillOpacity: 0.1 }}
      />
      <circle
        cx={145}
        cy={145}
        r={5.5}
        style={{ fill: "rgb(var(--accent-strong))", fillOpacity: 0.55 }}
      />

      {/* Pulse 1 — outer rectangle loop */}
      <circle r={4.5} style={{ fill: "rgb(var(--accent-strong))" }}>
        <animateMotion dur="9s" repeatCount="indefinite">
          <mpath href="#cp-outer" />
        </animateMotion>
      </circle>

      {/* Pulse 2 — horizontal centre trace */}
      <circle r={3} style={{ fill: "rgb(var(--accent-strong))", fillOpacity: 0.75 }}>
        <animateMotion dur="2.8s" repeatCount="indefinite" begin="1.4s">
          <mpath href="#cp-midh" />
        </animateMotion>
      </circle>

      {/* Pulse 3 — vertical centre trace */}
      <circle r={3} style={{ fill: "rgb(var(--accent-strong))", fillOpacity: 0.75 }}>
        <animateMotion dur="3.2s" repeatCount="indefinite" begin="0.6s">
          <mpath href="#cp-midv" />
        </animateMotion>
      </circle>
    </svg>
  );
}
