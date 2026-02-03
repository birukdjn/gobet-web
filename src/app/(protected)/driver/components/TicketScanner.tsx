"use client";
import { useState } from "react";
import { QrCode, CheckCircle, AlertCircle, X } from "lucide-react";
import { driverService } from "@/services/driver.service";

export default function TicketScanner() {
    const [scanStatus, setScanStatus] = useState<"idle" | "success" | "error">("idle");

    // Inside components/TicketScanner.tsx
const handleVerify = async (bookingId: string) => {
    const tripId = localStorage.getItem("active_trip_id");
    if (!tripId) return;

    try {
        const res = await driverService.getTripDetails(tripId);
        // Logic to check if bookingId exists in the trip's passenger list
        const isValid = res.data.passengers.some((p: any) => p.id === bookingId);
        
        if(isValid) setScanStatus("success");
        else setScanStatus("error");
    } catch (e) {
        setScanStatus("error");
    }
};

    return (
        <div className="max-w-md mx-auto space-y-6">
            <div className="bg-slate-800 aspect-square rounded-[40px] border-2 border-dashed border-slate-700 flex flex-col items-center justify-center relative overflow-hidden">
                {/* Mock Camera View */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent animate-pulse" />
                <QrCode size={80} className="text-slate-600 mb-4" />
                <p className="text-slate-400 font-bold text-sm">Align QR Code within frame</p>

                {/* Status Overlays */}
                {scanStatus === "success" && (
                    <div className="absolute inset-0 bg-green-500 flex flex-col items-center justify-center animate-in zoom-in">
                        <CheckCircle size={100} className="text-black mb-4" />
                        <h3 className="text-2xl font-black text-black">TICKET VALID</h3>
                        <p className="text-black/70 font-bold">Seat 4B • Megenagna</p>
                        <button onClick={() => setScanStatus("idle")} className="mt-8 bg-black text-white px-8 py-3 rounded-2xl font-bold">Next Scan</button>
                    </div>
                )}
            </div>

            <div className="bg-slate-800 p-6 rounded-[32px] border border-slate-700">
                <h4 className="font-bold text-slate-300 mb-4">Manual Entry</h4>
                <div className="flex gap-2">
                    <input type="text" placeholder="Enter Booking ID" className="flex-1 bg-slate-900 border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-green-500" />
                    <button onClick={() => setScanStatus("success")} className="bg-slate-700 px-6 rounded-2xl font-bold hover:bg-slate-600 transition-all">Verify</button>
                </div>
            </div>
        </div>
    );
}