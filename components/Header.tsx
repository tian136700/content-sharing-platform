"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";
import { NAV_LINKS, SITE_NAME } from "@/lib/constants";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-amber-800 to-amber-950 ring-1 ring-amber-700/40">
            <svg
              className="h-5 w-5 text-amber-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"
              />
            </svg>
          </div>
          <div>
            <p className="font-serif text-lg font-semibold leading-tight text-slate-100 group-hover:text-amber-100">
              {SITE_NAME}
            </p>
            <p className="hidden text-xs text-slate-500 sm:block">
              学术文献索引 · 普法导读
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={clsx(
                "rounded-md px-4 py-2 text-sm font-medium transition",
                pathname === href
                  ? "bg-amber-900/30 text-amber-200"
                  : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
              )}
            >
              {label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="rounded-md p-2 text-slate-400 hover:bg-slate-800 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="打开菜单"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <nav className="border-t border-slate-800 px-4 py-3 md:hidden">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={clsx(
                "block rounded-md px-3 py-2.5 text-sm font-medium",
                pathname === href
                  ? "bg-amber-900/30 text-amber-200"
                  : "text-slate-400"
              )}
            >
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
