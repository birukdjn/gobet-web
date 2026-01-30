"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

type Trip = {
  id: string;
  destination: string;
  availableSeats: number;
  totalSeats: number;
  status: string;
  departureTime?: string;
};

export default function DriverDashboard() {
  const { logout } = useAuth();
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

  // 📍 Live location update
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
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-lg font-semibold text-gray-900">
            Driver Dashboard
          </h1>
          <Button variant="ghost" onClick={logout}>
            Logout
          </Button>
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-6 py-10 space-y-10">
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
                  <Button onClick={startTrip} disabled={loading}>
                    Start Trip
                  </Button>
                )}

                {activeTrip.status === "InProgress" && (
                  <Button
                    variant="secondary"
                    onClick={completeTrip}
                    disabled={loading}
                  >
                    Complete Trip
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

        {!activeTrip && (
          <div className="bg-white border rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Create New Trip
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Destination"
                value={form.destination}
                onChange={(e) =>
                  setForm({ ...form, destination: e.target.value })
                }
              />

              <Input
                placeholder="Bus Plate Number"
                value={form.busPlateNumber}
                onChange={(e) =>
                  setForm({ ...form, busPlateNumber: e.target.value })
                }
              />

              <Input
                type="number"
                placeholder="Total Seats"
                value={form.totalSeats}
                onChange={(e) =>
                  setForm({ ...form, totalSeats: Number(e.target.value) })
                }
              />

              <Input
                placeholder="Route ID"
                value={form.routeId}
                onChange={(e) =>
                  setForm({ ...form, routeId: e.target.value })
                }
              />
            </div>

            {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

            <Button onClick={createTrip} disabled={creating} className="mt-5">
              {creating ? "Creating..." : "Create Trip"}
            </Button>
          </div>
        )}
      </section>
    </main>
  );
}
