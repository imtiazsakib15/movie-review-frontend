import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "@/providers/query-provider";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Movie Review Portal",
  description: "Reviews for movies and series.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <body className="flex min-h-screen flex-col bg-neutral-950 text-neutral-100">
        <QueryProvider>
          <main className="flex-1">{children}</main>
        </QueryProvider>

        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
