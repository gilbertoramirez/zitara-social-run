import { NextRequest, NextResponse } from "next/server";
import { verifyPassword, createAdminCookieValue, COOKIE_NAME } from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { password } = body;

  if (!password || !verifyPassword(password)) {
    return NextResponse.json(
      { error: "Contraseña incorrecta" },
      { status: 401 }
    );
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set(COOKIE_NAME, createAdminCookieValue(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return response;
}
