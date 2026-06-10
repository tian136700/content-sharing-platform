import { SITE_NAME } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-800/80 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="font-serif text-sm text-slate-500">
            © {new Date().getFullYear()} {SITE_NAME}
          </p>
          <p className="text-center text-xs text-slate-600 sm:text-right">
            非营利性法律研究与学术文献索引平台 · 内容仅供学术参考，不构成法律意见
          </p>
        </div>
      </div>
    </footer>
  );
}
