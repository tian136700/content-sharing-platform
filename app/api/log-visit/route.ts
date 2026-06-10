import { NextRequest, NextResponse } from "next/server";
import { extractGeoFromHeaders } from "@/lib/geo";
import { generateId, saveVisitLog } from "@/lib/storage";

export const runtime = "edge";

interface LogVisitBody {
  page?: string;
  articleId?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as LogVisitBody;
    const geo = extractGeoFromHeaders(request.headers);

    const log = {
      id: generateId(),
      ip: geo.ip,
      country: geo.country,
      region: geo.region,
      city: geo.city,
      page: body.page ?? "/",
      articleId: body.articleId,
      userAgent: request.headers.get("user-agent") ?? undefined,
      timestamp: new Date().toISOString(),
    };

    await saveVisitLog(log);

    return NextResponse.json({ success: true, id: log.id });
  } catch {
    return NextResponse.json(
      { error: "Failed to log visit" },
      { status: 500 }
    );
  }
}
