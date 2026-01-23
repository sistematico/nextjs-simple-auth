import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import type { Cookies } from "@/types";

const secret = new TextEncoder().encode(process.env.SESSION_SECRET!);

type SessionPayload = {
  user?: {
    id?: number;
    email?: FormDataEntryValue | string | null;
    name?: string | null;
    role?: string | null;
  };
  expires?: number;
  [key: string]: unknown;
};

export async function encrypt(payload: SessionPayload): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("10 sec from now")
    .sign(secret);
}

export async function decrypt(input: string): Promise<SessionPayload> {
  const { payload } = await jwtVerify(input, secret, {
    algorithms: ["HS256"],
  });
  return payload as SessionPayload;
}

/**
 * Create and persist a session for a user.
 * Accepts either a user object or form data (for compatibility with existing API routes).
 */
export async function login(
  formDataOrUser:
    | FormData
    | {
        id?: number;
        email?: string | FormDataEntryValue | null;
        name?: string | null;
        role?: string | null;
      },
  cookieStore?: Pick<Cookies, "set">,
) {
  const cookie = cookieStore ?? cookies();

  let user: {
    id?: number;
    email?: string | null;
    name?: string | null;
    role?: string | null;
  };

  if (formDataOrUser instanceof FormData) {
    user = {
      email: (formDataOrUser.get("email") as string) ?? null,
      name: (formDataOrUser.get("name") as string) ?? null,
    };
  } else {
    // Normalize possible FormDataEntryValue to string
    const candidate = formDataOrUser as {
      id?: number;
      email?: string | FormDataEntryValue | null;
      name?: string | null;
      role?: string | null;
    };
    const rawEmail = candidate.email;
    user = {
      id: candidate.id,
      email:
        typeof rawEmail === "string"
          ? rawEmail
          : rawEmail
            ? String(rawEmail)
            : null,
      name: candidate.name ?? null,
      role: candidate.role ?? null,
    };
  }

  const expires = Date.now() + 10 * 1000;
  const session = await encrypt({ user, expires });

  // cookie can be either our Cookies type or the next/headers cookies return - narrow with a local shape
  const cookieObj = cookie as unknown as {
    set?: (
      key: string,
      value: string,
      options?: {
        secure?: boolean;
        httpOnly?: boolean;
        sameSite?: string;
        expires?: number;
      },
    ) => void;
  };
  cookieObj.set?.("session", session, {
    secure: true,
    httpOnly: true,
    sameSite: "lax",
    expires,
  });
}

export async function logout(cookieStore?: Pick<Cookies, "set">) {
  const cookie = cookieStore ?? cookies();
  const obj = cookie as unknown as {
    set?: (k: string, v: string, o?: { expires?: number }) => void;
  };
  obj.set?.("session", "", { expires: 0 });
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = cookies() as unknown as {
    get?: (key: string) => { name: string; value: string } | undefined;
  };
  const session = cookieStore.get?.("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  parsed.expires = Date.now() + 10 * 1000;
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: new Date(parsed.expires),
  });
  return res;
}
