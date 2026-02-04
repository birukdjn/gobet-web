"use client";

import dynamic from 'next/dynamic';
import { useState, useEffect } from "react";
import {
  Search, MapPin, Clock, Wallet,
  History, Bell, Settings,
  Navigation, Heart, LifeBuoy, LogOut
} from "lucide-react";

// Components
import FindTrips from "./components/FindTrips";
import MyBookings from "./components/MyBookings";
import PassengerWallet from "./components/PassengerWallet";
import SavedRoutes from "./components/SavedRoutes";
import SupportCenter from "./components/SupportCenter";
import NotificationCenter from "@/components/NotificationCenter";
import SettingsPage from '@/components/SettingsPage';
import { useAuth } from '@/hooks/useAuth';

// Safe Dynamic Import for Leaflet (Consistent with Admin)
const LiveTrackingMap = dynamic(
  () => import('../admin/components/LiveTrackingMap'),
  {
    ssr: false,
    loading: () => <div className="h-[500px] w-full bg-gray-100 animate-pulse rounded-3xl" />
  }
);

export default function PassengerDashboard() {
  const [activeTab, setActiveTab] = useState("find-trips");
  const { user } = useAuth();

  const menuItems = [
    { id: "find-trips", label: "Book a Seat", icon: <Search size={20} /> },
    { id: "live-map", label: "Explore Nearby", icon: <Navigation size={20} /> },
    { id: "my-bookings", label: "My Trips", icon: <History size={20} /> },
    { id: "wallet", label: "Wallet & Payments", icon: <Wallet size={20} /> },
    { id: "saved", label: "Favorite Routes", icon: <Heart size={20} /> },
    { id: "notifications", label: "Alerts", icon: <Bell size={20} /> },
    { id: "support", label: "Support & Safety", icon: <LifeBuoy size={20} /> },
    { id: "settings", label: "System Config", icon: <Settings size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex">
      {/* 1. CONSISTENT SIDEBAR */}
      <aside className="w-72 bg-white border-r border-gray-200 hidden md:flex flex-col sticky top-0 h-screen">

        <div className="p-6 border-t bg-gray-50/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white overflow-hidden">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sara" alt="User" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">{user?.email}</p>
              <p className="text-[10px] text-blue-600 font-bold uppercase">{user?.role}
              </p>
            </div>
          </div>
        </div>


        <nav className="flex-1 px-4 space-y-1 overflow-y-auto pb-10">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${activeTab === item.id
                ? "bg-blue-600 text-white shadow-lg translate-x-1"
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>


      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 capitalize">
              {activeTab.replace("-", " ")}
            </h2>
            <p className="text-gray-500 mt-1">Reliable transport across Addis Ababa.</p>
          </div>
          <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100 text-right">
            <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Digital Wallet</p>
            <p className="text-xl font-black text-gray-900">450.00 <span className="text-xs font-normal">ETB</span></p>
          </div>
        </header>

        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          {activeTab === "find-trips" && <FindTrips />}
          {activeTab === "live-map" && <LiveTrackingMap />}
          {activeTab === "my-bookings" && <MyBookings />}
          {activeTab === "wallet" && <PassengerWallet />}
          {activeTab === "saved" && <SavedRoutes />}
          {activeTab === "support" && <SupportCenter />}
          {activeTab === "notifications" && <NotificationCenter />}
          {activeTab === "settings" && <SettingsPage />}
        </div>
      </main>
    </div>
  );
}