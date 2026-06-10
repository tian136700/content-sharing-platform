"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Article, Category } from "@/types";
import { searchArticles } from "@/lib/articles";
import ArticleSidebar from "./ArticleSidebar";
import ArticleContent from "./ArticleContent";
import DisclaimerModal from "./DisclaimerModal";

interface ResearchLibraryProps {
  categories: Category[];
  articles: Article[];
  initialArticleId?: string;
}

export default function ResearchLibrary({
  categories,
  articles,
  initialArticleId,
}: ResearchLibraryProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const defaultArticleId = initialArticleId ?? articles[0]?.id ?? null;
  const [selectedId, setSelectedId] = useState<string | null>(defaultArticleId);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    () => {
      const initial = new Set<string>();
      const article = articles.find((a) => a.id === defaultArticleId);
      if (article) initial.add(article.categoryId);
      return initial;
    }
  );

  const filteredArticles = useMemo(
    () => (searchQuery ? searchArticles(searchQuery) : articles),
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
      const params = new URLSearchParams(searchParams.toString());
      params.set("article", id);
      router.replace(`/?${params.toString()}`, { scroll: false });
    },
    [articles, router, searchParams]
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
