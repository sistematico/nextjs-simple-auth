import Link from "next/link";
import Image from "next/image";
import { getCurrentUser } from "@/auth/user";
import { LogOutButton } from "@/components/auth/logout";

export async function Header() {
  const user = await getCurrentUser({ withFullUser: true });

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-foreground/10">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              className="dark:invert"
              src="/next.svg"
              alt="Logo"
              width={100}
              height={21}
              priority
            />
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="text-sm text-foreground/60">
                  Olá, {user.name || user.email}
                </span>
                {user.role === "admin" && (
                  <Link
                    href="/admin"
                    className="text-sm hover:text-foreground/80 transition-colors"
                  >
                    Admin
                  </Link>
                )}
                <LogOutButton />
              </>
            ) : (
              <>
                <Link
                  href="/entrar"
                  className="text-sm hover:text-foreground/80 transition-colors"
                >
                  Entrar
                </Link>
                <Link
                  href="/cadastro"
                  className="rounded-full bg-foreground text-background px-4 py-2 text-sm font-medium transition-colors hover:bg-foreground/90"
                >
                  Cadastrar
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
