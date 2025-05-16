
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { AdminNav } from "./AdminNav";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <AdminNav />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
