"use client";

import { Heart, MapPin, Plus, Navigation, Zap } from "lucide-react";

export default function SavedRoutes() {
    const favorites = [
        { id: 1, label: "Work", from: "Megenagna", to: "Bole", via: "Atlas" },
        { id: 2, label: "Home", from: "Piassa", to: "Megenagna", via: "Kebenna" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="font-bold text-gray-900">Your Frequent Trips</h3>
                <button className="text-blue-600 text-sm font-bold flex items-center gap-1 hover:underline">
                    <Plus size={16} /> Add New
                </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {favorites.map((route) => (
                    <div key={route.id} className="bg-white p-6 rounded-[32px] border border-gray-100 hover:shadow-xl hover:shadow-blue-50 transition-all group">
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                                <Heart size={20} fill="currentColor" />
                            </div>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-tight flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Zap size={14} /> Quick Book
                            </button>
                        </div>

                        <p className="text-xl font-black text-gray-900 mb-1">{route.label}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-400 font-bold uppercase mb-4">
                            <span>{route.from}</span>
                            <Navigation size={10} className="rotate-90" />
                            <span>{route.to}</span>
                        </div>

                        <div className="flex items-center gap-2 text-[10px] font-black bg-gray-50 text-gray-500 w-fit px-3 py-1 rounded-full uppercase tracking-widest">
                            <MapPin size={10} /> via {route.via}
                        </div>
                    </div>
                ))}

                {/* Placeholder for adding more */}
                <button className="border-2 border-dashed border-gray-100 rounded-[32px] flex flex-col items-center justify-center gap-3 p-10 hover:border-blue-200 hover:bg-blue-50/20 transition-all group">
                    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 group-hover:text-blue-500 transition-colors">
                        <Plus size={24} />
                    </div>
                    <p className="text-sm font-bold text-gray-400 group-hover:text-blue-900">Save a New Route</p>
                </button>
            </div>
        </div>
    );
}