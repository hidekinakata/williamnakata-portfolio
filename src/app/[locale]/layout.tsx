import type { Metadata } from "next";

import { cookies } from "next/headers";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Navbar from "@/components/layouts/Navbar";
import Grainient from "@/components/effects/Grainient";
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

        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
      </head>

      <body className={`antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <AppProvider>
            <Grainient
              color1="#070615"
              color2="#16112c"
              color3="#6951B2"
              timeSpeed={0.1}
              colorBalance={0}
              warpStrength={2.75}
              warpFrequency={7.8}
              warpSpeed={5.8}
              warpAmplitude={27}
              blendAngle={0}
              blendSoftness={0.34}
              rotationAmount={1020}
              noiseScale={1.95}
              grainAmount={0.1}
              grainScale={2}
              grainAnimated={false}
              contrast={1.5}
              gamma={1}
              saturation={1}
              centerX={0}
              centerY={0}
              zoom={2.2}
            />
            <Navbar />
            {children}
          </AppProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
