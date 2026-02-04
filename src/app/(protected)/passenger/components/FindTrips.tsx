"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { Search, MapPin, Users, Navigation, Car } from "lucide-react";

export default function FindTrips() {
    return (
        <div className="space-y-8">
            {/* Search Box */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm grid md:grid-cols-3 gap-4">
                <div className="relative">
                    <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
                    <select className="w-full text-gray-500 pl-10 pr-4 py-3 bg-gray-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-blue-500">
                        <option>orgin</option>
                        <option>Megenagna</option>
                        <option>Bole</option>
                        <option>Mexico</option>
                    </select>
                </div>
                <div className="relative">
                    <Navigation className="absolute left-3 top-3 text-gray-400" size={18} />
                    <select className="w-full text-gray-500 pl-10 pr-4 py-3 bg-gray-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-blue-500">
                        <option>Destination</option>
                        <option>Piassa</option>
                        <option>4 Killo</option>
                        <option>Tor Hailoch</option>
                    </select>
                </div>
                <Button className="!h-full rounded-2xl bg-blue-600 hover:bg-blue-700">Search Routes</Button>
            </div>

            {/* Results */}
            <div className="grid gap-4">
                <h3 className="font-bold text-gray-900">Available Buses (via Aware)</h3>

                <div className="bg-white p-5 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400">
                            <Car size={28} />
                        </div>
                        <div>
                            <p className="font-bold text-gray-900 text-lg">Velocity Bus <span className="text-xs font-normal text-gray-400 ml-2">AA-3-09876</span></p>
                            <div className="flex items-center gap-3 mt-1">
                                <span className="flex items-center gap-1 text-xs text-gray-500 font-medium bg-gray-50 px-2 py-1 rounded-md">
                                    <Users size={14} /> 4 seats left
                                </span>
                                <span className="flex items-center gap-1 text-xs text-green-600 font-bold bg-green-50 px-2 py-1 rounded-md">
                                    Active Now
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-2xl font-black text-gray-900">10 ETB</p>
                        <button className="mt-2 bg-blue-600 text-white px-6 py-2 rounded-xl text-sm font-bold shadow-lg shadow-blue-100 hover:scale-105 transition-transform">
                            Book Seat
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}