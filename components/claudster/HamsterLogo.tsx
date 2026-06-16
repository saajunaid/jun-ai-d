"use client";

/* Running-hamster ASCII mark for the /claudster page.
   Three frames overlap; the legs alternate (╱╲ → ││ → ╲╱) to give a run cycle.
   Recoloured from the original amber to the site's mint/teal. */

const BODY = " (\\(\\\n( ˘ω˘ )\n(っ っ)\n";
const LEGS = [" ╱  ╲", " │  │", " ╲  ╱"];

export function HamsterLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`hamster ${className}`} aria-label="claudster hamster" role="img">
      {LEGS.map((leg, i) => (
        <pre key={i} className={`hamster-frame f${i + 1}`} aria-hidden="true">
          {BODY + leg}
        </pre>
      ))}
      <style jsx>{`
        .hamster {
          position: relative;
          width: 9ch;
          height: 6em;
          font-family: var(--font-mono), ui-monospace, monospace;
          font-size: 14px;
          line-height: 1.5;
          color: rgb(var(--accent-strong));
          filter: drop-shadow(0 0 14px rgb(var(--accent-strong) / 0.35));
        }
        .hamster-frame {
          position: absolute;
          top: 0;
          left: 0;
          margin: 0;
          white-space: pre;
        }
        .f1 {
          animation: hrun 0.9s linear infinite 0s;
        }
        .f2 {
          animation: hrun 0.9s linear infinite -0.6s;
        }
        .f3 {
          animation: hrun 0.9s linear infinite -0.3s;
        }
        @keyframes hrun {
          0%,
          32.9% {
            opacity: 1;
          }
          33%,
          100% {
            opacity: 0;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .f2,
          .f3 {
            display: none;
          }
          .f1 {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
