// Decorative ASCII lynx mascot with a subtle blink (CSS-only, two stacked frames).
const OPEN = [
  "  /\\   /\\",
  "  \\ \\_/ /",
  "  /`o o`\\",
  " (   ^   )",
  "  \\ '-' /",
  "  /|   |\\",
].join("\n");

const BLINK = [
  "  /\\   /\\",
  "  \\ \\_/ /",
  "  /`- -`\\",
  " (   ^   )",
  "  \\ '-' /",
  "  /|   |\\",
].join("\n");

export function Lynx({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`lynx relative select-none font-mono text-[9px] leading-[1.15] text-mint/80 md:text-[11px] ${className}`}
    >
      <pre className="lynx-open">{OPEN}</pre>
      <pre className="lynx-blink absolute inset-0">{BLINK}</pre>
    </div>
  );
}
