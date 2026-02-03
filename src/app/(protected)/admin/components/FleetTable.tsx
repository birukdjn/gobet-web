"use client";
import { Bus, CheckCircle } from "lucide-react";

export default function FleetTable() {
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 border rounded-xl flex items-center gap-4">
                    <div className="p-3 bg-green-50 text-green-600 rounded-lg"><CheckCircle /></div>
                    <div><p className="text-xs text-gray-500">Active Buses</p><p className="text-xl font-bold">42</p></div>
                </div>
                {/* Add more stats here */}
            </div>
            <div className="bg-white rounded-xl border overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                        <tr>
                            <th className="p-4">Plate Number</th>
                            <th className="p-4">Owner/Driver</th>
                            <th className="p-4">Model</th>
                            <th className="p-4">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        <tr className="text-sm">
                            <td className="p-4 font-mono font-bold">AA-3-B12345</td>
                            <td className="p-4">Abebe Bikila</td>
                            <td className="p-4">Toyota Coaster</td>
                            <td className="p-4"><span className="text-green-600 bg-green-50 px-2 py-1 rounded text-xs">On Route</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}