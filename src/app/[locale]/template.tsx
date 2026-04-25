"use client";

import PageTransition from "@/components/layouts/PageTransition";

export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
