"use client";

import { useState } from "react";
import {
    Save, ShieldCheck, Zap,
    BellRing, Globe, Database,
    AlertTriangle, Banknote
} from "lucide-react";

export default function SettingsPage() {
    const [isMaintenance, setIsMaintenance] = useState(false);

    return (
        <div className="space-y-8 max-w-5xl">
            {/* 1. GLOBAL PRICING CONFIG */}
            <section className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                        <Banknote size={24} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">Fare & Revenue Rules</h3>
                        <p className="text-sm text-gray-500 font-medium">Configure how prices are calculated across the network.</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase ml-1">Base Fare (ETB)</label>
                        <input type="number" defaultValue={10} className="w-full p-4 bg-gray-50 border-none rounded-2xl font-bold focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase ml-1">GoBet Commission (%)</label>
                        <input type="number" defaultValue={15} className="w-full p-4 bg-gray-50 border-none rounded-2xl font-bold focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase ml-1">Surge Multiplier (Peak Hours)</label>
                        <input type="number" step="0.1" defaultValue={1.2} className="w-full p-4 bg-gray-50 border-none rounded-2xl font-bold focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="flex items-end">
                        <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all w-full justify-center">
                            <Save size={18} /> Update Pricing
                        </button>
                    </div>
                </div>
            </section>

            {/* 2. CRITICAL SYSTEM CONTROLS */}
            <div className="grid md:grid-cols-2 gap-8">
                {/* Maintenance Mode */}
                <div className={`p-8 rounded-[32px] border transition-all ${isMaintenance ? 'bg-orange-50 border-orange-200' : 'bg-white border-gray-100'}`}>
                    <div className="flex justify-between items-start mb-6">
                        <div className={`p-3 rounded-2xl ${isMaintenance ? 'bg-orange-100 text-orange-600' : 'bg-gray-50 text-gray-400'}`}>
                            <AlertTriangle size={24} />
                        </div>
                        <button
                            onClick={() => setIsMaintenance(!isMaintenance)}
                            className={`w-14 h-7 rounded-full relative transition-colors ${isMaintenance ? 'bg-orange-500' : 'bg-gray-200'}`}
                        >
                            <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${isMaintenance ? 'left-8' : 'left-1'}`} />
                        </button>
                    </div>
                    <h4 className="text-lg font-bold text-gray-900">Maintenance Mode</h4>
                    <p className="text-sm text-gray-500 mt-2 mb-6">When active, users cannot book new seats. Drivers can finish current trips.</p>
                </div>

                {/* Backup & Logs */}
                <div className="bg-white p-8 rounded-[32px] border border-gray-100 flex flex-col justify-between">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl">
                            <Database size={24} />
                        </div>
                        <h4 className="text-lg font-bold text-gray-900">Database & Logs</h4>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex-1 py-3 bg-gray-50 text-gray-700 rounded-xl text-xs font-bold hover:bg-gray-100">Export CSV</button>
                        <button className="flex-1 py-3 bg-gray-50 text-gray-700 rounded-xl text-xs font-bold hover:bg-gray-100">Daily Backup</button>
                    </div>
                </div>
            </div>

            {/* 3. BROADCAST SETTINGS */}
            <section className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <BellRing className="text-blue-600" size={20} /> Notification Defaults
                </h3>
                <div className="space-y-4">
                    {[
                        "Email on Booking Confirmation",
                        "SMS for Low Wallet Balance",
                        "App Notification for Driver Arrival",
                        "Monthly Revenue Report for Drivers"
                    ].map((feature, i) => (
                        <div key={i} className="flex justify-between items-center py-4 border-b border-gray-50 last:border-0">
                            <span className="text-sm font-bold text-gray-600">{feature}</span>
                            <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}