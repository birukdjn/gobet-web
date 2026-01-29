"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

type DriverRequest = {
  userId: string;
  email?: string;
  fullName?: string;
  licenseNumber: string;
  createdAt?: string;
};

export default function AdminDashboard() {
  const router = useRouter();
  const [requests, setRequests] = useState<DriverRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [approvingId, setApprovingId] = useState<string | null>(null);

  // 🔐 Protect route
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");
  }, [router]);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      const res = await api.get("/admin/pending-drivers");
      setRequests(res.data);
    } catch {
      alert("Failed to load driver requests");
    } finally {
      setLoading(false);
    }
  };

  const approveDriver = async (userId: string) => {
    try {
      setApprovingId(userId);
      await api.post(`/admin/approve-driver/${userId}`);
      setRequests((prev) => prev.filter((r) => r.userId !== userId));
    } catch {
      alert("Failed to approve driver");
    } finally {
      setApprovingId(null);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-lg font-semibold text-gray-900">
            Admin Dashboard
          </h1>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              router.push("/login");
            }}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Logout
          </button>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="bg-white border rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b">
            <h2 className="text-base font-semibold text-gray-900">
              Pending Driver Requests
            </h2>
          </div>

          {loading ? (
            <div className="p-6 text-sm text-gray-500">Loading...</div>
          ) : requests.length === 0 ? (
            <div className="p-6 text-sm text-gray-500">
              No pending requests 🎉
            </div>
          ) : (
            <div className="divide-y">
              {requests.map((r) => (
                <div
                  key={r.userId}
                  className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-6 py-4"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-900">
                      {r.fullName || "Unknown User"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {r.email || r.userId}
                    </p>
                    <p className="text-xs text-gray-500">
                      License: {r.licenseNumber}
                    </p>
                  </div>

                  <button
                    onClick={() => approveDriver(r.userId)}
                    disabled={approvingId === r.userId}
                    className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-black transition disabled:opacity-60"
                  >
                    {approvingId === r.userId ? "Approving..." : "Approve"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
