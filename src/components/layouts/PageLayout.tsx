import { ReactNode } from "react";
import Footer from "@/components/layouts/Footer";

type pageLayoutProps = {
  children: ReactNode;
};

const PageLayout = ({ children }: pageLayoutProps) => (
  <div className="flex min-h-dvh w-full flex-col">
    <main className="w-full flex-1">{children}</main>
    <Footer />
  </div>
);

export default PageLayout;
