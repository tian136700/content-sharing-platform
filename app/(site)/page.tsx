import type { Metadata } from "next";
import ResearchLibrary from "@/components/ResearchLibrary";
import SeoIntro from "@/components/SeoIntro";
import JsonLd from "@/components/JsonLd";
import { getArticlesFromDB } from "@/lib/storage";
import {
  buildArticleJsonLd,
  buildArticleMetadata,
  buildHomeMetadata,
  buildOrganizationJsonLd,
  buildWebsiteJsonLd,
} from "@/lib/seo";

export const revalidate = 3600;

type HomePageProps = {
  searchParams: Promise<{ article?: string }>;
};

export async function generateMetadata({
  searchParams,
}: HomePageProps): Promise<Metadata> {
  const { article: articleId } = await searchParams;

  if (articleId) {
    const articles = await getArticlesFromDB();
    const article = articles.find((item) => item.id === articleId);
    if (article) return buildArticleMetadata(article);
  }

  return buildHomeMetadata();
}

export default async function Home({ searchParams }: HomePageProps) {
  const [{ article: articleId }, articles] = await Promise.all([
    searchParams,
    getArticlesFromDB(),
  ]);

  const selectedArticle = articleId
    ? articles.find((item) => item.id === articleId)
    : undefined;

  const jsonLd = selectedArticle
    ? [buildWebsiteJsonLd(), buildOrganizationJsonLd(), buildArticleJsonLd(selectedArticle)]
    : [buildWebsiteJsonLd(), buildOrganizationJsonLd()];

  return (
    <>
      <JsonLd data={jsonLd} />
      <SeoIntro />
      <ResearchLibrary
        articles={articles}
        initialArticleId={articleId ?? null}
      />
    </>
  );
}
