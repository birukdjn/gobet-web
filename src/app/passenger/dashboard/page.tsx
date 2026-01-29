"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

export default function PassengerDashboard() {
  const router = useRouter();
  const [destination, setDestination] = useState("");
  const [lat, setLat] = useState<number | null>(null);
  const [lon, setLon] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [trips, setTrips] = useState<any[]>([]);
  const [error, setError] = useState("");

  const [showDriverModal, setShowDriverModal] = useState(false);
  const [licenseNumber, setLicenseNumber] = useState("");
  const [requestingDriver, setRequestingDriver] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");
  }, [router]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLat(pos.coords.latitude);
        setLon(pos.coords.longitude);
      },
      () => {
        setLat(0);
        setLon(0);
      }
    );
  }, []);

  const searchBuses = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await api.get("/passenger/find-buses", {
        params: { destination, lat, lon },
      });
      setTrips(res.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch trips");
    } finally {
      setLoading(false);
    }
  };

  const bookPickup = async (tripId: string) => {
    try {
      await api.post("/passenger/book-pickup", {
        tripId,
        latitude: lat,
        longitude: lon,
      });
      alert("Pickup booked successfully!");
    } catch (err: any) {
      alert(err.response?.data?.message || "Booking failed");
    }
  };

  const requestDriver = async () => {
    try {
      setRequestingDriver(true);
      await api.post("/Driver/request-driver", { licenseNumber });
      alert("Driver request submitted!");
      setShowDriverModal(false);
      setLicenseNumber("");
    } catch (err: any) {
      alert(err.response?.data?.message || "Request failed");
    } finally {
      setRequestingDriver(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-lg font-semibold text-gray-900">
            Passenger Dashboard
          </h1>
          {/* Request Driver Button */}
          <div className=" flex gap-4">
            <button
              onClick={() => setShowDriverModal(true)}
              className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition"
            >
              Request a Driver
            </button>
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
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-6 py-10">

        {/* Driver Request Modal */}
        {showDriverModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-sm">
              <h2 className="text-lg text-gray-800 font-semibold mb-4">Request a Driver</h2>
              <input
                placeholder="Driver License Number"
                value={licenseNumber}
                onChange={(e) => setLicenseNumber(e.target.value)}
                className="w-full text-gray-500 border rounded-md px-3 py-2 mb-4 focus:ring-2 focus:ring-gray-900 focus:outline-none"
              />
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowDriverModal(false)}
                  className="px-4 py-2 rounded-md text-gray-600 border hover:bg-gray-100 hover:cursor-pointer transition"
                >
                  Cancel
                </button>
                <button
                  onClick={requestDriver}
                  disabled={requestingDriver || !licenseNumber}
                  className="px-4 py-2 rounded-md bg-gray-800 text-white hover:bg-gray-700 hover:cursor-pointer transition disabled:opacity-50"
                >
                  {requestingDriver ? "Requesting..." : "Request"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Search Buses */}
        <div className="bg-white border rounded-lg p-6 shadow-sm mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Find buses
          </h2>

          <div className="flex flex-col md:flex-row gap-4">
            <input
              placeholder="Destination (e.g. Adama)"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="flex-1 border rounded-md px-3 py-2.5 text-sm focus:ring-2 focus:ring-gray-900 focus:outline-none"
            />
            <button
              onClick={searchBuses}
              disabled={loading}
              className="bg-gray-900 text-white px-6 py-2.5 rounded-md text-sm font-medium hover:bg-black transition disabled:opacity-60"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>

          {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
        </div>

        {/* Trips */}
        <div className="space-y-4">
          {trips.length === 0 && (
            <p className="text-sm text-gray-500">
              No trips found. Try another destination.
            </p>
          )}

          {trips.map((trip) => (
            <div
              key={trip.id}
              className="bg-white border rounded-lg p-5 shadow-sm flex justify-between items-center"
            >
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {trip.destination}
                </p>
                <p className="text-xs text-gray-500">
                  Departs: {new Date(trip.departureTime).toLocaleString()}
                </p>
                <p className="text-xs text-gray-500">
                  Seats available: {trip.availableSeats}
                </p>
              </div>

              <button
                onClick={() => bookPickup(trip.id)}
                className="bg-gray-900 text-white px-4 py-2 rounded-md text-xs font-medium hover:bg-black transition"
              >
                Book pickup
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
