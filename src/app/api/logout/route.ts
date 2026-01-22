import { NextResponse } from "next/server";
import { logout } from "@/lib/session";

export async function POST() {
  try {
    await logout();
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("/api/logout error", e);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
