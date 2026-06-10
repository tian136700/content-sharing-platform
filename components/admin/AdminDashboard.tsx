"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import clsx from "clsx";
import type { FeedbackEntry, VisitLog } from "@/types";

type Tab = "visits" | "feedback";

interface AdminDashboardProps {
  visits: VisitLog[];
  feedback: FeedbackEntry[];
  articleTitles: Record<string, string>;
}

const PAGE_LABELS: Record<string, string> = {
  "/": "文献导读",
  "/guide": "检索与翻译指南",
  "/about": "关于与反馈",
};

function formatTime(timestamp: string) {
  try {
    return new Intl.DateTimeFormat("zh-CN", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(timestamp));
  } catch {
    return timestamp;
  }
}

function formatLocation(country: string, region: string, city: string) {
  const parts = [country, region, city].filter(
    (part) => part && part !== "unknown" && part !== "Unknown"
  );
  return parts.length > 0 ? parts.join(" · ") : "—";
}

function resolveVisitContent(
  visit: VisitLog,
  articleTitles: Record<string, string>
) {
  if (visit.articleId) {
    const title = articleTitles[visit.articleId];
    return title ? `文章：${title}` : `文章 ID：${visit.articleId}`;
  }

  return PAGE_LABELS[visit.page] ?? visit.page;
}

export default function AdminDashboard({
  visits,
  feedback,
  articleTitles,
}: AdminDashboardProps) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("visits");
  const [query, setQuery] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);

  const normalizedQuery = query.trim().toLowerCase();

  const filteredVisits = useMemo(() => {
    if (!normalizedQuery) return visits;

    return visits.filter((visit) => {
      const haystack = [
        visit.ip,
        visit.page,
        visit.articleId ?? "",
        articleTitles[visit.articleId ?? ""] ?? "",
        visit.country,
        visit.region,
        visit.city,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalizedQuery);
    });
  }, [visits, normalizedQuery, articleTitles]);

  const filteredFeedback = useMemo(() => {
    if (!normalizedQuery) return feedback;

    return feedback.filter((entry) => {
      const haystack = [
        entry.ip,
        entry.email,
        entry.content,
        entry.country,
        entry.region,
        entry.city,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalizedQuery);
    });
  }, [feedback, normalizedQuery]);

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } finally {
      setLoggingOut(false);
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-2xl font-semibold text-slate-100">
            管理后台
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            查看访客 IP、浏览内容与用户反馈提交记录
          </p>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut}
          className="self-start rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:border-slate-600 hover:text-slate-100 disabled:opacity-60"
        >
          {loggingOut ? "退出中…" : "退出登录"}
        </button>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
          <p className="text-sm text-slate-400">访问记录</p>
          <p className="mt-1 text-3xl font-semibold text-amber-300">
            {visits.length}
          </p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
          <p className="text-sm text-slate-400">反馈提交</p>
          <p className="mt-1 text-3xl font-semibold text-amber-300">
            {feedback.length}
          </p>
        </div>
      </div>

      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="inline-flex rounded-lg border border-slate-800 bg-slate-900/50 p-1">
          <button
            type="button"
            onClick={() => setTab("visits")}
            className={clsx(
              "rounded-md px-4 py-2 text-sm font-medium transition",
              tab === "visits"
                ? "bg-amber-800 text-amber-50"
                : "text-slate-400 hover:text-slate-200"
            )}
          >
            访问记录
          </button>
          <button
            type="button"
            onClick={() => setTab("feedback")}
            className={clsx(
              "rounded-md px-4 py-2 text-sm font-medium transition",
              tab === "feedback"
                ? "bg-amber-800 text-amber-50"
                : "text-slate-400 hover:text-slate-200"
            )}
          >
            反馈记录
          </button>
        </div>

        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="搜索 IP、邮箱、内容…"
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-sm text-slate-100 outline-none transition focus:border-amber-700 focus:ring-2 focus:ring-amber-700/30 sm:max-w-xs"
        />
      </div>

      {tab === "visits" ? (
        <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/40">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-slate-800 bg-slate-900/80 text-slate-400">
                <tr>
                  <th className="px-4 py-3 font-medium">时间</th>
                  <th className="px-4 py-3 font-medium">IP</th>
                  <th className="px-4 py-3 font-medium">地区</th>
                  <th className="px-4 py-3 font-medium">访问内容</th>
                </tr>
              </thead>
              <tbody>
                {filteredVisits.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-4 py-10 text-center text-slate-500"
                    >
                      暂无访问记录
                    </td>
                  </tr>
                ) : (
                  filteredVisits.map((visit) => (
                    <tr
                      key={visit.id}
                      className="border-b border-slate-800/80 last:border-b-0"
                    >
                      <td className="whitespace-nowrap px-4 py-3 text-slate-300">
                        {formatTime(visit.timestamp)}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 font-mono text-slate-200">
                        {visit.ip}
                      </td>
                      <td className="px-4 py-3 text-slate-400">
                        {formatLocation(
                          visit.country,
                          visit.region,
                          visit.city
                        )}
                      </td>
                      <td className="px-4 py-3 text-slate-200">
                        {resolveVisitContent(visit, articleTitles)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/40">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-slate-800 bg-slate-900/80 text-slate-400">
                <tr>
                  <th className="px-4 py-3 font-medium">时间</th>
                  <th className="px-4 py-3 font-medium">IP</th>
                  <th className="px-4 py-3 font-medium">地区</th>
                  <th className="px-4 py-3 font-medium">邮箱</th>
                  <th className="px-4 py-3 font-medium">反馈内容</th>
                </tr>
              </thead>
              <tbody>
                {filteredFeedback.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-10 text-center text-slate-500"
                    >
                      暂无反馈记录
                    </td>
                  </tr>
                ) : (
                  filteredFeedback.map((entry) => (
                    <tr
                      key={entry.id}
                      className="border-b border-slate-800/80 last:border-b-0"
                    >
                      <td className="whitespace-nowrap px-4 py-3 text-slate-300">
                        {formatTime(entry.timestamp)}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 font-mono text-slate-200">
                        {entry.ip}
                      </td>
                      <td className="px-4 py-3 text-slate-400">
                        {formatLocation(
                          entry.country,
                          entry.region,
                          entry.city
                        )}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-slate-200">
                        {entry.email}
                      </td>
                      <td className="max-w-md px-4 py-3 text-slate-300">
                        <p className="whitespace-pre-wrap break-words">
                          {entry.content}
                        </p>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <p className="mt-4 text-xs text-slate-500">
        最多显示最近 500 条记录。部署后请在 Cloudflare 环境变量中修改默认密码。
      </p>
    </div>
  );
}
