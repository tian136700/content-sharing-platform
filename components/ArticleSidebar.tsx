"use client";

import clsx from "clsx";
import type { Article, Category } from "@/types";
import SearchBox from "./SearchBox";

interface ArticleSidebarProps {
  categories: Category[];
  articles: Article[];
  selectedId: string | null;
  expandedCategories: Set<string>;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectArticle: (id: string) => void;
  onToggleCategory: (categoryId: string) => void;
}

export default function ArticleSidebar({
  categories,
  articles,
  selectedId,
  expandedCategories,
  searchQuery,
  onSearchChange,
  onSelectArticle,
  onToggleCategory,
}: ArticleSidebarProps) {
  const articlesByCategory = categories.map((cat) => ({
    category: cat,
    articles: articles.filter((a) => a.categoryId === cat.id),
  }));

  const filteredCategories = searchQuery
    ? articlesByCategory
        .map(({ category, articles: catArticles }) => ({
          category,
          articles: catArticles,
        }))
        .filter(({ articles: catArticles }) => catArticles.length > 0)
    : articlesByCategory;

  return (
    <aside className="flex h-full flex-col border-r border-slate-800/80 bg-slate-950/50">
      <div className="border-b border-slate-800/80 p-4">
        <h2 className="mb-3 font-serif text-sm font-semibold uppercase tracking-wider text-amber-200/80">
          文献目录
        </h2>
        <SearchBox value={searchQuery} onChange={onSearchChange} />
      </div>

      <nav className="flex-1 overflow-y-auto p-3" aria-label="文献目录导航">
        {filteredCategories.length === 0 ? (
          <p className="px-2 py-4 text-sm text-slate-500">未找到匹配的文献</p>
        ) : (
          <ul className="space-y-1">
            {filteredCategories.map(({ category, articles: catArticles }) => {
              const isExpanded =
                expandedCategories.has(category.id) || searchQuery.length > 0;

              return (
                <li key={category.id}>
                  <button
                    type="button"
                    onClick={() => onToggleCategory(category.id)}
                    className="flex w-full items-center justify-between rounded-md px-2 py-2 text-left text-sm font-medium text-slate-300 transition hover:bg-slate-800/60"
                  >
                    <span>{category.name}</span>
                    <svg
                      className={clsx(
                        "h-4 w-4 text-slate-500 transition-transform",
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
                      {catArticles.map((article) => (
                        <li key={article.id}>
                          <button
                            type="button"
                            onClick={() => onSelectArticle(article.id)}
                            className={clsx(
                              "w-full rounded-md px-2 py-2 text-left text-sm leading-snug transition",
                              selectedId === article.id
                                ? "bg-amber-900/25 text-amber-100 ring-1 ring-amber-800/40"
                                : "text-slate-400 hover:bg-slate-800/40 hover:text-slate-200"
                            )}
                          >
                            {article.titleZh}
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
