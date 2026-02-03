"use client";

import { QRCodeSVG } from "qrcode.react";
import { X, Download, Share2, MapPin, Calendar, User } from "lucide-react";

interface TicketProps {
    bookingId: string;
    passengerName: string;
    route: string;
    via: string;
    price: string;
    date: string;
    onClose: () => void;
}

export default function TicketDetail({ bookingId, passengerName, route, via, price, date, onClose }: TicketProps) {
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[2000] flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-sm rounded-[40px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
                
                {/* Top Section (Header) */}
                <div className="bg-blue-600 p-6 text-white text-center relative">
                    <button 
                        onClick={onClose}
                        className="absolute right-4 top-4 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                    >
                        <X size={20} />
                    </button>
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
                        <MapPin size={32} />
                    </div>
                    <h3 className="text-xl font-black">Booking Confirmed</h3>
                    <p className="text-blue-100 text-sm opacity-80">Present this QR code to the driver</p>
                </div>

                {/* Ticket Body */}
                <div className="p-8 bg-white relative">
                    {/* The QR Code */}
                    <div className="bg-gray-50 p-6 rounded-[32px] flex flex-col items-center justify-center border-2 border-dashed border-gray-200 mb-6">
                        <QRCodeSVG 
                            value={bookingId} 
                            size={180}
                            fgColor="#1e293b"
                            includeMargin={true}
                        />
                        <p className="mt-4 font-mono text-xs font-bold text-gray-400">{bookingId}</p>
                    </div>

                    {/* Trip Info Grid */}
                    <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1">
                                <User size={10}/> Passenger
                            </p>
                            <p className="font-bold text-gray-900">{passengerName}</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1">
                                <Calendar size={10}/> Date & Time
                            </p>
                            <p className="font-bold text-gray-900">{date}</p>
                        </div>
                        <div className="col-span-2">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Route Pathway</p>
                            <p className="font-bold text-gray-900">{route} <span className="text-blue-600 text-xs font-medium">(via {via})</span></p>
                        </div>
                    </div>
                </div>

                {/* Bottom Section (Actions) */}
                <div className="border-t border-dashed border-gray-100 p-6 bg-gray-50 flex gap-3">
                    <button className="flex-1 bg-white border border-gray-200 py-3 rounded-2xl flex items-center justify-center gap-2 text-sm font-bold text-gray-600 hover:bg-gray-100 transition-all">
                        <Download size={16} /> Save
                    </button>
                    <button className="flex-1 bg-white border border-gray-200 py-3 rounded-2xl flex items-center justify-center gap-2 text-sm font-bold text-gray-600 hover:bg-gray-100 transition-all">
                        <Share2 size={16} /> Share
                    </button>
                </div>
            </div>
        </div>
    );
}