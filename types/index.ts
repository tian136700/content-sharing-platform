export interface Article {
  id: string;
  categoryId: string;
  titleZh: string;
  titleEn: string;
  keywords: string[];
  abstract: string;
  introduction: string;
  scholarUrl: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
}

export interface VisitLog {
  id: string;
  ip: string;
  country: string;
  region: string;
  city: string;
  page: string;
  articleId?: string;
  userAgent?: string;
  timestamp: string;
}

export interface FeedbackEntry {
  id: string;
  email: string;
  content: string;
  ip: string;
  country: string;
  region: string;
  city: string;
  timestamp: string;
}

export interface GeoInfo {
  ip: string;
  country: string;
  region: string;
  city: string;
}

export interface UploadArticlePayload {
  titleZh: string;
  titleEn: string;
  categoryId: string;
  keywords: string[];
  abstract: string;
  introduction: string;
  scholarUrl: string;
}
