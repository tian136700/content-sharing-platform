import type { Article } from "@/types";

export function searchArticles(articles: Article[], query: string): Article[] {
  const q = query.trim().toLowerCase();
  if (!q) return articles;

  return articles.filter(
    (a) =>
      a.titleZh.toLowerCase().includes(q) ||
      a.titleEn.toLowerCase().includes(q) ||
      a.keywords.some((k) => k.toLowerCase().includes(q)) ||
      a.abstract.toLowerCase().includes(q)
  );
}
