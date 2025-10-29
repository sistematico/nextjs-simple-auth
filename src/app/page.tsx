"use server";

import Link from "next/link";
import Image from "next/image";
import LogOutButton from "@/components/LogOutButton";
import { getCurrentUser } from "@/lib/user";

export default async function Home() {
  const user = await getCurrentUser({ withFullUser: true });

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black sm:items-start">


        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            To get started, edit the page.tsx file.
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          {user ? (
            <>
              {user.role === "admin" && (
                <Link
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
                  href="/admin"
                >
                  <Image
                    className="dark:invert"
                    src="/vercel.svg"
                    alt="Vercel logomark"
                    width={16}
                    height={16}
                  />
                  Admin
                </Link>
              )}
              <Link
                className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/8 px-5 transition-colors hover:border-transparent hover:bg-black/4 dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
                href="/private"
              >
                Private
              </Link>
              <LogOutButton />
            </>
          ) : (
            <>
              <Link
                className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
                href="/signin"
              >
                <Image
                  className="dark:invert"
                  src="/vercel.svg"
                  alt="Vercel logomark"
                  width={16}
                  height={16}
                />
                Sign-In
              </Link>
              <Link
                className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/8 px-5 transition-colors hover:border-transparent hover:bg-black/4 dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
                href="/signup"
              >
                Sign-Up
              </Link>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
