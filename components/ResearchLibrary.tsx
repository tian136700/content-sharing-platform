"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Article } from "@/types";
import {
  articleSectionElementId,
  type ArticleSectionId,
} from "@/lib/article-sections";
import { searchArticles } from "@/lib/article-utils";
import ArticleSidebar from "./ArticleSidebar";
import ArticleContent from "./ArticleContent";
import DisclaimerModal from "./DisclaimerModal";

interface ResearchLibraryProps {
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
  articles: initialArticles,
}: ResearchLibraryProps) {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [loading, setLoading] = useState(initialArticles.length === 0);

  useEffect(() => {
    if (initialArticles.length > 0) return;

    let cancelled = false;

    async function loadArticles() {
      try {
        const response = await fetch("/api/articles");
        if (!response.ok) throw new Error("Failed to fetch articles");
        const data = (await response.json()) as { articles: Article[] };
        if (!cancelled) setArticles(data.articles);
      } catch (error) {
        console.error("Failed to load articles:", error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void loadArticles();
    return () => {
      cancelled = true;
    };
  }, [initialArticles.length]);

  const initialId = resolveArticleId(articles, null);

  const [selectedId, setSelectedId] = useState<string | null>(initialId);
  const [activeSection, setActiveSection] = useState<ArticleSectionId | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedArticles, setExpandedArticles] = useState<Set<string>>(() => {
    const initial = new Set<string>();
    if (initialId) initial.add(initialId);
    return initial;
  });

  useEffect(() => {
    if (articles.length === 0) return;

    const params = new URLSearchParams(window.location.search);
    const articleId = resolveArticleId(articles, params.get("article"));
    if (!articleId) return;

    setSelectedId(articleId);
    setExpandedArticles((prev) => new Set(prev).add(articleId));
  }, [articles]);

  useEffect(() => {
    if (articles.length === 0) return;
    setSelectedId((current) => current ?? articles[0]?.id ?? null);
  }, [articles]);

  const filteredArticles = useMemo(
    () => (searchQuery ? searchArticles(articles, searchQuery) : articles),
    [searchQuery, articles]
  );

  const selectedArticle = useMemo(
    () => articles.find((a) => a.id === selectedId) ?? null,
    [articles, selectedId]
  );

  const scrollToSection = useCallback(
    (articleId: string, sectionId: ArticleSectionId) => {
      requestAnimationFrame(() => {
        document
          .getElementById(articleSectionElementId(articleId, sectionId))
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    },
    []
  );

  const handleSelectArticle = useCallback(
    (id: string) => {
      setSelectedId(id);
      setActiveSection(null);
      setExpandedArticles((prev) => new Set(prev).add(id));

      const url = new URL(window.location.href);
      url.searchParams.set("article", id);
      router.replace(`${url.pathname}?${url.searchParams.toString()}`, {
        scroll: false,
      });
    },
    [router]
  );

  const handleSelectSection = useCallback(
    (articleId: string, sectionId: ArticleSectionId) => {
      setSelectedId(articleId);
      setActiveSection(sectionId);
      setExpandedArticles((prev) => new Set(prev).add(articleId));

      const url = new URL(window.location.href);
      url.searchParams.set("article", articleId);
      router.replace(`${url.pathname}?${url.searchParams.toString()}`, {
        scroll: false,
      });

      scrollToSection(articleId, sectionId);
    },
    [router, scrollToSection]
  );

  const handleToggleArticle = useCallback((articleId: string) => {
    setExpandedArticles((prev) => {
      const next = new Set(prev);
      if (next.has(articleId)) next.delete(articleId);
      else next.add(articleId);
      return next;
    });
  }, []);

  return (
    <>
      <DisclaimerModal page="/" articleId={selectedId ?? undefined} />

      <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-7xl flex-col lg:flex-row">
        <div className="w-full shrink-0 lg:w-80 xl:w-96">
          <ArticleSidebar
            articles={filteredArticles}
            selectedId={selectedId}
            activeSection={activeSection}
            expandedArticles={expandedArticles}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSelectArticle={handleSelectArticle}
            onSelectSection={handleSelectSection}
            onToggleArticle={handleToggleArticle}
          />
        </div>

        <main className="flex-1 overflow-y-auto p-6 sm:p-8 lg:p-10">
          {loading ? (
            <div className="flex h-full min-h-[400px] items-center justify-center">
              <p className="text-slate-500">正在加载文献…</p>
            </div>
          ) : selectedArticle ? (
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
