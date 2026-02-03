"use client";

import { Users, ChevronRight, Navigation2, MoreVertical } from "lucide-react";
import DriverLiveMap from "./DriverLiveMap"; // Import the map component

export default function ActiveTrip({ isOnline }: { isOnline: boolean }) {
    if (!isOnline) {
        return (
            <div className="h-[60vh] flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-4 text-slate-600">
                    <Navigation2 size={40} />
                </div>
                <h3 className="text-xl font-bold text-slate-400">System Offline</h3>
                <p className="text-slate-500 max-w-xs mt-2 font-medium">Start your shift to view the live navigation map and passenger manifest.</p>
            </div>
        );
    }

    const passengers = [
        { id: "1", name: "Sara K.", seat: "4B", dropoff: "Bole Medhanialem", status: "onboard" },
        { id: "2", name: "Abebe T.", seat: "2A", dropoff: "Atlas", status: "checking-out" },
    ];

    return (
        <div className="space-y-8">
            {/* THE LIVE MAP AT THE TOP */}
            <DriverLiveMap />

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Status Summary */}
                <div className="lg:col-span-1 space-y-4">
                    <div className="bg-green-500 p-6 rounded-[32px] text-black">
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Next Stop</p>
                        <h3 className="text-xl font-black italic">Bole Bridge</h3>
                        <p className="text-sm font-bold mt-4 flex items-center gap-2">
                            <Users size={16} /> 4 Passengers dropping off
                        </p>
                    </div>

                    <div className="bg-slate-800 p-6 rounded-[32px] border border-slate-700">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Occupancy</p>
                        <p className="text-2xl font-black italic mt-1">12 / 16 <span className="text-sm font-normal not-italic text-slate-500">Seats</span></p>
                    </div>
                </div>

                {/* Passenger List */}
                <div className="lg:col-span-2">
                    <div className="bg-[#1e293b] rounded-[32px] border border-slate-800 overflow-hidden">
                        <div className="p-5 border-b border-slate-800 flex justify-between items-center">
                            <h3 className="font-bold">Onboard Manifest</h3>
                            <button className="text-[10px] font-black text-green-500 uppercase border border-green-500/20 px-3 py-1 rounded-full">Refresh</button>
                        </div>
                        <div className="divide-y divide-slate-800">
                            {passengers.map((p) => (
                                <div key={p.id} className="p-5 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center font-black text-green-500 border border-slate-700">
                                            {p.seat}
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm">{p.name}</p>
                                            <p className="text-[10px] text-slate-500 uppercase font-black">{p.dropoff}</p>
                                        </div>
                                    </div>
                                    {p.status === "checking-out" ? (
                                        <button className="bg-green-500 text-black text-[10px] font-black px-4 py-2 rounded-lg uppercase">Confirm Exit</button>
                                    ) : (
                                        <MoreVertical size={18} className="text-slate-600" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {isOnline && (
                    <div className="mt-10 p-8 border-2 border-dashed border-slate-800 rounded-[40px] flex flex-col items-center">
                        <p className="text-slate-500 font-bold mb-4">Arrived at your destination?</p>
                        <button
                            onClick={() => { }}
                            className="px-10 py-4 bg-white text-black font-black rounded-2xl hover:bg-green-500 transition-colors"
                        >
                            Complete Trip & Offline
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}