import Link from "next/link";
import Image from "next/image";
import { getCurrentUser } from "@/auth/user";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOutButton } from "@/components/auth/logout";

export default async function Home() {
  const user = await getCurrentUser({ withFullUser: true });

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2 tracking-[-.01em]">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
              src/app/page.tsx
            </code>
            .
          </li>
          <li className="tracking-[-.01em]">
            Save and see your changes instantly.
          </li>
        </ol>

        {/* Mostrar estado de autenticação */}
        {user ? (
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Bem-vindo, {user.name}! 👋</CardTitle>
              <CardDescription>
                Você está logado como <strong>{user.email}</strong>
                <br />
                <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded mt-1 inline-block">
                  Role: {user.role}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex gap-2">
              <LogOutButton />
              {user.role === "admin" && (
                // <Button asChild variant="secondary">
                  <Link href="/admin">Admin Panel</Link>
                // </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="text-center">
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              Você não está logado
            </p>
            <div className="flex gap-4 items-center flex-col sm:flex-row">
              <Link
                className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
                href="/cadastro"
              >
                <Image
                  className="dark:invert"
                  src="/vercel.svg"
                  alt="Vercel logomark"
                  width={20}
                  height={20}
                />
                Cadastro
              </Link>
              <Link
                className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
                href="/entrar"
              >
                Entrar
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}