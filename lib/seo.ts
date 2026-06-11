import type { Metadata } from "next";
import type { Article } from "@/types";
import { SITE_NAME } from "@/lib/constants";
import type { Topic } from "@/lib/topics";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://pursuing-justice.com";

export const SITE_KEYWORDS = [
  "儿童保护",
  "未成年人刑事责任年龄",
  "降低刑事责任年龄",
  "降低儿童刑事责任年龄",
  "追诉时效改革",
  "取消诉讼时效",
  "取消性侵案件诉讼时效",
  "取消强奸案诉讼时效",
  "延迟披露",
  "延迟披露规则",
  "儿童性侵延迟披露",
  "儿童性虐待延迟披露",
  "儿童性虐待",
  "法律研究",
  "学术文献导读",
] as const;

export const HOME_TITLE = "文献导读";
export const HOME_DESCRIPTION =
  "聚焦儿童保护法律研究：追诉时效改革与取消诉讼时效、儿童性虐待延迟披露规则、降低未成年人刑事责任年龄。提供国际学术文献中文导读与索引。";

function truncate(text: string, maxLength: number): string {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (normalized.length <= maxLength) return normalized;
  return `${normalized.slice(0, maxLength - 1)}…`;
}

function sharedMetadata(): Pick<Metadata, "keywords" | "openGraph" | "twitter"> {
  return {
    keywords: [...SITE_KEYWORDS],
    openGraph: {
      siteName: SITE_NAME,
      locale: "zh_CN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

export function buildHomeMetadata(): Metadata {
  const title = `${HOME_TITLE} | ${SITE_NAME}`;
  return {
    title,
    description: HOME_DESCRIPTION,
    alternates: { canonical: SITE_URL },
    ...sharedMetadata(),
    openGraph: {
      ...sharedMetadata().openGraph,
      title,
      description: HOME_DESCRIPTION,
      url: SITE_URL,
    },
  };
}

export function buildArticleMetadata(article: Article): Metadata {
  const title = `${article.titleZh} | ${SITE_NAME}`;
  const description = truncate(article.abstract, 160);
  const url = `${SITE_URL}/?article=${article.id}`;
  const keywords = [...new Set([...SITE_KEYWORDS, ...article.keywords])];

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      ...sharedMetadata().openGraph,
      title,
      description,
      url,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function buildWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: HOME_DESCRIPTION,
    inLanguage: "zh-CN",
  };
}

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    description: HOME_DESCRIPTION,
  };
}

export function buildTopicMetadata(topic: Topic): Metadata {
  const title = `${topic.title} | ${SITE_NAME}`;
  const url = `${SITE_URL}/topics/${topic.slug}`;

  return {
    title,
    description: topic.description,
    keywords: [...new Set([...SITE_KEYWORDS, ...topic.keywords])],
    alternates: { canonical: url },
    openGraph: {
      ...sharedMetadata().openGraph,
      title,
      description: topic.description,
      url,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: topic.description,
    },
  };
}

export function buildTopicJsonLd(topic: Topic) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: topic.title,
    description: topic.description,
    url: `${SITE_URL}/topics/${topic.slug}`,
    inLanguage: "zh-CN",
    keywords: topic.keywords.join(", "),
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function buildArticleJsonLd(article: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: article.titleZh,
    name: article.titleZh,
    alternateName: article.titleEn,
    description: truncate(article.abstract, 300),
    url: `${SITE_URL}/?article=${article.id}`,
    inLanguage: "zh-CN",
    keywords: article.keywords.join(", "),
    isAccessibleForFree: true,
    sameAs: article.scholarUrl,
  };
}
