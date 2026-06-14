import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const ch = (v: string) => `rgb(var(${v}) / <alpha-value>)`;

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx,md,mdx}",
    "./components/**/*.{ts,tsx}",
    "./mdx-components.tsx",
  ],
  theme: {
    extend: {
      colors: {
        // semantic, theme-aware tokens (channels swapped in globals.css)
        bg: ch("--bg"),
        surface: ch("--surface"),
        fg: ch("--fg"),
        body: ch("--fg-body"),
        muted: ch("--fg-muted"),
        line: ch("--line"),
        onaccent: ch("--on-accent"),
        mint: ch("--accent-strong"),
        teal: {
          DEFAULT: ch("--accent"),
          200: ch("--accent-soft"),
          300: ch("--accent-soft"),
          400: ch("--accent"),
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: { content: "72rem" },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: { "fade-up": "fade-up 0.6s ease-out both" },
    },
  },
  plugins: [typography],
};

export default config;
