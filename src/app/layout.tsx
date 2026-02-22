import type { Metadata } from "next";
import {Bodoni_Moda, Geist, Geist_Mono, Google_Sans_Code, Zalando_Sans_SemiExpanded} from "next/font/google";
import "./globals.css";

const fontSans = Zalando_Sans_SemiExpanded({
  variable: "--font-sans",
  subsets: ["latin"],
})

const fontSerif = Bodoni_Moda({
  variable: "--font-serif",
  subsets: ["latin"],
})

const fontMono = Google_Sans_Code({
  variable: "--font-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "William Nakata Portfolio",
  description: "My personal portfolio builded with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fontSans.variable} ${fontSerif.variable} ${fontMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
