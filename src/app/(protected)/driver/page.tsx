"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  Navigation,
  Wallet,
  Power,
  Map,
  ScanLine,
  History,
  LifeBuoy,
  Settings,
  X,
  Check,
} from "lucide-react";

// Dynamic imports to prevent SSR errors
const ActiveTrip = dynamic(() => import("./components/ActiveTrip"), { ssr: false });
const TicketScanner = dynamic(() => import("./components/TicketScanner"), { ssr: false });
const TripHistory = dynamic(() => import("./components/TripHistory"), { ssr: false });
const LiveTrackingMap = dynamic(
  () => import("../admin/components/LiveTrackingMap"),
  { ssr: false }
);
const SupportCenter = dynamic(
  () => import("../passenger/components/SupportCenter"),
  { ssr: false }
);
const SettingsPage = dynamic(() => import("@/components/SettingsPage"), { ssr: false });

import { driverService } from "@/services/driver.service";

export default function DriverDashboard() {
  const [isOnline, setIsOnline] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<any>(null);
  const [activeTripId, setActiveTripId] = useState<string | null>(null);

  const availableRoutes = [
    { id: "3fa85f64-5717-4562-b3fc-2c963f66afa6", name: "Line 10", from: "Mexico", to: "Bole", price: 15 },
    { id: "4fb96g75-6828-5673-c4gd-d4fd5f77bgb7", name: "Line 04", from: "Megenagna", to: "4-Kilo", price: 12 },
  ];

  // ✅ GPS Tracking Loop (SSR Safe)
  useEffect(() => {
    if (typeof window === "undefined" || !navigator.geolocation) return;

    let interval: NodeJS.Timeout;

    if (isOnline && activeTripId) {
      interval = setInterval(() => {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            driverService.updateLocation(activeTripId, pos.coords.latitude, pos.coords.longitude);
          },
          (err) => console.error("GPS Error:", err),
          { enableHighAccuracy: true }
        );
      }, 10000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isOnline, activeTripId]);

  const handleConfirmStart = async () => {
    if (!selectedRoute) return;

    try {
      const res = await driverService.createTrip({
        destination: selectedRoute.to,
        totalSeats: 16,
        routeId: selectedRoute.id,
        busPlateNumber: "AA 3 B9876",
      });
      const tripId = res.data.id;
      await driverService.startTrip(tripId);

      setActiveTripId(tripId);
      setIsOnline(true);
      setIsModalOpen(false);
    } catch {
      alert("Shift start failed. Ensure you are an approved driver.");
    }
  };

  const handleEndShift = async () => {
    if (!activeTripId) return;

    await driverService.completeTrip(activeTripId);
    setIsOnline(false);
    setActiveTripId(null);
    setSelectedRoute(null);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col md:flex-row">
      {/* SIDEBAR */}
      <aside className="w-72 bg-[#1e293b] border-r border-slate-800 hidden md:flex flex-col h-screen sticky top-0">
        <div className="p-8 font-black text-2xl italic">
          GoBet <span className="text-green-500 not-italic">Driver</span>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {[
            { id: "dashboard", label: "Active Route", icon: <Navigation size={20} /> },
            { id: "scanner", label: "Scan Ticket", icon: <ScanLine size={20} /> },
            { id: "earnings", label: "Earnings", icon: <Wallet size={20} /> },
            { id: "history", label: "History", icon: <History size={20} /> },
            { id: "support", label: "Support", icon: <LifeBuoy size={20} /> },
            { id: "settings", label: "Settings", icon: <Settings size={20} /> },
            { id: "map", label: "Live Map", icon: <Map size={20} /> },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-bold transition-all ${activeTab === item.id
                ? "bg-green-500 text-black shadow-lg"
                : "text-slate-400 hover:bg-slate-800"
                }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-6 bg-slate-900/50 m-4 rounded-[28px] border border-slate-800">
          <button
            onClick={() => (isOnline ? handleEndShift() : setIsModalOpen(true))}
            className={`w-full py-4 rounded-xl font-black flex items-center justify-center gap-2 transition-all ${isOnline
              ? "bg-red-500/10 text-red-500 border border-red-500/20"
              : "bg-green-500 text-black"
              }`}
          >
            <Power size={18} />
            {isOnline ? "End Shift" : "Start Shift"}
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 md:p-10 pb-32">
        <header className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-black italic tracking-tighter uppercase">{activeTab}</h2>
            <p className="text-slate-500 font-bold uppercase text-xs tracking-widest">Bus AA 3 B9876</p>
          </div>
        </header>

        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {activeTab === "dashboard" && <ActiveTrip isOnline={isOnline} />}
          {activeTab === "scanner" && <TicketScanner />}
          {activeTab === "history" && <TripHistory />}
          {activeTab === "map" && <LiveTrackingMap />}
          {activeTab === "support" && <SupportCenter />}
          {activeTab === "settings" && <SettingsPage />}
        </div>
      </main>

      {/* ROUTE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#1e293b] w-full max-w-lg rounded-[40px] border border-slate-700 p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-black italic">Select Route</h3>
              <X className="cursor-pointer text-slate-500" onClick={() => setIsModalOpen(false)} />
            </div>

            <div className="space-y-3">
              {availableRoutes.map((route) => (
                <button
                  key={route.id}
                  onClick={() => setSelectedRoute(route)}
                  className={`w-full p-6 rounded-3xl border-2 transition-all flex justify-between items-center ${selectedRoute?.id === route.id
                    ? "border-green-500 bg-green-500/5"
                    : "border-slate-800 bg-slate-900/50"
                    }`}
                >
                  <div className="text-left">
                    <p className="text-[10px] font-black text-green-500 uppercase">{route.name}</p>
                    <p className="font-bold">{route.from} → {route.to}</p>
                  </div>

                  {selectedRoute?.id === route.id && <Check className="text-green-500" />}
                </button>
              ))}
            </div>

            <button
              disabled={!selectedRoute}
              onClick={handleConfirmStart}
              className="w-full mt-8 py-5 bg-green-500 disabled:bg-slate-800 text-black font-black rounded-2xl"
            >
              Confirm & Start Drive
            </button>
          </div>
        </div>
      )}
    </div>
  );
}