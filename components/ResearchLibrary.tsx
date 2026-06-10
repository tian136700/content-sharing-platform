"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Article, Category } from "@/types";
import { searchArticles } from "@/lib/article-utils";
import ArticleSidebar from "./ArticleSidebar";
import ArticleContent from "./ArticleContent";
import DisclaimerModal from "./DisclaimerModal";

interface ResearchLibraryProps {
  categories: Category[];
  articles: Article[];
}

function resolveArticleId(
  articles: Article[],
  articleParam: string | null
): string | null {
  if (articleParam && articles.some((a) => a.id === articleParam)) {
    return articleParam;
  }
  return articles[0]?.id ?? null;
}

export default function ResearchLibrary({
  categories,
  articles,
}: ResearchLibraryProps) {
  const router = useRouter();
  const initialId = resolveArticleId(articles, null);

  const [selectedId, setSelectedId] = useState<string | null>(initialId);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    () => {
      const initial = new Set<string>();
      const article = articles.find((a) => a.id === initialId);
      if (article) initial.add(article.categoryId);
      return initial;
    }
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const articleId = resolveArticleId(articles, params.get("article"));
    if (!articleId) return;

    setSelectedId(articleId);
    const article = articles.find((a) => a.id === articleId);
    if (article) {
      setExpandedCategories((prev) => new Set(prev).add(article.categoryId));
    }
  }, [articles]);

  const filteredArticles = useMemo(
    () => (searchQuery ? searchArticles(articles, searchQuery) : articles),
    [searchQuery, articles]
  );

  const selectedArticle = useMemo(
    () => articles.find((a) => a.id === selectedId) ?? null,
    [articles, selectedId]
  );

  const handleSelectArticle = useCallback(
    (id: string) => {
      setSelectedId(id);
      const article = articles.find((a) => a.id === id);
      if (article) {
        setExpandedCategories((prev) => new Set(prev).add(article.categoryId));
      }
      const url = new URL(window.location.href);
      url.searchParams.set("article", id);
      router.replace(`${url.pathname}?${url.searchParams.toString()}`, {
        scroll: false,
      });
    },
    [articles, router]
  );

  const handleToggleCategory = useCallback((categoryId: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(categoryId)) next.delete(categoryId);
      else next.add(categoryId);
      return next;
    });
  }, []);

  return (
    <>
      <DisclaimerModal page="/" articleId={selectedId ?? undefined} />

      <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-7xl flex-col lg:flex-row">
        <div className="w-full shrink-0 lg:w-80 xl:w-96">
          <ArticleSidebar
            categories={categories}
            articles={filteredArticles}
            selectedId={selectedId}
            expandedCategories={expandedCategories}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSelectArticle={handleSelectArticle}
            onToggleCategory={handleToggleCategory}
          />
        </div>

        <main className="flex-1 overflow-y-auto p-6 sm:p-8 lg:p-10">
          {selectedArticle ? (
            <ArticleContent article={selectedArticle} />
          ) : (
            <div className="flex h-full min-h-[400px] items-center justify-center">
              <p className="text-slate-500">请从左侧目录选择一篇文献</p>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
