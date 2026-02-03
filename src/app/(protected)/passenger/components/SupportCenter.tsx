"use client";
import { ShieldAlert, PhoneCall, MessageCircle, FileText } from "lucide-react";

export default function SupportCenter() {
    return (
        <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-red-50 p-8 rounded-[32px] border border-red-100">
                <ShieldAlert className="text-red-600 mb-4" size={40} />
                <h3 className="text-xl font-bold text-red-900">Emergency Assistance</h3>
                <p className="text-red-700/70 text-sm mt-2 mb-6">If you feel unsafe during a trip, press the button below to alert our safety team and local authorities.</p>
                <button className="w-full bg-red-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-red-200 hover:bg-red-700 transition-all">
                    SOS Emergency
                </button>
            </div>

            <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm flex flex-col justify-between">
                <div>
                    <h3 className="text-xl font-bold text-gray-900">Contact GoBet Support</h3>
                    <p className="text-gray-500 text-sm mt-2">Available 24/7 for lost items or booking issues.</p>
                </div>
                <div className="space-y-3 mt-8">
                    <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all font-bold text-gray-700">
                        <div className="flex items-center gap-3"><PhoneCall size={18} /> Call Support</div>
                        <span className="text-xs text-blue-600">Free</span>
                    </button>
                    <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all font-bold text-gray-700">
                        <div className="flex items-center gap-3"><MessageCircle size={18} /> Live Chat</div>
                        <span className="text-xs text-green-600">Online</span>
                    </button>
                </div>
            </div>
        </div>
    );
}