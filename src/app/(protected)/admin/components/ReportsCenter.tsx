"use client";
import { AlertCircle } from "lucide-react";

export default function ReportsCenter() {
    return (
        <div className="space-y-4">
            <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex gap-4">
                <AlertCircle className="text-red-500" />
                <div>
                    <p className="font-bold text-red-900">Urgent: Reckless Driving Report</p>
                    <p className="text-sm text-red-700">Driver ID: DRV-992 | Reported by: Sara K.</p>
                    <div className="mt-2 flex gap-2">
                        <button className="text-xs bg-red-600 text-white px-3 py-1 rounded">Suspend Driver</button>
                        <button className="text-xs bg-white border px-3 py-1 rounded">Dismiss</button>
                    </div>
                </div>
            </div>
        </div>
    );
}