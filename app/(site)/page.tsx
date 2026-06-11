import type { Metadata } from "next";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/constants";
import ResearchLibrary from "@/components/ResearchLibrary";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: `${SITE_NAME} | 文献导读`,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: `${SITE_NAME} | 文献导读`,
    description: SITE_DESCRIPTION,
    type: "website",
  },
};

export default function Home() {
  return <ResearchLibrary articles={[]} />;
}
