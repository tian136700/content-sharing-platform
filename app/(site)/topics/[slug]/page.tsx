import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleBodyText from "@/components/ArticleBodyText";
import JsonLd from "@/components/JsonLd";
import DisclaimerModal from "@/components/DisclaimerModal";
import { SITE_NAME } from "@/lib/constants";
import { getArticlesFromDB } from "@/lib/storage";
import { buildTopicMetadata, buildTopicJsonLd } from "@/lib/seo";
import { getAllTopicSlugs, getTopicBySlug } from "@/lib/topics";

export const revalidate = 3600;

type TopicPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllTopicSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: TopicPageProps): Promise<Metadata> {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);
  if (!topic) return {};
  return buildTopicMetadata(topic);
}

export default async function TopicPage({ params }: TopicPageProps) {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);
  if (!topic) notFound();

  const articles = await getArticlesFromDB();
  const relatedArticles = articles.filter(
    (article) => article.categoryId === topic.categoryId
  );

  return (
    <>
      <DisclaimerModal page={`/topics/${slug}`} />
      <JsonLd data={buildTopicJsonLd(topic)} />

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-10 border-b border-slate-800/80 pb-8">
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-amber-600/80">
            {topic.subtitle}
          </p>
          <h1 className="font-serif text-3xl font-bold text-slate-100 sm:text-4xl">
            {topic.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-400">
            {topic.description}
          </p>
        </header>

        {topic.sections.map((section) => (
          <section key={section.heading} className="mb-10">
            <h2 className="mb-4 flex items-center gap-2 font-serif text-xl font-semibold text-slate-200">
              <span className="inline-block h-5 w-1 rounded-full bg-amber-600" />
              {section.heading}
            </h2>
            <ArticleBodyText content={section.paragraphs.join("\n\n")} />
          </section>
        ))}

        <section className="mb-10 rounded-xl border border-slate-800/80 bg-slate-900/30 p-6">
          <h2 className="mb-4 font-serif text-xl font-semibold text-amber-100">
            相关文献导读
          </h2>
          {relatedArticles.length > 0 ? (
            <ul className="space-y-3">
              {relatedArticles.map((article) => (
                <li key={article.id}>
                  <Link
                    href={`/?article=${article.id}`}
                    className="text-base text-amber-300/90 transition hover:text-amber-200"
                  >
                    {article.titleZh}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-500">
              该专题文献正在整理中，请稍后回来查看。
            </p>
          )}
        </section>

        <p className="text-xs text-slate-600">
          {SITE_NAME} · 内容仅供学术参考，不构成法律意见
        </p>
      </div>
    </>
  );
}
