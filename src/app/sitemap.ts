import type { MetadataRoute } from "next";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/ru","/en","/ru/guides","/en/guides","/ru/guides/totals-vs-itb","/en/guides/totals-vs-itb"];
  return pages.map((p) => ({
    url: ${SITE_URL},
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: p === "/ru" || p === "/en" ? 1 : 0.7,
  }));
}