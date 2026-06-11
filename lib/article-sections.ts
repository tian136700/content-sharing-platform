export const ARTICLE_SECTIONS = [
  { id: "abstract", label: "核心摘要" },
  { id: "introduction", label: "引言 / 第一章 精简提炼" },
  { id: "scholar", label: "阅读原文（Google Scholar）" },
] as const;

export type ArticleSectionId = (typeof ARTICLE_SECTIONS)[number]["id"];

export function articleSectionElementId(
  articleId: string,
  sectionId: ArticleSectionId
): string {
  return `article-${articleId}-${sectionId}`;
}
