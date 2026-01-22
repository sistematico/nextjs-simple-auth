import { NextResponse } from "next/server";
import { login } from "@/lib/session";

export async function POST(req: Request) {
  try {
    const fd = await req.formData();
    await login(fd);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("/api/login error", e);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
