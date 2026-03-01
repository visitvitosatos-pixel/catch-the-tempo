import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/guides"];

  return pages.map((p) => ({
    url: SITE_URL + p,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: p === "/" ? 1 : 0.7,
  }));
}
