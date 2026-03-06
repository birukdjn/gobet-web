"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getPrimaryRole, saveToken } from "@/auth/auth.service";

export default function AuthCallbackPageWrapper() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // Prevent SSR from running client-only hooks

  return <AuthCallbackPage />;
}

function AuthCallbackPage() {
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    const token = params.get("token");
    if (!token) return;

    saveToken(token);
    const role = getPrimaryRole();

    if (role === "Admin") router.replace("/admin");
    else if (role === "Driver") router.replace("/driver");
    else router.replace("/passenger");
  }, [params, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-lg p-6 shadow-md text-center">
        <p className="text-gray-700">Signing you in...</p>
      </div>
    </div>
  );
}