import { Nunito, Geist_Mono } from "next/font/google";
import { HeaderWrapper } from "@/components/header-wrapper";
import { Footer } from "@/components/footer";
import type { Metadata } from "next";
import "@/styles/globals.css";

const nunito = Nunito({
  variable: "--font-nunito-sans",
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
        className={`${nunito.variable} ${geistMono.variable} antialiased`}
      >
        <HeaderWrapper />
        {children}
        <Footer />
      </body>
    </html>
  );
}
