import type { Metadata } from "next";
import "./globals.css";

import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "William Nakata Portfolio",
  description: "My personal portfolio builded with Next.js",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme")?.value || "system";
  const themeprod = theme === "dark" ? "dark" : "";
  return (
    <html lang="pt-BR" className={themeprod} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function() {
              const theme = document.cookie.split('; ').find(row => row.startsWith('theme='))?.split('=')[1] || 'system';
              if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark');
              } else {
                document.documentElement.classList.remove('dark');
              }
            })()
          `,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans+Code:ital,wght@0,300..800;1,300..800&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Red+Hat+Display:ital,wght@0,300..900;1,300..900&family=Zalando+Sans+Expanded:ital,wght@0,200..900;1,200..900&display=swap"
          rel="stylesheet"
        />
      </head>

      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
