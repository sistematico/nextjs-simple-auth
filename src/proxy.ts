import { NextResponse, NextRequest } from "next/server";
import { getUserFromSession, updateUserSessionExpiration } from "@/lib/session";

const privateRoutes = ["/private"];
const adminRoutes = ["/admin"];

export async function proxy(request: NextRequest) {
  const response = (await middlewareAuth(request)) ?? NextResponse.next();

  await updateUserSessionExpiration({
    set: (key, value, options) =>
      response.cookies.set({ ...options, name: key, value }),
    get: (key) => request.cookies.get(key),
    delete: (key) => response.cookies.delete(key),
  });

  return response;
}

async function middlewareAuth(request: NextRequest) {
  if (privateRoutes.includes(request.nextUrl.pathname)) {
    const user = await getUserFromSession(request.cookies);
    if (!user) return NextResponse.redirect(new URL("/signin", request.url));
  }

  if (adminRoutes.includes(request.nextUrl.pathname)) {
    const user = await getUserFromSession(request.cookies);
    if (!user) return NextResponse.redirect(new URL("/signin", request.url));
    if (user.role !== "admin")return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|webm|mp4|mp3|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
