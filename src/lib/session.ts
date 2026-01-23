import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import type { PublicUser } from "@/types";

const secret = new TextEncoder().encode(process.env.SESSION_SECRET!);

type SessionPayload = {
  user: PublicUser;
  expires: number;
};

export async function encrypt(payload: SessionPayload): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7 days")
    .sign(secret);
}

export async function decrypt(input: string): Promise<SessionPayload> {
  const { payload } = await jwtVerify(input, secret, {
    algorithms: ["HS256"],
  });
  return payload as SessionPayload;
}

export async function createSession(user: PublicUser) {
  const expires = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days
  const session = await encrypt({ user, expires });

  const cookieStore = await cookies();
  cookieStore.set("session", session, {
    secure: true,
    httpOnly: true,
    sameSite: "lax",
    expires,
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  if (!session) return null;

  try {
    return await decrypt(session);
  } catch {
    return null;
  }
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  const parsed = await decrypt(session);
  parsed.expires = Date.now() + 7 * 24 * 60 * 60 * 1000;
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: new Date(parsed.expires),
  });
  return res;
}
