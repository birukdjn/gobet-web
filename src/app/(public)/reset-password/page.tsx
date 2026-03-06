"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";
import { useRouter, useSearchParams } from "next/navigation";

export default function ResetPasswordPageWrapper() {
  const [isClient, setIsClient] = useState(false);

  // Ensure this runs only on the client
  useEffect(() => setIsClient(true), []);

  if (!isClient) return null; // Avoid SSR rendering

  return <ResetPasswordPage />;
}

function ResetPasswordPage() {
  const router = useRouter();
  const params = useSearchParams();

  const [form, setForm] = useState({
    email: params.get("email") || "",
    token: params.get("token") || "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const submit = async () => {
    setError("");
    setSuccess("");

    if (form.newPassword !== form.confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      setLoading(true);
      await api.post("/Auth/reset-password", form);
      setSuccess("Password reset successfully. Redirecting...");
      setTimeout(() => router.push("/login"), 1500);
    } catch (err: any) {
      setError(err.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white border rounded-xl shadow-sm p-8">
        <h1 className="text-2xl font-semibold text-gray-900 text-center mb-1">
          Reset password
        </h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          Enter your new password
        </p>

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 text-sm text-green-700 bg-green-50 border border-green-200 rounded-md px-3 py-2">
            {success}
          </div>
        )}

        <div className="space-y-4">
          <input
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border rounded-md px-3 py-3 text-sm focus:ring-2 focus:ring-gray-900 focus:outline-none"
          />

          <input
            placeholder="Reset token"
            value={form.token}
            onChange={(e) => setForm({ ...form, token: e.target.value })}
            className="w-full border rounded-md px-3 py-3 text-sm focus:ring-2 focus:ring-gray-900 focus:outline-none"
          />

          <input
            type="password"
            placeholder="New password"
            value={form.newPassword}
            onChange={(e) =>
              setForm({ ...form, newPassword: e.target.value })
            }
            className="w-full border rounded-md px-3 py-3 text-sm focus:ring-2 focus:ring-gray-900 focus:outline-none"
          />

          <input
            type="password"
            placeholder="Confirm password"
            value={form.confirmPassword}
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
            className="w-full border rounded-md px-3 py-3 text-sm focus:ring-2 focus:ring-gray-900 focus:outline-none"
          />
        </div>

        <button
          onClick={submit}
          disabled={loading}
          className="w-full mt-5 bg-gray-900 text-white rounded-md py-3 text-sm font-semibold hover:bg-black transition disabled:opacity-60"
        >
          {loading ? "Resetting..." : "Reset password"}
        </button>
      </div>
    </div>
  );
}