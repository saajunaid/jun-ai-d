import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  title: "Junaid Shaik — AI Solutions Lead & Architect",
  description:
    "Solutions & AI Architect building production GenAI systems — LLM integration, RAG, and agentic tooling — on 15+ years of telecom and cloud architecture.",
  metadataBase: new URL("https://jun-ai-d.vercel.app"),
  openGraph: {
    title: "Junaid Shaik — AI Solutions Lead & Architect",
    description:
      "Production GenAI systems, agentic developer tooling, and enterprise architecture.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable} ${mono.variable}`}>
      <body className="font-sans antialiased">
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
