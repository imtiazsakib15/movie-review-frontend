import type { Metadata } from "next";
import "./globals.css";
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
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-neutral-950 text-neutral-100">
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
