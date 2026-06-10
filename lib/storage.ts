import type {
  Article,
  FeedbackEntry,
  UploadArticlePayload,
  VisitLog,
} from "@/types";

// ---------------------------------------------------------------------------
// Mock in-memory storage (development / placeholder)
// Replace with Cloudflare KV or D1 in production — see TODO blocks below.
// ---------------------------------------------------------------------------

const visitLogs: VisitLog[] = [];
const feedbackEntries: FeedbackEntry[] = [];
let articlesStore: Article[] = [];

export function initArticlesStore(articles: Article[]) {
  articlesStore = [...articles];
}

export function getArticles(): Article[] {
  return [...articlesStore];
}

export function getArticleById(id: string): Article | undefined {
  return articlesStore.find((a) => a.id === id);
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

// ---- Visit Logs ----

export async function saveVisitLog(log: VisitLog): Promise<void> {
  visitLogs.push(log);

  // TODO: Cloudflare KV
  // const kv = getCloudflareKV();
  // await kv.put(`visit:${log.id}`, JSON.stringify(log));
  // await kv.put(`visit:idx:${log.timestamp}`, log.id);

  // TODO: Cloudflare D1
  // await env.DB.prepare(
  //   `INSERT INTO visit_logs (id, ip, country, region, city, page, article_id, user_agent, timestamp)
  //    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
  // ).bind(log.id, log.ip, log.country, log.region, log.city, log.page, log.articleId ?? null, log.userAgent ?? null, log.timestamp).run();
}

// ---- Feedback ----

export async function saveFeedback(entry: FeedbackEntry): Promise<void> {
  feedbackEntries.push(entry);

  // TODO: Cloudflare KV / D1 — same pattern as visit logs
}

// ---- Articles ----

export async function insertArticle(
  payload: UploadArticlePayload
): Promise<Article> {
  const article: Article = {
    id: generateId(),
    ...payload,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  articlesStore.push(article);

  // TODO: Cloudflare KV
  // const kv = getCloudflareKV();
  // await kv.put(`article:${article.id}`, JSON.stringify(article));
  // await kv.put(`article:idx:${article.categoryId}:${article.id}`, article.id);

  // TODO: Cloudflare D1
  // await env.DB.prepare(
  //   `INSERT INTO articles (id, category_id, title_zh, title_en, keywords, abstract, introduction, scholar_url, created_at, updated_at)
  //    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  // ).bind(...).run();

  return article;
}

/** Debug helper — only for development */
export function getMockStats() {
  return {
    visitCount: visitLogs.length,
    feedbackCount: feedbackEntries.length,
    articleCount: articlesStore.length,
  };
}
