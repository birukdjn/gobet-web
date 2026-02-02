"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import Navbar from "@/components/layout/Navbar";

export default function PassengerDashboard() {
  const { user, logout } = useAuth();
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
      alert("Your request has been submitted. Wait for admin approval.");
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
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-3xl text-gray-800 font-bold mb-6">Passenger Dashboard</h1>
      </div>


      <section className="max-w-7xl mx-auto px-6 py-10">
        {/* Driver Request Modal */}
        <Modal
          open={showDriverModal}
          onClose={() => setShowDriverModal(false)}
          title="Request Driver Access"
        >
          <p className="text-sm text-gray-500 mb-3">
            Enter your driver license number. Admin approval is required.
          </p>

          <Input
            placeholder="Driver License Number"
            value={licenseNumber}
            onChange={(e) => setLicenseNumber(e.target.value)}
          />

          <div className="flex justify-end gap-3 mt-4">
            <Button variant="secondary" onClick={() => setShowDriverModal(false)}>
              Cancel
            </Button>
            <Button
              onClick={requestDriver}
              disabled={requestingDriver || !licenseNumber}
            >
              {requestingDriver ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </Modal>

        {/* Search */}
        <div className="bg-white border rounded-lg p-6 shadow-sm mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Find buses
          </h2>

          <div className="flex flex-col md:flex-row gap-4">
            <Input
              placeholder="Destination (e.g. Adama)"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
            <Button onClick={searchBuses} disabled={loading || !destination}>
              {loading ? "Searching..." : "Search"}
            </Button>
          </div>

          {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
        </div>

        {/* Trips */}
        <div className="space-y-4">
          {!loading && trips.length === 0 && (
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

              <Button onClick={() => bookPickup(trip.id)}>Book Pickup</Button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
