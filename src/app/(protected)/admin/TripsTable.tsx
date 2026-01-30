"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function TripsTable() {
    const [trips, setTrips] = useState<any[]>([]);

    useEffect(() => {
        api.get("/trips").then(res => setTrips(res.data));
    }, []);

    if (!trips.length) return <p className="text-red-800">No trips found</p>;

    return (
        <table className="w-full border-collapse bg-white shadow rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
                <tr className="text-gray-700">
                    <th className="p-3 text-left">Trip ID</th>
                    <th className="p-3 text-left">From</th>
                    <th className="p-3 text-left">through</th>
                    <th className="p-3 text-left">To</th>
                    <th className="p-3 text-left">Driver</th>


                </tr>
            </thead>
            <tbody>
                {trips.map(trip => (
                    <tr key={trip.id} className="border-b">
                        <td className="p-3">{trip.id}</td>
                        <td className="p-3">{trip.from}</td>
                        <td className="p-3">{trip.through}</td>
                        <td className="p-3">{trip.to}</td>
                        <td className="p-3">{trip.driverName}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
