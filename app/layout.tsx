import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { Providers } from "@/components/Providers";
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

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Junaid Shaik",
  jobTitle: "AI Solutions Lead & Architect",
  url: "https://jun-ai-d.vercel.app",
  email: "mailto:saajunaid@gmail.com",
  address: { "@type": "PostalAddress", addressLocality: "Limerick", addressCountry: "IE" },
  sameAs: [
    "https://github.com/saajunaid",
    "https://www.linkedin.com/in/junaid-shaik-4a361849/",
  ],
  knowsAbout: [
    "Generative AI",
    "Large Language Models",
    "Retrieval-Augmented Generation",
    "Model Context Protocol",
    "Solution Architecture",
    "Enterprise Architecture",
    "Telecom BSS/OSS",
  ],
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Heriot-Watt University" },
    { "@type": "CollegeOrUniversity", name: "Jawaharlal Nehru Technological University" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sans.variable} ${display.variable} ${mono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className="font-sans antialiased">
        <Providers>
          <Nav />
          <main>{children}</main>
          <Footer />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
