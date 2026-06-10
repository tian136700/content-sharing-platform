import { NextRequest, NextResponse } from "next/server";
import { validateApiKey } from "@/lib/auth";
import { insertArticle } from "@/lib/storage";
import type { UploadArticlePayload } from "@/types";

export const runtime = "edge";

function validatePayload(body: unknown): body is UploadArticlePayload {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;

  return (
    typeof b.titleZh === "string" &&
    b.titleZh.trim().length > 0 &&
    typeof b.titleEn === "string" &&
    b.titleEn.trim().length > 0 &&
    typeof b.categoryId === "string" &&
    b.categoryId.trim().length > 0 &&
    Array.isArray(b.keywords) &&
    b.keywords.every((k) => typeof k === "string") &&
    typeof b.abstract === "string" &&
    b.abstract.trim().length > 0 &&
    typeof b.introduction === "string" &&
    b.introduction.trim().length > 0 &&
    typeof b.scholarUrl === "string" &&
    b.scholarUrl.trim().length > 0
  );
}

export async function POST(request: NextRequest) {
  if (!validateApiKey(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body: unknown = await request.json();

    if (!validatePayload(body)) {
      return NextResponse.json(
        {
          error: "Invalid payload",
          required: [
            "titleZh",
            "titleEn",
            "categoryId",
            "keywords",
            "abstract",
            "introduction",
            "scholarUrl",
          ],
        },
        { status: 400 }
      );
    }

    const article = await insertArticle({
      titleZh: body.titleZh.trim(),
      titleEn: body.titleEn.trim(),
      categoryId: body.categoryId.trim(),
      keywords: body.keywords.map((k) => k.trim()).filter(Boolean),
      abstract: body.abstract.trim(),
      introduction: body.introduction.trim(),
      scholarUrl: body.scholarUrl.trim(),
    });

    return NextResponse.json({ success: true, article }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to upload article" },
      { status: 500 }
    );
  }
}
