"use client";
import { ArrowUpRight, ArrowDownLeft, TrendingUp, CreditCard } from "lucide-react";

export default function DriverWallet() {
    return (
        <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-green-500 p-8 rounded-[32px] text-black">
                    <p className="text-xs font-black uppercase opacity-60">Withdrawable Balance</p>
                    <h3 className="text-4xl font-black mt-2 italic">4,850.00 <span className="text-sm not-italic">ETB</span></h3>
                    <button className="mt-6 w-full bg-black text-white py-3 rounded-xl font-bold text-sm hover:opacity-80 transition-opacity">
                        Withdraw to Telebirr
                    </button>
                </div>

                <div className="bg-slate-800 p-8 rounded-[32px] border border-slate-700">
                    <p className="text-xs font-black text-slate-500 uppercase">Weekly Total</p>
                    <h3 className="text-2xl font-black mt-2">12,400.00 ETB</h3>
                    <div className="flex items-center gap-2 text-green-500 text-xs font-bold mt-2">
                        <TrendingUp size={14} /> +12% from last week
                    </div>
                </div>

                <div className="bg-slate-800 p-8 rounded-[32px] border border-slate-700">
                    <p className="text-xs font-black text-slate-500 uppercase">System Commission (15%)</p>
                    <h3 className="text-2xl font-black mt-2 text-red-400">- 1,860.00 ETB</h3>
                    <p className="text-xs text-slate-500 mt-2 font-medium">Automatically deducted</p>
                </div>
            </div>

            <div className="bg-[#1e293b] rounded-[32px] border border-slate-800 overflow-hidden">
                <div className="p-6 border-b border-slate-800 flex justify-between">
                    <h4 className="font-bold">Payout History</h4>
                    <button className="text-xs font-black text-green-500 uppercase tracking-widest">Filter</button>
                </div>
                <div className="divide-y divide-slate-800">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="p-6 flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-green-500">
                                    <ArrowUpRight size={20} />
                                </div>
                                <div>
                                    <p className="font-bold">Telebirr Transfer</p>
                                    <p className="text-xs text-slate-500">Oct {10 + i}, 2023 • 09:42 AM</p>
                                </div>
                            </div>
                            <p className="font-black text-lg">- 2,500.00</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}