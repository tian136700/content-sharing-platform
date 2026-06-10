"use client";

import { useEffect, useState } from "react";
import {
  DISCLAIMER_STORAGE_KEY,
  DISCLAIMER_EXPIRY_DAYS,
  DISCLAIMER_TEXT,
} from "@/lib/constants";

interface DisclaimerModalProps {
  page: string;
  articleId?: string;
}

function isDisclaimerAccepted(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = localStorage.getItem(DISCLAIMER_STORAGE_KEY);
    if (!raw) return false;
    const { acceptedAt } = JSON.parse(raw) as { acceptedAt: number };
    const expiryMs = DISCLAIMER_EXPIRY_DAYS * 24 * 60 * 60 * 1000;
    return Date.now() - acceptedAt < expiryMs;
  } catch {
    return false;
  }
}

async function logVisit(page: string, articleId?: string) {
  try {
    await fetch("/api/log-visit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page, articleId }),
    });
  } catch {
    // Non-blocking — visit logging should not interrupt UX
  }
}

export default function DisclaimerModal({
  page,
  articleId,
}: DisclaimerModalProps) {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!isDisclaimerAccepted()) {
      setVisible(true);
    }
  }, []);

  const handleAccept = async () => {
    localStorage.setItem(
      DISCLAIMER_STORAGE_KEY,
      JSON.stringify({ acceptedAt: Date.now() })
    );
    setVisible(false);
    await logVisit(page, articleId);
  };

  if (!mounted || !visible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="disclaimer-title"
    >
      <div className="relative mx-auto w-full max-w-2xl rounded-xl border border-amber-700/30 bg-gradient-to-b from-slate-900 to-slate-950 p-8 shadow-2xl shadow-black/50">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-900/40 ring-1 ring-amber-600/30">
            <svg
              className="h-6 w-6 text-amber-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
              />
            </svg>
          </div>
          <div>
            <h2
              id="disclaimer-title"
              className="font-serif text-xl font-semibold tracking-wide text-amber-50"
            >
              {DISCLAIMER_TEXT.title}
            </h2>
            <p className="text-sm text-slate-400">请仔细阅读以下内容</p>
          </div>
        </div>

        <div className="mb-8 space-y-4 text-base leading-relaxed text-slate-300">
          {DISCLAIMER_TEXT.body.split("\n\n").map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        <button
          type="button"
          onClick={handleAccept}
          className="w-full rounded-lg bg-gradient-to-r from-amber-700 to-amber-600 px-6 py-4 text-center text-lg font-semibold tracking-wide text-white shadow-lg shadow-amber-900/40 transition hover:from-amber-600 hover:to-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-900"
        >
          {DISCLAIMER_TEXT.button}
        </button>
      </div>
    </div>
  );
}
