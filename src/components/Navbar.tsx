"use client";

import Link from "next/link";
import { logout } from "@/lib/auth";

export default function Navbar() {
  return (
    <header className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between text-red-400">
        <Link href="/" className="text-xl font-semibold text-gray-900">GoBet</Link>
        <Link href="/admin/dashboard">Admin</Link> |{" "}
        <Link href="/driver/dashboard">Driver</Link> |{" "}
        <Link href="/passenger/dashboard">Passenger</Link> |{" "}
        <button onClick={logout}>Logout</button>

        <div className="flex items-center gap-4 text-sm">
          <a
            href="/login"
            className="text-gray-600 hover:text-gray-900 transition"
          >
            Log in
          </a>
          <a
            href="/register"
            className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-black transition"
          >
            Get started
          </a>
        </div>
      </div>
    </header>



  );
}
