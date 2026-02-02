"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";

type Trip = {
  id: string;
  destination: string;
  availableSeats: number;
  totalSeats: number;
  status: string;
  departureTime?: string;
};

export default function DriverDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [activeTrip, setActiveTrip] = useState<Trip | null>(null);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    destination: "",
    totalSeats: 40,
    routeId: "",
    busPlateNumber: "",
  });

  // 🔐 Protect route
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");
  }, [router]);

  // 🔍 Load active trip (if any)
  useEffect(() => {
    loadActiveTrip();
  }, []);

  const loadActiveTrip = async () => {
    try {
      const res = await api.get("/driver/my-active-trip");
      setActiveTrip(res.data);
    } catch {
      setActiveTrip(null);
    }
  };

  // 📍 Live location update every 10 seconds
  useEffect(() => {
    if (!activeTrip) return;

    const interval = setInterval(() => {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        await api.put(`/Trips/${activeTrip.id}/location`, {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      });
    }, 10000);

    return () => clearInterval(interval);
  }, [activeTrip]);

  const createTrip = async () => {
    try {
      setCreating(true);
      setError("");
      const res = await api.post("/Trips", form);
      setActiveTrip(res.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create trip");
    } finally {
      setCreating(false);
    }
  };

  const startTrip = async () => {
    try {
      setLoading(true);
      await api.post(`/Trips/${activeTrip!.id}/start`);
      loadActiveTrip();
    } catch {
      alert("Failed to start trip");
    } finally {
      setLoading(false);
    }
  };

  const completeTrip = async () => {
    try {
      setLoading(true);
      await api.post(`/Trips/${activeTrip!.id}/complete`);
      setActiveTrip(null);
    } catch {
      alert("Failed to complete trip");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-3xl text-gray-800 font-bold mb-6">Driver Dashboard</h1>
      </div>

      <section className="max-w-5xl mx-auto px-6 py-10 space-y-10">
        {/* Active Trip */}
        {activeTrip && (
          <div className="bg-white border rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Active Trip
            </h2>

            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="space-y-1">
                <p className="text-sm text-gray-700">
                  Destination:{" "}
                  <span className="font-medium">{activeTrip.destination}</span>
                </p>
                <p className="text-sm text-gray-700">
                  Seats: {activeTrip.availableSeats}/{activeTrip.totalSeats}
                </p>
                <p className="text-sm text-gray-700">
                  Status:{" "}
                  <span className="font-medium">{activeTrip.status}</span>
                </p>
              </div>

              <div className="flex gap-3">
                {activeTrip.status === "Scheduled" && (
                  <button
                    onClick={startTrip}
                    disabled={loading}
                    className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-black transition disabled:opacity-60"
                  >
                    Start Trip
                  </button>
                )}

                {activeTrip.status === "InProgress" && (
                  <button
                    onClick={completeTrip}
                    disabled={loading}
                    className="bg-gray-200 text-gray-900 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-300 transition disabled:opacity-60"
                  >
                    Complete Trip
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Create Trip */}
        {!activeTrip && (
          <div className="bg-white border rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Create New Trip
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                placeholder="Destination"
                value={form.destination}
                onChange={(e) =>
                  setForm({ ...form, destination: e.target.value })
                }
                className="border rounded-md px-3 py-2.5 text-sm focus:ring-2 focus:ring-gray-900 focus:outline-none"
              />

              <input
                placeholder="Bus Plate Number"
                value={form.busPlateNumber}
                onChange={(e) =>
                  setForm({ ...form, busPlateNumber: e.target.value })
                }
                className="border rounded-md px-3 py-2.5 text-sm focus:ring-2 focus:ring-gray-900 focus:outline-none"
              />

              <input
                type="number"
                placeholder="Total Seats"
                value={form.totalSeats}
                onChange={(e) =>
                  setForm({ ...form, totalSeats: Number(e.target.value) })
                }
                className="border rounded-md px-3 py-2.5 text-sm focus:ring-2 focus:ring-gray-900 focus:outline-none"
              />

              <input
                placeholder="Route ID"
                value={form.routeId}
                onChange={(e) =>
                  setForm({ ...form, routeId: e.target.value })
                }
                className="border rounded-md px-3 py-2.5 text-sm focus:ring-2 focus:ring-gray-900 focus:outline-none"
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm mt-3">{error}</p>
            )}

            <button
              onClick={createTrip}
              disabled={creating}
              className="mt-5 bg-gray-900 text-white px-6 py-2.5 rounded-md text-sm font-medium hover:bg-black transition disabled:opacity-60"
            >
              {creating ? "Creating..." : "Create Trip"}
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
