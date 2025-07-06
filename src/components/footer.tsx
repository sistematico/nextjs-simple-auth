// src/components/layout/footer.tsx
import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-t border-foreground/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 py-3 sm:py-4 text-xs sm:text-sm">
          <Link
            className="flex items-center gap-1 sm:gap-2 hover:underline hover:underline-offset-4"
            href="https://nextjs.org/learn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/file.svg"
              alt="File icon"
              width={14}
              height={14}
              className="sm:w-4 sm:h-4"
            />
            <span className="hidden sm:inline">Learn</span>
            <span className="sm:hidden">Docs</span>
          </Link>
          <Link
            className="flex items-center gap-1 sm:gap-2 hover:underline hover:underline-offset-4"
            href="https://vercel.com/templates"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/window.svg"
              alt="Window icon"
              width={14}
              height={14}
              className="sm:w-4 sm:h-4"
            />
            Examples
          </Link>
          <Link
            className="flex items-center gap-1 sm:gap-2 hover:underline hover:underline-offset-4"
            href="https://github.com/sistematico/nextjs-simple-auth"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/globe.svg"
              alt="Globe icon"
              width={14}
              height={14}
              className="sm:w-4 sm:h-4"
            />
            <span className="hidden sm:inline">Github →</span>
            <span className="sm:hidden">Github</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}