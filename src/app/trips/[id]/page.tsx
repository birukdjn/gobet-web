"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useParams } from "next/navigation";

export default function TripDetailsPage() {
  const { id } = useParams();
  const [trip, setTrip] = useState<any>(null);

  useEffect(() => {
    api.get(`/Trips/${id}`).then(res => setTrip(res.data));
  }, [id]);

  if (!trip) return <p>Loading...</p>;

  return (
    <div style={{ padding: 40 }}>
      <h2>Trip Details</h2>
      <pre>{JSON.stringify(trip, null, 2)}</pre>
    </div>
  );
}
