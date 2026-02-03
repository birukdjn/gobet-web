"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { User, MapPin, Calendar, CheckCircle2, Clock, XCircle } from "lucide-react";

export default function BookingsTable() {
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/admin/bookings")
            .then(res => setBookings(res.data))
            .finally(() => setLoading(false));
    }, []);

    const getStatusStyle = (status: string) => {
        switch (status.toLowerCase()) {
            case "confirmed": return "bg-green-100 text-green-700 border-green-200";
            case "pending": return "bg-amber-100 text-amber-700 border-amber-200";
            case "cancelled": return "bg-red-100 text-red-700 border-red-200";
            default: return "bg-gray-100 text-gray-700 border-gray-200";
        }
    };

    if (loading) return <div className="p-10 text-center text-gray-400 animate-pulse">Loading booking history...</div>;

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50 border-b border-gray-100">
                    <tr className="text-gray-500 text-xs uppercase tracking-wider">
                        <th className="px-6 py-4 font-semibold">Passenger</th>
                        <th className="px-6 py-4 font-semibold">Trip Details</th>
                        <th className="px-6 py-4 font-semibold">Pickup Point</th>
                        <th className="px-6 py-4 font-semibold">Status</th>
                        <th className="px-6 py-4 font-semibold text-right">Date</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {bookings.map((booking) => (
                        <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                        <User size={16} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-900">{booking.passengerName}</p>
                                        <p className="text-xs text-gray-500">{booking.passengerPhone}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <p className="text-sm text-gray-700 font-medium">{booking.origin} → {booking.destination}</p>
                                <p className="text-xs text-gray-400 font-mono">ID: {booking.tripId.slice(0, 8)}</p>
                            </td>
                            <td className="px-6 py-4">
                                <a
                                    href={`https://www.google.com/maps?q=${booking.latitude},${booking.longitude}`}
                                    target="_blank"
                                    className="flex items-center gap-1 text-xs text-blue-600 hover:underline font-medium"
                                >
                                    <MapPin size={12} /> View Location
                                </a>
                            </td>
                            <td className="px-6 py-4">
                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${getStatusStyle(booking.status)}`}>
                                    {booking.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <p className="text-xs text-gray-900 font-medium">{new Date(booking.createdAt).toLocaleDateString()}</p>
                                <p className="text-[10px] text-gray-400">{new Date(booking.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}