import { NextRequest, NextResponse } from "next/server";
import {
  createSessionToken,
  sessionCookieOptions,
  validateAdminPassword,
} from "@/lib/admin-session";

export const runtime = "edge";

interface LoginBody {
  password?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as LoginBody;
    const password = body.password?.trim();

    if (!password) {
      return NextResponse.json({ error: "请输入密码" }, { status: 400 });
    }

    if (!validateAdminPassword(password)) {
      return NextResponse.json({ error: "密码错误" }, { status: 401 });
    }

    const token = await createSessionToken();
    if (!token) {
      return NextResponse.json(
        { error: "服务器未配置管理员密钥，请联系维护人员" },
        { status: 500 }
      );
    }

    const response = NextResponse.json({ success: true });
    const cookie = sessionCookieOptions(token);
    response.cookies.set(cookie);
    return response;
  } catch {
    return NextResponse.json({ error: "登录失败" }, { status: 500 });
  }
}
