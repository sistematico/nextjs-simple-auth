import { NextRequest, NextResponse } from "next/server";
import { getSession, updateSession } from "./lib/session";

const privateRoutes = ["/dashboard"];

export async function proxy(request: NextRequest) {
  if (privateRoutes.includes(request.nextUrl.pathname)) {
    const user = await getSession();
    if (!user) return NextResponse.redirect(new URL("/login", request.url));
  }

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
