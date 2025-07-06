import { Geist, Geist_Mono } from "next/font/google";
// import { Header } from "@/components/header";
import { HeaderWrapper } from "@/components/header-wrapper";
import { Footer } from "@/components/footer";
import type { Metadata } from "next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js Simple Auth",
  description: "Simple authentication example with Next.js and Drizzle ORM",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <HeaderWrapper />
        {children}
        <Footer />
      </body>
    </html>
  );
}
