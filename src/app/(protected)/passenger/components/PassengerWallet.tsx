"use client";

import { CreditCard, Plus, ArrowUpRight, ArrowDownLeft } from "lucide-react";

export default function PassengerWallet() {
    return (
        <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-8 rounded-[40px] text-white shadow-2xl shadow-blue-200">
                <div className="flex justify-between items-start mb-10">
                    <p className="text-blue-100 font-medium">Digital Wallet Balance</p>
                    <CreditCard size={24} />
                </div>
                <h3 className="text-5xl font-black mb-10">450.00 <span className="text-xl font-normal opacity-60">ETB</span></h3>
                <div className="flex gap-4">
                    <button className="flex-1 bg-white/20 backdrop-blur-md py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-white/30 transition-all">
                        <Plus size={18} /> Top Up
                    </button>
                    <button className="flex-1 bg-white text-blue-700 py-4 rounded-2xl font-bold hover:bg-blue-50 transition-all">
                        Withdraw
                    </button>
                </div>
            </div>

            <div className="bg-white p-8 rounded-[40px] border border-gray-100">
                <h4 className="font-bold text-gray-900 mb-6">Recent Transactions</h4>
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center"><ArrowUpRight size={18} /></div>
                            <div>
                                <p className="text-sm font-bold text-gray-900">Trip to Piassa</p>
                                <p className="text-[10px] text-gray-400 font-bold uppercase">Yesterday, 4:30 PM</p>
                            </div>
                        </div>
                        <p className="font-bold text-red-500">-15 ETB</p>
                    </div>
                </div>
            </div>
        </div>
    );
}