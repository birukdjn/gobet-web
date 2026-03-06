"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import L, { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

// Only load MapContainer and other components in the browser
const MapContainer = dynamic(
    () => import("react-leaflet").then((mod) => mod.MapContainer),
    { ssr: false }
);
const TileLayer = dynamic(
    () => import("react-leaflet").then((mod) => mod.TileLayer),
    { ssr: false }
);
const Marker = dynamic(
    () => import("react-leaflet").then((mod) => mod.Marker),
    { ssr: false }
);
const Popup = dynamic(
    () => import("react-leaflet").then((mod) => mod.Popup),
    { ssr: false }
);

// 1. Fix for the "Icon not found" issue in Next.js/Leaflet
const busIcon =
    typeof window !== "undefined"
        ? new L.Icon({
            iconUrl: "https://cdn-icons-png.flaticon.com/512/3448/3448339.png",
            iconSize: [35, 35],
            iconAnchor: [17, 35],
            popupAnchor: [0, -35],
            shadowUrl:
                "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
            shadowSize: [35, 35],
        })
        : undefined;

interface LiveTrip {
    id: string;
    driverName: string;
    plateNumber: string;
    lat: number;
    lng: number;
    route: string;
    status: "On Time" | "Delayed";
}

export default function LiveTrackingMap() {
    const [trips, setTrips] = useState<LiveTrip[]>([]);
    const center: LatLngExpression = [9.0192, 38.7525]; // Addis Ababa

    // Fetch mock live locations
    useEffect(() => {
        if (typeof window === "undefined") return;

        const fetchLiveLocations = () => {
            const mockData: LiveTrip[] = [
                {
                    id: "1",
                    driverName: "Abebe Bikila",
                    plateNumber: "3-A12345",
                    lat: 9.0105,
                    lng: 38.7612,
                    route: "Megenagna → Piassa",
                    status: "On Time",
                },
                {
                    id: "2",
                    driverName: "Sara Tesfaye",
                    plateNumber: "3-B99887",
                    lat: 9.0250,
                    lng: 38.7450,
                    route: "Bole → 4 Killo",
                    status: "Delayed",
                },
                {
                    id: "3",
                    driverName: "Kebede Kassa",
                    plateNumber: "3-C44556",
                    lat: 9.0020,
                    lng: 38.7300,
                    route: "Mexico → Tor Hailoch",
                    status: "On Time",
                },
            ];
            setTrips(mockData);
        };

        fetchLiveLocations();
        const interval = setInterval(fetchLiveLocations, 5000); // Poll every 5s
        return () => clearInterval(interval);
    }, []);

    // Prevent rendering on server
    if (typeof window === "undefined") return null;

    return (
        <div className="relative w-full h-[600px] rounded-3xl overflow-hidden border-8 border-white shadow-2xl">
            {/* Map Overlay Stats */}
            <div className="absolute top-6 right-6 z-[1000] space-y-2">
                <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-gray-100">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        Active Fleet
                    </p>
                    <p className="text-2xl font-black text-gray-900">{trips.length} Vehicles</p>
                </div>
            </div>

            <MapContainer center={center} zoom={13} scrollWheelZoom={true} className="w-full h-full">
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {trips.map((trip) => (
                    <Marker key={trip.id} position={[trip.lat, trip.lng]} icon={busIcon}>
                        <Popup className="custom-popup">
                            <div className="w-48 p-2">
                                <div className="flex justify-between items-start mb-2">
                                    <span
                                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${trip.status === "On Time"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {trip.status}
                                    </span>
                                    <span className="text-[10px] text-gray-400 font-mono">{trip.plateNumber}</span>
                                </div>
                                <h4 className="font-bold text-gray-900 leading-tight">{trip.driverName}</h4>
                                <p className="text-xs text-blue-600 font-medium mt-1">{trip.route}</p>
                                <button className="w-full mt-3 bg-gray-900 text-white text-[10px] py-2 rounded-lg font-bold hover:bg-blue-600 transition-colors">
                                    Contact Driver
                                </button>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}