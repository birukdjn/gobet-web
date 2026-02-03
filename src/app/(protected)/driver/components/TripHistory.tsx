"use client";

import { Calendar, Users, MapPin, ChevronRight, Clock, Banknote } from "lucide-react";

export default function TripHistory() {
    const historyData = [
        {
            date: "Today, Oct 24",
            trips: [
                { id: "TRP-901", from: "Mexico", to: "Bole", passengers: 16, time: "08:30 AM", revenue: 240 },
                { id: "TRP-902", from: "Bole", to: "Megenagna", passengers: 12, time: "10:15 AM", revenue: 180 },
            ]
        },
        {
            date: "Yesterday, Oct 23",
            trips: [
                { id: "TRP-885", from: "Megenagna", to: "4-Kilo", passengers: 15, time: "04:20 PM", revenue: 225 },
                { id: "TRP-884", from: "4-Kilo", to: "Mexico", passengers: 16, time: "02:00 PM", revenue: 240 },
                { id: "TRP-883", from: "Mexico", to: "Bole", passengers: 14, time: "11:30 AM", revenue: 210 },
            ]
        }
    ];

    return (
        <div className="space-y-10 max-w-4xl">
            {historyData.map((group, idx) => (
                <div key={idx} className="space-y-4">
                    {/* Date Header */}
                    <div className="flex items-center gap-2 px-2">
                        <Calendar size={16} className="text-green-500" />
                        <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">
                            {group.date}
                        </h3>
                    </div>

                    {/* Trip Cards */}
                    <div className="space-y-3">
                        {group.trips.map((trip) => (
                            <button 
                                key={trip.id}
                                className="w-full bg-[#1e293b] border border-slate-800 p-6 rounded-[32px] flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-slate-600 transition-all group active:scale-[0.98]"
                            >
                                <div className="flex items-center gap-6">
                                    {/* Trip Route Icon */}
                                    <div className="hidden sm:flex flex-col items-center gap-1">
                                        <div className="w-2 h-2 rounded-full bg-green-500" />
                                        <div className="w-0.5 h-6 bg-slate-700" />
                                        <div className="w-2 h-2 rounded-full border border-slate-500" />
                                    </div>

                                    <div className="text-left">
                                        <div className="flex items-center gap-2 text-slate-200 font-bold">
                                            <span>{trip.from}</span>
                                            <ChevronRight size={14} className="text-slate-600" />
                                            <span>{trip.to}</span>
                                        </div>
                                        <div className="flex items-center gap-4 mt-2">
                                            <span className="flex items-center gap-1 text-[10px] font-black text-slate-500 uppercase">
                                                <Clock size={12} /> {trip.time}
                                            </span>
                                            <span className="flex items-center gap-1 text-[10px] font-black text-slate-500 uppercase">
                                                <Users size={12} /> {trip.passengers} Seats
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 border-slate-800 pt-4 md:pt-0">
                                    <div className="text-left md:text-right">
                                        <p className="text-[10px] font-black text-green-500 uppercase tracking-widest">Net Earned</p>
                                        <p className="text-xl font-black italic">{trip.revenue} <span className="text-xs font-normal not-italic text-slate-500">ETB</span></p>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center group-hover:bg-green-500 group-hover:text-black transition-colors">
                                        <ChevronRight size={20} />
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            ))}

            {/* Pagination / Load More */}
            <button className="w-full py-4 rounded-2xl border-2 border-dashed border-slate-800 text-slate-500 font-bold text-sm hover:border-slate-600 hover:text-slate-400 transition-all">
                Load Older Trips
            </button>
        </div>
    );
}