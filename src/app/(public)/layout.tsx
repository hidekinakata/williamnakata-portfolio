import Navbar from "@/components/Navbar";
import { AppProvider } from "@/context/AppContext";

const PublicLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <AppProvider>
      <Navbar />
      {children}
    </AppProvider>
  </>
);

export default PublicLayout;
