import { NextResponse } from "next/server";
import { getArticlesFromDB } from "@/lib/storage";

export const runtime = "edge";

export async function GET() {
  try {
    const articles = await getArticlesFromDB();
    return NextResponse.json({ articles });
  } catch (error) {
    console.error("Failed to load articles:", error);
    return NextResponse.json(
      { error: "Failed to load articles" },
      { status: 500 }
    );
  }
}
