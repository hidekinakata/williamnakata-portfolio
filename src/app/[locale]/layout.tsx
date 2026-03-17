import type { Metadata } from "next";

import { cookies } from "next/headers";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Navbar from "@/components/layouts/Navbar";
import { AppProvider } from "@/context/AppContext";
import { routing } from "@/i18n/routing";

export const metadata: Metadata = {
  title: "William Nakata Portfolio",
  description: "My personal portfolio builded with Next.js",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme")?.value || "system";
  const themeprod = theme === "dark" ? "dark" : "";
  const messages = await getMessages();

  return (
    <html lang={locale} className={themeprod} suppressHydrationWarning>
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
      </head>

      <body className={`antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <AppProvider>
            <Navbar />
            {children}
          </AppProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
