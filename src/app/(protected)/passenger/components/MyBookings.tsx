"use client";

import { useState } from "react";
import { Clock, MapPin, ChevronRight, Navigation, Ticket } from "lucide-react";

export default function MyBookings() {
    const [view, setView] = useState<"upcoming" | "past">("upcoming");

    return (
        <div className="space-y-6">
            {/* View Toggle */}
            <div className="flex bg-gray-100 p-1 rounded-xl w-fit">
                <button
                    onClick={() => setView("upcoming")}
                    className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${view === 'upcoming' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Upcoming
                </button>
                <button
                    onClick={() => setView("past")}
                    className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${view === 'past' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    History
                </button>
            </div>

            <div className="grid gap-4">
                {view === "upcoming" ? (
                    /* Active Booking Card */
                    <div className="bg-white border-2 border-blue-500 rounded-[32px] overflow-hidden shadow-xl shadow-blue-50">
                        <div className="bg-blue-600 p-4 flex justify-between items-center text-white">
                            <div className="flex items-center gap-2">
                                <Ticket size={18} />
                                <span className="text-xs font-black uppercase tracking-widest">Active Ticket</span>
                            </div>
                            <span className="text-xs font-mono opacity-80">ID: GB-88291</span>
                        </div>
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <p className="text-2xl font-black text-gray-900 leading-none">Megenagna</p>
                                    <p className="text-xs text-gray-400 mt-1 font-bold uppercase">Pickup: 4:30 PM</p>
                                </div>
                                <div className="flex-1 flex items-center justify-center px-4">
                                    <div className="h-[2px] w-full bg-gray-100 relative">
                                        <Navigation className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-blue-600 rotate-90" size={16} />
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-black text-gray-900 leading-none">Piassa</p>
                                    <p className="text-xs text-gray-400 mt-1 font-bold uppercase">Via: Kebenna</p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
                                    <Navigation size={18} /> Track My Bus
                                </button>
                                <button className="px-6 border border-gray-200 text-gray-400 rounded-2xl font-bold hover:bg-gray-50 transition-all">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* History List */
                    [1, 2, 3].map((i) => (
                        <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 flex items-center justify-between group cursor-pointer hover:border-gray-300">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:text-blue-500 transition-colors">
                                    <Clock size={20} />
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900 text-sm">Mexico → Bole</p>
                                    <p className="text-xs text-gray-400 font-medium uppercase">Jan 12, 2026 • 15 ETB</p>
                                </div>
                            </div>
                            <ChevronRight size={18} className="text-gray-300" />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}