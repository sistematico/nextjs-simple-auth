import Link from "next/link";
import Image from "next/image";
import { getCurrentUser } from "@/auth/user";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOutButton } from "@/components/auth/logout";

export default async function Home() {
  const fullUser = await getCurrentUser({ withFullUser: true });

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
        {fullUser ? (
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Bem-vindo, {fullUser.name}! 👋</CardTitle>
              <CardDescription>
                Você está logado como <strong>{fullUser.email}</strong>
                <br />
                <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded mt-1 inline-block">
                  Role: {fullUser.role}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex gap-2">
              <LogOutButton />
              {fullUser.role === "admin" && (
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



        {/* <div className="flex gap-4 items-center flex-col sm:flex-row">
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
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="/entrar"
          >
            Entrar
          </a>
        </div> */}

      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}

// import { LogOutButton } from "@/auth/nextjs/components/LogOutButton";
// import { getCurrentUser } from "@/auth/nextjs/currentUser";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import Link from "next/link";

// export default async function HomePage() {
//   const fullUser = await getCurrentUser({ withFullUser: true });

//   return (
//     <div className="container mx-auto p-4">
//       {fullUser == null ? (
//         <div className="flex gap-4">
//           <Button asChild>
//             <Link href="/sign-in">Sign In</Link>
//           </Button>
//           <Button asChild>
//             <Link href="/sign-up">Sign Up</Link>
//           </Button>
//         </div>
//       ) : (
//         <Card className="max-w-[500px] mt-4">
//           <CardHeader>
//             <CardTitle>User: {fullUser.name}</CardTitle>
//             <CardDescription>Role: {fullUser.role}</CardDescription>
//           </CardHeader>
//           <CardFooter className="flex gap-4">
//             <Button asChild variant="outline">
//               <Link href="/private">Private Page</Link>
//             </Button>
//             {fullUser.role === "admin" && (
//               <Button asChild variant="outline">
//                 <Link href="/admin">Admin Page</Link>
//               </Button>
//             )}
//             <LogOutButton />
//           </CardFooter>
//         </Card>
//       )}
//     </div>
//   );
// }
