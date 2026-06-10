import { Suspense } from "react";
import AdminLoginForm from "@/components/admin/AdminLoginForm";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-xl border border-slate-800 bg-slate-900/60 p-8 shadow-xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-amber-800 to-amber-950 ring-1 ring-amber-700/40">
            <svg
              className="h-6 w-6 text-amber-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
          </div>
          <h1 className="font-serif text-2xl font-semibold text-slate-100">
            管理后台
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            请输入管理员密码以查看访问记录与用户反馈
          </p>
        </div>
        <Suspense fallback={<p className="text-center text-sm text-slate-400">加载中…</p>}>
          <AdminLoginForm />
        </Suspense>
      </div>
    </div>
  );
}
