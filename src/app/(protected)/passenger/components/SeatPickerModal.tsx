"use client";

import { useState } from "react";
import { X, Armchair as Chair, CheckCircle2, Info } from "lucide-react";

interface SeatPickerProps {
    busNumber: string;
    price: number;
    onClose: () => void;
    onConfirm: (selectedSeat: string) => void;
}

export default function SeatPickerModal({ busNumber, price, onClose, onConfirm }: SeatPickerProps) {
    const [selectedSeat, setSelectedSeat] = useState<string | null>(null);

    // Mock layout: 'A' for Available, 'O' for Occupied, 'X' for Aisle
    const seatMap = [
        ["1A", "1B", "X", "1C"],
        ["2A", "2B", "X", "2C"],
        ["3A", "3B", "X", "3C"],
        ["4A", "4B", "X", "4C"],
        ["5A", "5B", "5C", "5D"], // Back row
    ];

    const occupiedSeats = ["1C", "3A", "4B"];

    return (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-md z-[3000] flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">

                {/* Header */}
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <div>
                        <h3 className="text-xl font-black text-gray-900">Select Your Seat</h3>
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-tight">Bus: {busNumber}</p>
                    </div>
                    <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Bus Interior View */}
                <div className="p-8 bg-gray-50/50 flex flex-col items-center">
                    <div className="w-full max-w-[240px] bg-white border-4 border-gray-200 rounded-t-[60px] rounded-b-2xl p-6 shadow-inner relative">
                        {/* Steering Wheel Icon to show front */}
                        <div className="absolute top-4 left-8 w-6 h-6 border-4 border-gray-300 rounded-full flex items-center justify-center">
                            <div className="w-1 h-4 bg-gray-300 rotate-45" />
                        </div>

                        <div className="space-y-4 mt-10">
                            {seatMap.map((row, rowIndex) => (
                                <div key={rowIndex} className="flex justify-between gap-2">
                                    {row.map((seat) => {
                                        if (seat === "X") return <div key={seat} className="w-10" />; // Aisle

                                        const isOccupied = occupiedSeats.includes(seat);
                                        const isSelected = selectedSeat === seat;

                                        return (
                                            <button
                                                key={seat}
                                                disabled={isOccupied}
                                                onClick={() => setSelectedSeat(seat)}
                                                className={`
                                                    w-10 h-10 rounded-xl flex items-center justify-center transition-all
                                                    ${isOccupied ? "bg-gray-100 text-gray-300 cursor-not-allowed" :
                                                        isSelected ? "bg-blue-600 text-white shadow-lg shadow-blue-200 scale-110" :
                                                            "bg-white border-2 border-gray-100 text-gray-400 hover:border-blue-400 hover:text-blue-500"}
                                                `}
                                            >
                                                <Chair size={18} />
                                            </button>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Legend */}
                    <div className="flex gap-6 mt-8">
                        <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase">
                            <div className="w-3 h-3 bg-white border border-gray-200 rounded" /> Available
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase">
                            <div className="w-3 h-3 bg-gray-200 rounded" /> Booked
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase">
                            <div className="w-3 h-3 bg-blue-600 rounded" /> Selected
                        </div>
                    </div>
                </div>

                {/* Footer Action */}
                <div className="p-6 bg-white border-t border-gray-100">
                    <div className="flex justify-between items-center mb-6 px-2">
                        <div>
                            <p className="text-xs text-gray-400 font-bold uppercase">Total Fare</p>
                            <p className="text-2xl font-black text-gray-900">{price} ETB</p>
                        </div>
                        {selectedSeat && (
                            <div className="text-right">
                                <p className="text-xs text-gray-400 font-bold uppercase">Seat No.</p>
                                <p className="text-2xl font-black text-blue-600">{selectedSeat}</p>
                            </div>
                        )}
                    </div>

                    <button
                        disabled={!selectedSeat}
                        onClick={() => selectedSeat && onConfirm(selectedSeat)}
                        className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest transition-all ${selectedSeat
                                ? "bg-blue-600 text-white shadow-xl shadow-blue-100 hover:bg-blue-700"
                                : "bg-gray-100 text-gray-400 cursor-not-allowed"
                            }`}
                    >
                        Confirm Booking
                    </button>
                </div>
            </div>
        </div>
    );
}