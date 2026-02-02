"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import Button from "../ui/Button";
import { useDriverStore } from "@/store/useDriverStore";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const openDriverModal = useDriverStore((state) => state.openModal);

  const getDashboardLink = () => {
    if (user?.role.includes("Admin")) return "/admin";
    if (user?.role.includes("Driver")) return "/driver";
    return "/passenger";
  };

  const isOnDashboard = pathname.startsWith("/admin") ||
    pathname.startsWith("/passenger") ||
    pathname.startsWith("/driver");

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-gray-900 hover:opacity-80 transition">
          GoBet
        </Link>

        <nav className="flex items-center text-gray-600 gap-6 text-sm">
          {user ? (
            <>
              {user.role.includes("Passenger") && !user.role.includes("Driver") && (
                <Button variant="secondary" onClick={openDriverModal}>
                  Become a Driver
                </Button>
              )}

              <button
                onClick={() => {
                  logout();
                  router.push("/login");
                }}
                className="text-red-500 hover:text-red-700 font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-gray-900">Log in</Link>
              <Link href="/register" className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-black transition">
                Get started
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}