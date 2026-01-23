import Image from "next/image";
import { AuthProvider } from "@/components/AuthProvider";
import Navbar from "@/components/Navbar";
import { getSession } from "@/lib/session";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next.js Simple Auth",
  description:
    "A simple authentication example using Next.js and React Context",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  const user = session?.user ?? null;

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/nextjs_logo_icon.svg" type="image/xml+svg" sizes="any" />
      </head>
      <body>
        <AuthProvider user={user}>
          <div className="flex flex-col min-h-screen">
            <header className="sticky z-50 bg-gray-300 top-0 p-4">
              <div className="md:flex md:items-center md:justify-between md:gap-2">
                <Image
                  src="/nextjs.svg"
                  alt="Next.js Simple Auth"
                  width={48}
                  height={48}
                  className="h-10 w-auto"
                />
                <Navbar />
              </div>
            </header>
            <main className="flex-1 container mx-auto mt-8 px-4">
              {children}
            </main>
            <footer className="sticky z-50 bg-gray-300 bottom-0 p-4">
              Exemplo de autenticação simples com Next.js e React Context.
              <br />
              Criado por Lucas Saliés Brum
            </footer>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
