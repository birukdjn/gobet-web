import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DriverRequestModal from "@/components/modals/DriverRequestModal";
import { AuthProvider } from "@/auth/AuthProvider";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <AuthProvider>
          <Navbar />
          <div className="flex-grow">
            {children}
          </div>
          <Footer />
          <DriverRequestModal />
        </AuthProvider>
      </body>
    </html>
  );
}