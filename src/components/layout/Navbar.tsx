"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { getUserFromToken, logout } from "@/types/auth";

export default function Navbar() {
  const router = useRouter();
  const user = getUserFromToken();

  return (
    <header className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-semibold text-gray-900">
          GoBet
        </Link>

        <nav className="flex items-center gap-6 text-sm">
          {user && (
            <>
              {user.roles.includes("Admin") && (
                <Link href="/admin/dashboard" className="hover:text-gray-900">
                  Admin
                </Link>
              )}
              {user.roles.includes("Driver") && (
                <Link href="/driver/dashboard" className="hover:text-gray-900">
                  Driver
                </Link>
              )}
              {user.roles.includes("Passenger") && (
                <Link
                  href="/passenger/dashboard"
                  className="hover:text-gray-900"
                >
                  Passenger
                </Link>
              )}
            </>
          )}

          {!user ? (
            <>
              <Link href="/login" className="text-gray-600 hover:text-gray-900">
                Log in
              </Link>
              <Link
                href="/register"
                className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-black transition"
              >
                Get started
              </Link>
            </>
          ) : (
            <button
              onClick={() => {
                logout();
                router.push("/login");
              }}
              className="text-gray-600 hover:text-gray-900"
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
