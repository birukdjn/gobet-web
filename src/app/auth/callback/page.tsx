"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { jwtDecode } from "jwt-decode";

type JwtPayload = {
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
};

export default function AuthCallbackPage() {
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    const token = params.get("token");
    if (!token) return;

    localStorage.setItem("token", token);

    const decoded = jwtDecode<JwtPayload>(token);
    const role =
      decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    if (role === "Admin") router.replace("/admin/dashboard");
    else if (role === "Driver") router.replace("/driver/dashboard");
    else router.replace("/passenger/dashboard");
  }, []);



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-lg p-6 shadow-md text-center">
        <p className="text-gray-700">Signing you in...</p>
      </div>
    </div>
  );
}
