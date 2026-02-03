"use client";

import dynamic from 'next/dynamic';
import { useEffect, useState } from "react";
import { adminService } from "@/services/admin.service";
import { useAuth } from '@/hooks/useAuth';

// Components
import StatsCard from "./components/StatsCard";
import UsersTable from "./components/UsersTable";
import TripsTable from "./components/TripsTable";
import DriverRequestsTable from "./components/DriverRequestsTable";
import RouteManagement from "./components/RouteManagement";
import BookingsTable from "./components/BookingsTable";
import FleetTable from "./components/FleetTable";
import AnalyticsView from "./components/AnalyticsView";
import PromoManager from "./components/PromoManager";
import ReportsCenter from "./components/ReportsCenter";
import SettingsPage from "@/components/SettingsPage";
import NotificationCenter from "@/components/NotificationCenter";
import DriverRequestsTableOverview from './components/DriverRequestTableOverview';


// Icons
import {
    LayoutDashboard, Users, Map,
    Ticket, ClipboardCheck, Settings,
    Bus, BarChart3, Tag, ShieldAlert,
    Navigation, History,
} from "lucide-react";

// Safe Dynamic Import for Leaflet
const LiveTrackingMap = dynamic(
    () => import('./components/LiveTrackingMap'),
    {
        ssr: false,
        loading: () => (
            <div className="h-[600px] w-full bg-gray-100 animate-pulse rounded-3xl flex items-center justify-center text-gray-400">
                <p className="font-medium">Initializing Real-time Map...</p>
            </div>
        )
    }
);

export default function AdminDashboardPage() {
    const [stats, setStats] = useState<any>(null);
    const [activeTab, setActiveTab] = useState("overview");
    const { user } = useAuth();

    useEffect(() => {
        adminService.getStats()
            .then(res => setStats(res.data))
            .catch(err => console.error("Stats fetch failed", err));
    }, []);

    const menuItems = [
        { id: "overview", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
        { id: "users", label: "Users", icon: <Users size={20} /> },
        { id: "routes", label: "Routes", icon: <Map size={20} /> },
        { id: "bookings", label: "Bookings", icon: <Ticket size={20} /> },
        { id: "fleet", label: "Fleet & Buses", icon: <Bus size={20} /> },
        { id: "live-tracking", label: "Live Tracking", icon: <Navigation size={20} /> },
        { id: "trips", label: "Trip History", icon: <History size={20} /> },
        { id: "verifications", label: "Approvals", icon: <ClipboardCheck size={20} /> },
        { id: "analytics", label: "Revenue", icon: <BarChart3 size={20} /> },
        { id: "notifications", label: "Broadcast", icon: <ShieldAlert size={20} /> },
        { id: "promos", label: "Discounts", icon: <Tag size={20} /> },
        { id: "settings", label: "System Config", icon: <Settings size={20} /> },
    ];

    return (
        <div className="min-h-screen bg-[#f8f9fa] flex">
            {/* Sidebar */}
            <aside className="w-72 bg-white border-r border-gray-200 hidden md:flex flex-col sticky top-0 h-screen">

                <div className="p-6 border-t bg-gray-50/50">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center text-white font-bold">
                            {user?.email?.charAt(0).toUpperCase()}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-bold text-gray-900 truncate">{user?.email}</p>
                            <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest">{user?.role || 'Administrator'}</p>
                        </div>
                    </div>

                </div>

                <nav className="flex-1 px-4 space-y-1 overflow-y-auto pb-10">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${activeTab === item.id
                                ? "bg-gray-900 text-white shadow-lg translate-x-1"
                                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                }`}
                        >
                            {item.icon}
                            {item.label}
                        </button>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                <header className="flex justify-between items-end mb-10">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 capitalize">
                            {activeTab.replace("-", " ")}
                        </h2>
                        <p className="text-gray-500 mt-1">Real-time control of the GoBet network.</p>
                    </div>
                    <div className="text-right hidden lg:block">
                        <p className="text-sm font-medium text-gray-900">Addis Ababa, ET</p>
                        <p className="text-xs text-gray-400">{new Date().toDateString()}</p>
                    </div>
                </header>

                <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                    {activeTab === "overview" && (
                        <div className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <StatsCard title="Total Users" value={stats?.usersCount || 0} />
                                <StatsCard title="Active Trips" value={stats?.activeTripsCount || 0} />
                                <StatsCard title="System Revenue" value={stats?.totalRevenue || 0} />
                                <StatsCard title="Pending Drivers" value={stats?.pendingDriversCount || 0} />
                            </div>

                            <div className="grid lg:grid-cols-5 gap-8">
                                <div className="lg:col-span-3 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="font-bold text-gray-900 text-lg">Recent Driver Requests</h3>
                                        <button onClick={() => setActiveTab("verifications")} className="text-blue-600 text-sm font-medium hover:underline">View details</button>
                                    </div>
                                    <DriverRequestsTableOverview />
                                </div>

                                <div className="bg-white lg:col-span-2 p-8 rounded-[32px] border border-gray-100 shadow-sm">
                                    <h3 className="font-bold text-xl text-gray-900 mb-6">System Health</h3>
                                    <ul className="space-y-6">
                                        <HealthItem label="API Gateway" status="Operational" />
                                        <HealthItem label="Payment Engine" status="Operational" />
                                        <HealthItem label="Geo-Server" status="Operational" />
                                        <HealthItem label="Database Cluster" status="Operational" />
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "users" && <UsersTable />}
                    {activeTab === "routes" && <RouteManagement />}
                    {activeTab === "bookings" && <BookingsTable />}
                    {activeTab === "fleet" && <FleetTable />}
                    {activeTab === "live-tracking" && <LiveTrackingMap />}
                    {activeTab === "analytics" && <AnalyticsView />}
                    {activeTab === "notifications" && <NotificationCenter />}
                    {activeTab === "promos" && <PromoManager />}
                    {activeTab === "reports" && <ReportsCenter />}
                    {activeTab === "settings" && <SettingsPage />}
                    {activeTab === "trips" && <TripsTable />}
                    {activeTab === "verifications" && <DriverRequestsTable />}
                </div>
            </main>
        </div>
    );
}// Helper component for cleaner health list
function HealthItem({ label, status }: { label: string, status: string }) {
    return (
        <li className="flex justify-between items-center">
            <span className="text-sm font-bold text-gray-500">{label}</span>
            <span className="text-green-600 text-xs font-black flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full uppercase">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> {status}
            </span>
        </li>
    );
}