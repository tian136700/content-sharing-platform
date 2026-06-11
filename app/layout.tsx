import type { Metadata } from "next";
import { Noto_Serif_SC, Source_Sans_3 } from "next/font/google";
import { SITE_NAME } from "@/lib/constants";
import { HOME_DESCRIPTION } from "@/lib/seo";
import "./globals.css";

const notoSerif = Noto_Serif_SC({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: HOME_DESCRIPTION,
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://pursuing-justice.com"
  ),
  robots: { index: true, follow: true },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL ?? "https://pursuing-justice.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${notoSerif.variable} ${sourceSans.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-slate-950 font-sans text-slate-200 antialiased">
        {children}
      </body>
    </html>
  );
}
