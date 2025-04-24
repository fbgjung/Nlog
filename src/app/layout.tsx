import type { Metadata } from "next";
import { Header } from "@/layouts/Header";
import { Footer } from "@/layouts/Footer";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
  title: "류금정 개발 블로그",
  description: "개발 지식을 공유합니다",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full scroll-my-20 scroll-smooth">
      <body className="font-pretendard min-h-screen flex flex-col">
        <Header />
        <main className="mt-[64px] flex-1">{children}</main>
        <Footer />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}
