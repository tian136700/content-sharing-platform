import Link from "next/link";
import { topics } from "@/lib/topics";

export default function SeoIntro() {
  return (
    <section
      aria-label="平台简介"
      className="border-b border-slate-800/80 bg-slate-950/80 px-4 py-5 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <p className="max-w-4xl text-sm leading-relaxed text-slate-400">
          本平台专注儿童保护法律研究，提供
          <strong className="font-medium text-slate-300">追诉时效改革</strong>与
          <strong className="font-medium text-slate-300">取消诉讼时效</strong>、
          <strong className="font-medium text-slate-300">延迟披露规则</strong>、
          <strong className="font-medium text-slate-300">
            降低未成年人刑事责任年龄
          </strong>
          等国际前沿文献的中文导读与学术索引。
        </p>
        <nav
          aria-label="研究专题"
          className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm"
        >
          {topics.map((topic) => (
            <Link
              key={topic.slug}
              href={`/topics/${topic.slug}`}
              className="text-amber-400/80 transition hover:text-amber-300"
            >
              {topic.title}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
