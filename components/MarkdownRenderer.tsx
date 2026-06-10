"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export default function MarkdownRenderer({
  content,
  className = "",
}: MarkdownRendererProps) {
  if (!content.trim()) {
    return (
      <div className="flex min-h-[200px] items-center justify-center rounded-lg border border-dashed border-slate-700/60 bg-slate-900/30 p-12">
        <p className="text-center text-slate-500">
          内容待补充 — 请在此处添加 Markdown 格式的教程内容
        </p>
      </div>
    );
  }

  return (
    <div
      className={`prose prose-invert prose-amber max-w-none prose-headings:font-serif prose-headings:text-slate-100 prose-p:text-slate-300 prose-p:leading-relaxed prose-a:text-amber-400 prose-strong:text-slate-200 prose-code:text-amber-300 ${className}`}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
