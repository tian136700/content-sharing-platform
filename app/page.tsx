import { Suspense } from "react";
import type { Metadata } from "next";
import { getAllArticles, getAllCategories } from "@/lib/articles";
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

export default function Home() {
  const categories = getAllCategories();
  const articles = getAllArticles();

  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center text-slate-500">
          加载中…
        </div>
      }
    >
      <ResearchLibrary categories={categories} articles={articles} />
    </Suspense>
  );
}
