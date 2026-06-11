"use client";

import clsx from "clsx";
import type { Article } from "@/types";
import {
  ARTICLE_SECTIONS,
  type ArticleSectionId,
} from "@/lib/article-sections";
import SearchBox from "./SearchBox";

interface ArticleSidebarProps {
  articles: Article[];
  selectedId: string | null;
  activeSection: ArticleSectionId | null;
  expandedArticles: Set<string>;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectArticle: (id: string) => void;
  onSelectSection: (articleId: string, sectionId: ArticleSectionId) => void;
  onToggleArticle: (articleId: string) => void;
}

export default function ArticleSidebar({
  articles,
  selectedId,
  activeSection,
  expandedArticles,
  searchQuery,
  onSearchChange,
  onSelectArticle,
  onSelectSection,
  onToggleArticle,
}: ArticleSidebarProps) {
  return (
    <aside className="flex h-full flex-col border-r border-slate-800/80 bg-slate-950/50">
      <div className="border-b border-slate-800/80 p-4">
        <h2 className="mb-3 font-serif text-sm font-semibold uppercase tracking-wider text-amber-200/80">
          文献目录
        </h2>
        <SearchBox value={searchQuery} onChange={onSearchChange} />
      </div>

      <nav className="flex-1 overflow-y-auto p-3" aria-label="文献目录导航">
        {articles.length === 0 ? (
          <p className="px-2 py-4 text-sm text-slate-500">
            {searchQuery ? "未找到匹配的文献" : "暂无文献，请稍后再来"}
          </p>
        ) : (
          <ul className="space-y-1">
            {articles.map((article) => {
              const isExpanded =
                expandedArticles.has(article.id) || searchQuery.length > 0;
              const isSelected = selectedId === article.id;

              return (
                <li key={article.id}>
                  <button
                    type="button"
                    onClick={() => {
                      if (selectedId === article.id) {
                        onToggleArticle(article.id);
                      } else {
                        onSelectArticle(article.id);
                      }
                    }}
                    className={clsx(
                      "flex w-full items-start justify-between gap-2 rounded-md px-2 py-2.5 text-left text-sm font-medium leading-snug transition",
                      isSelected
                        ? "bg-amber-900/25 text-amber-100 ring-1 ring-amber-800/40"
                        : "text-slate-300 hover:bg-slate-800/60"
                    )}
                  >
                    <span>{article.titleZh}</span>
                    <svg
                      className={clsx(
                        "mt-0.5 h-4 w-4 shrink-0 text-slate-500 transition-transform",
                        isExpanded && "rotate-90"
                      )}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>

                  {isExpanded && (
                    <ul className="ml-2 mt-1 space-y-0.5 border-l border-slate-800 pl-2">
                      {ARTICLE_SECTIONS.map((section) => (
                        <li key={section.id}>
                          <button
                            type="button"
                            onClick={() =>
                              onSelectSection(article.id, section.id)
                            }
                            className={clsx(
                              "w-full rounded-md px-2 py-2 text-left text-sm transition",
                              isSelected && activeSection === section.id
                                ? "bg-slate-800/60 text-amber-100"
                                : "text-slate-400 hover:bg-slate-800/40 hover:text-slate-200"
                            )}
                          >
                            {section.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </nav>
    </aside>
  );
}
