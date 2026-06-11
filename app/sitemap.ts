import type { MetadataRoute } from "next";
import { getArticlesFromDB } from "@/lib/storage";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://pursuing-justice.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getArticlesFromDB();
  const now = new Date();

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/guide`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...articles.map((article) => ({
      url: `${SITE_URL}/?article=${article.id}`,
      lastModified: new Date(
        article.updatedAt ?? article.createdAt ?? now.toISOString()
      ),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
