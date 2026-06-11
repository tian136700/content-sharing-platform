import type { Metadata } from "next";
import { getAllCategories } from "@/lib/articles";
import { getArticlesFromDB } from "@/lib/storage";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/constants";
import ResearchLibrary from "@/components/ResearchLibrary";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: `${SITE_NAME} | 文献导读`,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: `${SITE_NAME} | 文献导读`,
    description: SITE_DESCRIPTION,
    type: "website",
  },
};

export default async function Home() {
  const categories = getAllCategories();
  const articles = await getArticlesFromDB();

  return (
    <ResearchLibrary categories={categories} articles={articles} />
  );
}
