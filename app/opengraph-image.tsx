import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Junaid Shaik — AI Solutions Lead & Architect";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Og() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0a0f11",
          backgroundImage:
            "radial-gradient(circle at 80% 10%, rgba(79,209,197,0.18), transparent 45%)",
          color: "#d7e0e0",
          fontFamily: "monospace",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, color: "#5cc6d6", letterSpacing: 6 }}>
          AI SOLUTIONS LEAD · ARCHITECT
        </div>
        <div style={{ display: "flex", fontSize: 110, fontWeight: 800, color: "#fff", marginTop: 12 }}>
          jun<span style={{ color: "#4fd1c5" }}>ai</span>d
        </div>
        <div style={{ display: "flex", fontSize: 40, color: "#fff", marginTop: 8 }}>
          Junaid Shaik
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "#9bb0b2", marginTop: 24, maxWidth: 900 }}>
          Production Generative AI — LLM integration, RAG, and agentic tooling — on 15+
          years of enterprise architecture.
        </div>
      </div>
    ),
    size
  );
}
