import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky z-50 bg-background top-0 p-4">
      <div className="container mx-auto">
        <Link href="/">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={100}
            height={20}
            priority
          />
        </Link>
      </div>
    </header>
  );
}
