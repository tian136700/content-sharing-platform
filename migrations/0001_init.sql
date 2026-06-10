CREATE TABLE IF NOT EXISTS articles (
  id TEXT PRIMARY KEY,
  category_id TEXT NOT NULL,
  title_zh TEXT NOT NULL,
  title_en TEXT NOT NULL,
  keywords TEXT NOT NULL,
  abstract TEXT NOT NULL,
  introduction TEXT NOT NULL,
  scholar_url TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS feedback (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  content TEXT NOT NULL,
  ip TEXT NOT NULL,
  country TEXT NOT NULL,
  region TEXT NOT NULL,
  city TEXT NOT NULL,
  timestamp TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS visit_logs (
  id TEXT PRIMARY KEY,
  ip TEXT NOT NULL,
  country TEXT NOT NULL,
  region TEXT NOT NULL,
  city TEXT NOT NULL,
  page TEXT NOT NULL,
  article_id TEXT,
  user_agent TEXT,
  timestamp TEXT NOT NULL
);
