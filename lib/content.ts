export const profile = {
  name: "Junaid Shaik",
  role: "AI Solutions Lead & Architect",
  tagline:
    "I design and ship production Generative AI systems — LLM integration, RAG, and agentic tooling — on 15+ years of telecom and cloud architecture.",
  location: "Limerick, Ireland",
  email: "saajunaid@gmail.com",
  github: "https://github.com/saajunaid",
  linkedin: "https://www.linkedin.com/in/junaid-shaik-4a361849/",
  cv: "/Junaid_Shaik_AI_Solutions_Lead_CV.docx",
};

export const stats = [
  { value: "15+", label: "Years in architecture" },
  { value: "1M+", label: "Customers served by platforms" },
  { value: "3", label: "Published AI dev tools" },
  { value: "€200M", label: "Fibre programme architected" },
];

export const capabilities = [
  {
    title: "LLM Integration",
    body: "Production features on Azure OpenAI (GPT-4o, GPT-4, Whisper, text-embedding-3-small) and on-prem open-source models via Ollama and vLLM (Qwen, GLM).",
  },
  {
    title: "Retrieval-Augmented Generation",
    body: "FAISS vector search over indexed customer history with grounded, source-cited answers and resilient, fallback-protected delivery.",
  },
  {
    title: "Agentic AI & MCP",
    body: "Published agentic developer tools using the Model Context Protocol, multi-agent pipelines and deterministic routing.",
  },
  {
    title: "Platform Architecture",
    body: "Provider-routing orchestration, on-prem GPU serving, GKE + Apigee, OAuth2/OIDC and RBAC-governed, audited data access.",
  },
  {
    title: "Telecom & Networks",
    body: "BSS/OSS, end-to-end provisioning, XGS-PON / DOCSIS, Nokia AAA & Altiplano — the enterprise backbone behind the AI.",
  },
  {
    title: "Engineering & Delivery",
    body: "FastAPI, React/TypeScript, Redis, SQL Server; in-app telemetry; containerised, CI/CD-driven delivery on GCP and AWS.",
  },
];

export type Project = {
  name: string;
  tag: string;
  blurb: string;
  stack: string[];
  status?: string;
  href?: string;
};

export const projects: Project[] = [
  {
    name: "UCIP — Unified Customer Intelligence Platform",
    tag: "Architecture",
    blurb:
      "API-first platform unifying three production apps into one customer-keyed intelligence layer for 1M+ customers. Designed the target architecture: provider-routing LLM orchestration, an MCP tool surface, on-prem GPU inference, and a GKE + Apigee migration.",
    stack: ["LLM orchestration", "MCP", "vLLM", "GKE", "Apigee", "OAuth2/OIDC"],
    href: "/work/ucip",
  },
  {
    name: "Customer 360 / ServeSight",
    tag: "RAG · Build",
    blurb:
      "360° contact-centre intelligence unifying Pega, ServiceNow, Qfiniti and Cisco data. Architected the VIBO assistant's RAG integration — FAISS retrieval with gpt-4o, a resilient proxy with graceful keyword fallback and source citations.",
    stack: ["FAISS", "Azure OpenAI gpt-4o", "FastAPI", "React", "SQL Server"],
    href: "/work/vibo",
  },
  {
    name: "AI Agent Assist",
    tag: "Lead",
    blurb:
      "Real-time contact-centre assistant using Azure OpenAI Whisper for transcription and GPT-4 for summarisation on GCP — live agent suggestions and automated after-call work.",
    stack: ["Whisper", "GPT-4", "GCP"],
  },
  {
    name: "Appointment Assist",
    tag: "AI Dispatch · Build",
    blurb:
      "AI dispatch engine recommending DISPATCH / CANCEL / REVIEW on field truck-rolls from network diagnostics, powered by an on-prem Qwen-32B model via vLLM.",
    stack: ["Qwen-32B", "vLLM", "FastAPI", "React", "Redis/RQ"],
  },
  {
    name: "RevSight — Mobile Revenue Assurance",
    tag: "Data Platform · Build",
    blurb:
      "Revenue assurance over mobile CDRs (SMS/VOICE, originated/terminated) across 100+ countries to surface revenue-vs-interconnect leakage; typed marts over 4.3M+ records/month scaling to 90M+ rows.",
    stack: ["FastAPI", "React", "SQL Server", "Typed marts"],
    status: "In build",
  },
  {
    name: "NPS Lens",
    tag: "Analytics",
    blurb:
      "Executive NPS intelligence dashboard with LLM-driven theme extraction and verbatim clustering over customer survey feedback.",
    stack: ["LLM", "FastAPI", "React"],
  },
];

export type Tool = {
  name: string;
  kind: string;
  blurb: string;
  link?: string;
};

export const tools: Tool[] = [
  {
    name: "junai",
    kind: "VS Code Marketplace",
    blurb:
      "Agentic engineering pipeline for GitHub Copilot — 26 specialist agents, 9 MCP tools, deterministic stage routing and governed knowledge promotion.",
    link: "https://marketplace.visualstudio.com/items?itemName=junai-labs.junai",
  },
  {
    name: "ptarmigan",
    kind: "VS Code Marketplace",
    blurb:
      "TDD-enforced, gate-guarded agentic delivery system that turns Copilot into a disciplined intent-to-ship pipeline.",
    link: "https://marketplace.visualstudio.com/items?itemName=junai-labs.ptarmigan",
  },
  {
    name: "claudster",
    kind: "Claude Code plugin",
    blurb:
      "Structured development harness — 5-stage workflow, 12 read-only agents and 130+ skills, with a model-portable gateway (LiteLLM) that runs the same agents on local open-source LLMs.",
  },
];

export const experience = [
  {
    role: "Lead Solutions Architect — Architecture & Transformation",
    org: "Virgin Media Ireland",
    period: "2019 — Present",
    note: "AI Solutions Leadership Team. Leading AI platforms, the €200M fibre transformation (HFC → XGS-PON), and contact-centre modernisation.",
  },
  {
    role: "Senior Network Architect",
    org: "Liberty Global",
    period: "2018 — 2019",
    note: "B2B CPE architecture (DOCSIS 3.0/3.1, Intel SDK) across UK & Pan-EU. Resolved an SDK security flaw saving several million euros.",
  },
  {
    role: "Connectivity Service Test Engineer",
    org: "Liberty Global",
    period: "2017 — 2018",
    note: "Global CPE certification automation; represented Liberty Global in the RDK-B / TDK-B forum.",
  },
  {
    role: "DOCSIS CPE Test & Certification Engineer",
    org: "Virgin Media Ireland",
    period: "2013 — 2017",
    note: "Led the Mv1 cable modem introduction; 3rd-tier support and OSS/BSS UAT.",
  },
  {
    role: "Technical Support Engineer",
    org: "Virgin Media Ireland",
    period: "2008 — 2013",
    note: "NOC monitoring and fault-trend analysis for broadband, VoIP and SIP.",
  },
];

export const certs = [
  "AWS Certified AI Practitioner (2025)",
  "Develop AI-Powered Prototypes — Google AI Studio (2025)",
  "Northstar — Snowflake Intelligence (2025)",
  "TOGAF® 9 Certified (2021)",
  "Postman API Fundamentals Student Expert (2023)",
  "Certified Tester Foundation Level — CTFL (2018)",
];

export type Concept = {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
};

export const concepts: Concept[] = [
  {
    slug: "vibo-rag",
    title: "How VIBO RAG Works",
    summary:
      "End-to-end walkthrough of the RAG assistant: FAISS retrieval, gpt-4o generation, and the resilient proxy + fallback integration.",
    tags: ["RAG", "FAISS", "gpt-4o", "Architecture"],
  },
  {
    slug: "faiss",
    title: "FAISS, Explained",
    summary:
      "What a vector index actually does, how embeddings turn text into searchable points, and how it's used in our setup.",
    tags: ["Vectors", "Embeddings", "Search"],
  },
  {
    slug: "rag",
    title: "Retrieval-Augmented Generation",
    summary:
      "Why grounding an LLM in retrieved facts beats relying on its memory — the core pattern behind trustworthy AI features.",
    tags: ["RAG", "LLM", "Grounding"],
  },
  {
    slug: "mcp",
    title: "Model Context Protocol (MCP)",
    summary:
      "How agents safely call real tools and data, and why MCP is the integration layer behind agentic systems.",
    tags: ["Agents", "MCP", "Tools"],
  },
  {
    slug: "llm-serving",
    title: "Serving LLMs: Cloud & On-Prem",
    summary:
      "Azure OpenAI vs Ollama vs vLLM, what a model gateway does, and how to run agents on local open-source models.",
    tags: ["vLLM", "Ollama", "LiteLLM", "GPU"],
  },
  {
    slug: "embeddings",
    title: "Embeddings & Vector Space",
    summary:
      "How text becomes numbers that capture meaning — the foundation under search, RAG, and recommendations.",
    tags: ["Embeddings", "Vectors", "Semantics"],
  },
  {
    slug: "agentic-pipelines",
    title: "Agentic Pipelines",
    summary:
      "Why a chain of specialist agents with gates beats one giant prompt — the pattern behind my dev tools.",
    tags: ["Agents", "Pipelines", "TDD"],
  },
  {
    slug: "fine-tuning",
    title: "Fine-Tuning vs RAG vs Prompting",
    summary:
      "The three ways to adapt an LLM to your needs — and how to choose the cheapest one that works.",
    tags: ["Fine-tuning", "RAG", "Prompting"],
  },
];
