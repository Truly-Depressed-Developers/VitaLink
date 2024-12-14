import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {ThemeProvider} from "@/components/theme-provider";
import Nav from "@/components/Nav";
import {CardExample} from "@/components/CardExample";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VitaLink",
  description: "VitaLink is a platform for managing health data of your loved ones.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
      >
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <div
          className="grid grid-rows-[20px_1fr_min-content] items-center justify-items-center min-h-screen sm:p-20 font-[family-name:var(--font-geist-sans)]">
          <div>
            navbar
          </div>
          <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
            {children}

          </main>
          <Nav/>
        </div>
      </ThemeProvider>
      </body>
    </html>
  );
}
