import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WH - Kirby Admin",
  description: "My personal portfolio builded with Next.js",
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
