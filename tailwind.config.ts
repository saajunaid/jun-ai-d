import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,md,mdx}",
    "./components/**/*.{ts,tsx}",
    "./mdx-components.tsx",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          900: "#0a0f11",
          800: "#0e1518",
          700: "#13201f",
          600: "#1b2a2b",
        },
        teal: {
          DEFAULT: "#0E5A6B",
          400: "#2f9bb0",
          300: "#5cc6d6",
          200: "#9fe3ec",
        },
        mint: "#4fd1c5",
        paper: "#eef2f1",
        muted: "#9bb0b2",
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
