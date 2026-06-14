import type { MetadataRoute } from "next";
import { concepts } from "@/lib/content";

const base = "https://jun-ai-d.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/resume",
    "/learn",
    ...concepts.map((c) => `/learn/${c.slug}`),
    "/work/ucip",
    "/work/vibo",
  ];
  return routes.map((r) => ({
    url: `${base}${r}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: r === "" ? 1 : 0.7,
  }));
}
