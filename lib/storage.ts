import "server-only";

import { getDB } from "@/lib/cloudflare";
import type {
  Article,
  FeedbackEntry,
  UploadArticlePayload,
  VisitLog,
} from "@/types";

// ---------------------------------------------------------------------------
// In-memory fallback for local development (no D1 binding)
// ---------------------------------------------------------------------------

const visitLogs: VisitLog[] = [];
const feedbackEntries: FeedbackEntry[] = [];

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function rowToArticle(row: Record<string, unknown>): Article {
  return {
    id: row.id as string,
    categoryId: row.category_id as string,
    titleZh: row.title_zh as string,
    titleEn: row.title_en as string,
    keywords: JSON.parse(row.keywords as string) as string[],
    abstract: row.abstract as string,
    introduction: row.introduction as string,
    scholarUrl: row.scholar_url as string,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  };
}

export async function getArticlesFromDB(): Promise<Article[]> {
  const db = await getDB();
  if (!db) return [];

  const { results } = await db
    .prepare("SELECT * FROM articles ORDER BY created_at ASC")
    .all<Record<string, unknown>>();

  return results.map(rowToArticle);
}

export async function getArticleByScholarUrl(
  scholarUrl: string
): Promise<Article | null> {
  const db = await getDB();
  if (!db) return null;

  const row = await db
    .prepare("SELECT * FROM articles WHERE scholar_url = ? LIMIT 1")
    .bind(scholarUrl)
    .first<Record<string, unknown>>();

  return row ? rowToArticle(row) : null;
}

// ---- Visit Logs ----

export async function saveVisitLog(log: VisitLog): Promise<void> {
  const db = await getDB();
  if (db) {
    await db
      .prepare(
        `INSERT INTO visit_logs (id, ip, country, region, city, page, article_id, user_agent, timestamp)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(
        log.id,
        log.ip,
        log.country,
        log.region,
        log.city,
        log.page,
        log.articleId ?? null,
        log.userAgent ?? null,
        log.timestamp
      )
      .run();
    return;
  }

  visitLogs.push(log);
}

// ---- Feedback ----

export async function saveFeedback(entry: FeedbackEntry): Promise<void> {
  const db = await getDB();
  if (db) {
    await db
      .prepare(
        `INSERT INTO feedback (id, email, content, ip, country, region, city, timestamp)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(
        entry.id,
        entry.email,
        entry.content,
        entry.ip,
        entry.country,
        entry.region,
        entry.city,
        entry.timestamp
      )
      .run();
    return;
  }

  feedbackEntries.push(entry);
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

  const db = await getDB();
  if (!db) {
    throw new Error("D1 database binding is not available");
  }

  await db
    .prepare(
      `INSERT INTO articles (id, category_id, title_zh, title_en, keywords, abstract, introduction, scholar_url, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .bind(
      article.id,
      article.categoryId,
      article.titleZh,
      article.titleEn,
      JSON.stringify(article.keywords),
      article.abstract,
      article.introduction,
      article.scholarUrl,
      article.createdAt,
      article.updatedAt
    )
    .run();
  return article;
}

function rowToVisitLog(row: Record<string, unknown>): VisitLog {
  return {
    id: row.id as string,
    ip: row.ip as string,
    country: row.country as string,
    region: row.region as string,
    city: row.city as string,
    page: row.page as string,
    articleId: (row.article_id as string | null) ?? undefined,
    userAgent: (row.user_agent as string | null) ?? undefined,
    timestamp: row.timestamp as string,
  };
}

function rowToFeedback(row: Record<string, unknown>): FeedbackEntry {
  return {
    id: row.id as string,
    email: row.email as string,
    content: row.content as string,
    ip: row.ip as string,
    country: row.country as string,
    region: row.region as string,
    city: row.city as string,
    timestamp: row.timestamp as string,
  };
}

const ADMIN_LIST_LIMIT = 500;

export async function getVisitLogsFromDB(
  limit = ADMIN_LIST_LIMIT
): Promise<VisitLog[]> {
  const db = await getDB();
  if (!db) {
    return [...visitLogs]
      .sort((a, b) => b.timestamp.localeCompare(a.timestamp))
      .slice(0, limit);
  }

  const { results } = await db
    .prepare("SELECT * FROM visit_logs ORDER BY timestamp DESC LIMIT ?")
    .bind(limit)
    .all<Record<string, unknown>>();

  return results.map(rowToVisitLog);
}

export async function getFeedbackFromDB(
  limit = ADMIN_LIST_LIMIT
): Promise<FeedbackEntry[]> {
  const db = await getDB();
  if (!db) {
    return [...feedbackEntries]
      .sort((a, b) => b.timestamp.localeCompare(a.timestamp))
      .slice(0, limit);
  }

  const { results } = await db
    .prepare("SELECT * FROM feedback ORDER BY timestamp DESC LIMIT ?")
    .bind(limit)
    .all<Record<string, unknown>>();

  return results.map(rowToFeedback);
}

