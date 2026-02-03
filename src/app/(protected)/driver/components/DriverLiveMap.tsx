"use client";
import { Navigation } from "lucide-react";

export default function DriverLiveMap() {
    return (
        <div className="h-[400px] w-full bg-slate-800 rounded-[40px] relative overflow-hidden border border-slate-700 shadow-2xl">
            {/* Mock Map Background */}
            <div className="absolute inset-0 opacity-30 grayscale invert brightness-50">
                <img src="https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/38.7578,9.0192,13/800x400?access_token=YOUR_TOKEN"
                    alt="Addis Map"
                    className="w-full h-full object-cover" />
            </div>

            {/* Current Speed Indicator */}
            <div className="absolute top-6 left-6 bg-black/80 backdrop-blur-md p-4 rounded-3xl border border-white/10">
                <p className="text-[10px] font-black text-green-500 uppercase">Speed</p>
                <p className="text-3xl font-black italic">34 <span className="text-sm font-normal not-italic opacity-50">km/h</span></p>
            </div>

            {/* Navigation Instruction */}
            <div className="absolute bottom-6 left-6 right-6 bg-white rounded-3xl p-6 shadow-2xl flex items-center gap-6">
                <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white rotate-45 shadow-lg">
                    <Navigation size={32} />
                </div>
                <div>
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest">In 200 Meters</p>
                    <p className="text-xl font-black text-gray-900 leading-tight">Turn Right onto Bole Road</p>
                </div>
            </div>
        </div>
    );
}