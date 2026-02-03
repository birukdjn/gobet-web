"use client";
import { ArrowUpRight, TrendingUp } from "lucide-react";

export default function AnalyticsView() {
    return (
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border shadow-sm">
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h3 className="text-lg font-bold">Earnings Overview</h3>
                        <p className="text-sm text-gray-500">Daily revenue across all routes</p>
                    </div>
                    <span className="flex items-center gap-1 text-green-600 font-bold bg-green-50 px-2 py-1 rounded">
                        +12.5% <TrendingUp size={16}/>
                    </span>
                </div>
                <div className="h-64 bg-gray-50 rounded-xl flex items-end justify-between p-4 gap-2">
                    {/* Simple CSS Bar Chart Simulation */}
                    {[40, 70, 45, 90, 65, 80, 95].map((h, i) => (
                        <div key={i} className="bg-blue-500 w-full rounded-t-sm" style={{ height: `${h}%` }}></div>
                    ))}
                </div>
            </div>
        </div>
    );
}