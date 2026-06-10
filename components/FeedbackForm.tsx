"use client";

import { useState, type FormEvent } from "react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function FeedbackForm() {
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [emailError, setEmailError] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const validateEmail = (value: string) => {
    if (!value.trim()) {
      return "请输入电子邮箱";
    }
    if (!EMAIL_REGEX.test(value.trim())) {
      return "请输入有效的电子邮箱地址";
    }
    return "";
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const emailErr = validateEmail(email);
    if (emailErr) {
      setEmailError(emailErr);
      return;
    }
    setEmailError("");

    if (!content.trim()) {
      setErrorMessage("请输入反馈意见内容");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), content: content.trim() }),
      });

      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        throw new Error(data.error ?? "提交失败，请稍后重试");
      }

      setStatus("success");
      setEmail("");
      setContent("");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "提交失败，请稍后重试");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-xl border border-emerald-800/40 bg-emerald-950/30 p-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-900/40">
          <svg
            className="h-7 w-7 text-emerald-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-serif text-xl font-semibold text-emerald-100">
          感谢您的反馈
        </h3>
        <p className="mt-2 text-sm text-emerald-300/80">
          我们已收到您的意见，将认真研读并用于改进平台。
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm text-emerald-400 underline-offset-2 hover:underline"
        >
          继续提交反馈
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div>
        <label
          htmlFor="feedback-email"
          className="mb-2 block text-sm font-medium text-slate-300"
        >
          电子邮箱
        </label>
        <input
          id="feedback-email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (emailError) setEmailError(validateEmail(e.target.value));
          }}
          onBlur={() => setEmailError(validateEmail(email))}
          placeholder="your@email.com"
          className="w-full rounded-lg border border-slate-700/80 bg-slate-900/80 px-4 py-3 text-sm text-slate-200 placeholder:text-slate-600 focus:border-amber-700/60 focus:outline-none focus:ring-1 focus:ring-amber-700/40"
          aria-invalid={!!emailError}
          aria-describedby={emailError ? "email-error" : undefined}
        />
        {emailError && (
          <p id="email-error" className="mt-1.5 text-sm text-red-400">
            {emailError}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="feedback-content"
          className="mb-2 block text-sm font-medium text-slate-300"
        >
          反馈意见
        </label>
        <textarea
          id="feedback-content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
          placeholder="请分享您对平台的建议、发现的错误或希望增加的文献方向…"
          className="w-full resize-y rounded-lg border border-slate-700/80 bg-slate-900/80 px-4 py-3 text-sm text-slate-200 placeholder:text-slate-600 focus:border-amber-700/60 focus:outline-none focus:ring-1 focus:ring-amber-700/40"
        />
      </div>

      {status === "error" && errorMessage && (
        <p className="text-sm text-red-400">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-lg bg-gradient-to-r from-amber-800 to-amber-700 px-6 py-3.5 text-sm font-semibold text-white transition hover:from-amber-700 hover:to-amber-600 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "loading" ? "提交中…" : "提交反馈"}
      </button>
    </form>
  );
}
