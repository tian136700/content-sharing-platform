import { NextRequest, NextResponse } from "next/server";
import { extractGeoFromHeaders } from "@/lib/geo";
import { generateId, saveFeedback } from "@/lib/storage";

export const runtime = "edge";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FeedbackBody {
  email?: string;
  content?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as FeedbackBody;

    if (!body.email?.trim() || !EMAIL_REGEX.test(body.email.trim())) {
      return NextResponse.json(
        { error: "请提供有效的电子邮箱地址" },
        { status: 400 }
      );
    }

    if (!body.content?.trim()) {
      return NextResponse.json(
        { error: "请填写反馈意见内容" },
        { status: 400 }
      );
    }

    const geo = extractGeoFromHeaders(request.headers);

    const entry = {
      id: generateId(),
      email: body.email.trim(),
      content: body.content.trim(),
      ip: geo.ip,
      country: geo.country,
      region: geo.region,
      city: geo.city,
      timestamp: new Date().toISOString(),
    };

    await saveFeedback(entry);

    return NextResponse.json({ success: true, id: entry.id });
  } catch {
    return NextResponse.json(
      { error: "提交失败，请稍后重试" },
      { status: 500 }
    );
  }
}
