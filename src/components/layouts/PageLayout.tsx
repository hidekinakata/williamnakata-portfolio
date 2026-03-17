import { ReactNode } from "react";
import Footer from "@/components/layouts/Footer";

type pageLayoutProps = {
  children: ReactNode;
};

const PageLayout = ({ children }: pageLayoutProps) => (
  <div className="min-h-dvh w-full flex flex-col items-center justify-center">
    <div className="flex-1">{children}</div>
    <Footer />
  </div>
);

export default PageLayout;
