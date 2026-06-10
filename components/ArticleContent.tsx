import type { Article } from "@/types";

interface ArticleContentProps {
  article: Article;
}

export default function ArticleContent({ article }: ArticleContentProps) {
  return (
    <article className="max-w-none">
      <header className="mb-8 border-b border-slate-800/80 pb-8">
        <p className="mb-2 text-xs font-medium uppercase tracking-widest text-amber-600/80">
          Research Brief
        </p>
        <h1 className="font-serif text-2xl font-bold leading-tight text-slate-100 sm:text-3xl lg:text-4xl">
          {article.titleZh}
        </h1>
        <p className="mt-3 font-serif text-base italic leading-relaxed text-slate-400 sm:text-lg">
          {article.titleEn}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {article.keywords.map((keyword) => (
            <span
              key={keyword}
              className="rounded-full border border-amber-800/30 bg-amber-950/40 px-3 py-1 text-xs font-medium text-amber-200/90"
            >
              {keyword}
            </span>
          ))}
        </div>
      </header>

      <section className="mb-10">
        <h2 className="mb-4 flex items-center gap-2 font-serif text-xl font-semibold text-slate-200">
          <span className="inline-block h-5 w-1 rounded-full bg-amber-600" />
          核心摘要
        </h2>
        <p className="text-base leading-[1.9] text-slate-300">{article.abstract}</p>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 flex items-center gap-2 font-serif text-xl font-semibold text-slate-200">
          <span className="inline-block h-5 w-1 rounded-full bg-amber-600" />
          引言 / 第一章 精简提炼
        </h2>
        <p className="text-base leading-[1.9] text-slate-300">
          {article.introduction}
        </p>
      </section>

      <div className="rounded-xl border border-amber-800/30 bg-gradient-to-r from-amber-950/40 to-slate-900/40 p-6">
        <p className="mb-4 text-sm text-slate-400">
          受版权保护，本站仅提供导读索引。如需阅读完整原著，请前往 Google Scholar：
        </p>
        <a
          href={article.scholarUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-amber-700 to-amber-600 px-6 py-4 text-center text-base font-semibold text-white shadow-lg shadow-amber-900/30 transition hover:from-amber-600 hover:to-amber-500 sm:w-auto"
        >
          👉 阅读英文原著（前往 Google Scholar）
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
            />
          </svg>
        </a>
      </div>
    </article>
  );
}
