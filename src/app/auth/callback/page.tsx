"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [message, setMessage] = useState("Processing login...");

  useEffect(() => {
    const token = searchParams.get("token");
    const error = searchParams.get("error");

    if (error) {
      setMessage(`Login failed: ${error}`);
      return;
    }

    if (token) {
      // Save token in localStorage or cookie
      localStorage.setItem("token", token);

      // Redirect to dashboard
      router.replace("/passenger/dashboard");
    } else {
      setMessage("No token found. Login failed.");
    }
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-lg p-6 shadow-md text-center">
        <p className="text-gray-700">{message}</p>
      </div>
    </div>
  );
}
