import { ReactNode } from "react";
import Footer from "@/components/layouts/Footer";

type pageLayoutProps = {
  children: ReactNode;
};

const PageLayout = ({ children }: pageLayoutProps) => (
  <div className="min-h-dvh w-full flex flex-col">
    <main className="flex-1 w-full">{children}</main>
    <Footer />
  </div>
);

export default PageLayout;
