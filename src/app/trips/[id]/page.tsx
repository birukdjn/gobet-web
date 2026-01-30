"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useParams } from "next/navigation";

export default function TripDetailsPage() {
  const { id } = useParams();
  const [trip, setTrip] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get(`/Trips/${id}`);
        setTrip(res.data);
      } catch {
        setError("Failed to load trip");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return <p className="p-10 text-gray-500">Loading...</p>;
  if (error) return <p className="p-10 text-red-500">{error}</p>;

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-4xl mx-auto bg-white border rounded-lg shadow-sm p-6">
        <h1 className="text-xl font-semibold text-gray-900 mb-4">
          Trip Details
        </h1>

        <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-700">
          <Detail label="Destination" value={trip.destination} />
          <Detail label="Status" value={trip.status} />
          <Detail
            label="Seats"
            value={`${trip.availableSeats}/${trip.totalSeats}`}
          />
          <Detail
            label="Departure Time"
            value={trip.departureTime || "Not scheduled"}
          />
        </div>

        <pre className="mt-6 text-xs bg-gray-100 rounded-md p-4 overflow-auto text-gray-700">
          {JSON.stringify(trip, null, 2)}
        </pre>
      </div>
    </main>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-gray-500">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}
