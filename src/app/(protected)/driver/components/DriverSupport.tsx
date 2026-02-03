"use client";
import { ShieldAlert, MessageSquare, Phone, MapPin } from "lucide-react";

export default function DriverSupport() {
    return (
        <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-red-500/10 border border-red-500/20 p-8 rounded-[32px] space-y-4">
                <ShieldAlert className="text-red-500" size={40} />
                <h3 className="text-xl font-black text-red-500 uppercase italic">Emergency Protocol</h3>
                <p className="text-sm text-slate-400">Instantly notify the GoBet dispatch center and local traffic police of your current GPS location.</p>
                <button className="w-full bg-red-600 text-white py-4 rounded-2xl font-black uppercase tracking-tighter shadow-lg shadow-red-900/20">
                    Signal Emergency (SOS)
                </button>
            </div>

            <div className="bg-slate-800 p-8 rounded-[32px] border border-slate-700 flex flex-col justify-between">
                <div>
                    <h3 className="text-xl font-black italic">Station Support</h3>
                    <p className="text-sm text-slate-400 mt-2">Having trouble with a route or a station attendant?</p>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-8">
                    <button className="flex flex-col items-center justify-center p-6 bg-slate-900 rounded-[24px] gap-2 border border-slate-700 hover:bg-slate-700 transition-colors">
                        <Phone className="text-green-500" />
                        <span className="text-xs font-bold">Call Dispatch</span>
                    </button>
                    <button className="flex flex-col items-center justify-center p-6 bg-slate-900 rounded-[24px] gap-2 border border-slate-700 hover:bg-slate-700 transition-colors">
                        <MessageSquare className="text-blue-500" />
                        <span className="text-xs font-bold">Live Chat</span>
                    </button>
                </div>
            </div>
        </div>
    );
}