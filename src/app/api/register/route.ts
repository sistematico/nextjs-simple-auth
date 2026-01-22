import { NextResponse } from "next/server";
import { login } from "@/lib/session";

export async function POST(req: Request) {
  try {
    // For demo purposes, registration just logs the user in
    const fd = await req.formData();
    await login(fd);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("/api/register error", e);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
