import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "./lib/session";

export async function proxy(request: NextRequest) {
  try {
    const res = await updateSession(request);
    if (res) return res;
    return NextResponse.next();
  } catch (err) {
    console.error(
      "Middleware: failed to update session, clearing cookie:",
      err,
    );
    const res = NextResponse.next();
    res.cookies.set({
      name: "session",
      value: "",
      expires: new Date(0),
      httpOnly: true,
    });
    return res;
  }
}
