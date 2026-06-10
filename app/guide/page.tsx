import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import DisclaimerModal from "@/components/DisclaimerModal";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: `${SITE_NAME} | 检索与翻译指南`,
  description: "学术文献检索方法与翻译指南，帮助读者高效获取与理解国际儿童保护法律研究文献。",
};

// Set content here when ready, or load from CMS/KV later
const GUIDE_CONTENT = "";

export default function GuidePage() {
  return (
    <>
      <DisclaimerModal page="/guide" />

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-10 border-b border-slate-800/80 pb-8">
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-amber-600/80">
            Research Guide
          </p>
          <h1 className="font-serif text-3xl font-bold text-slate-100 sm:text-4xl">
            文献检索与翻译指南
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-400">
            本页面将提供系统的学术文献检索方法、数据库使用技巧，以及法律英汉翻译的规范指引。
            内容正在筹备中，敬请期待。
          </p>
        </header>

        <MarkdownRenderer content={GUIDE_CONTENT} />
      </div>
    </>
  );
}
