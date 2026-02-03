"use client";

import { useEffect, useState } from "react";
import { adminService } from "@/services/admin.service";
import StatsCard from "./components/StatsCard";
import UsersTable from "./components/UsersTable";
import TripsTable from "./components/TripsTable";
import DriverRequestsTable from "./components/DriverRequestsTable";
import RouteManagement from "./components/RouteManagement";
// Import Lucide Icons for a professional look
import {
    LayoutDashboard, Users, Map,
    Ticket, ClipboardCheck, Settings,
    History, LogOut,
    Bus,
    BarChart3,
    Tag,
    ShieldAlert
} from "lucide-react";
import BookingsTable from "./components/BookingsTable";
import FleetTable from "./components/FleetTable";
import AnalyticsView from "./components/AnalyticsView";
import PromoManager from "./components/PromoManager";
import ReportsCenter from "./components/ReportsCenter";
import SettingsPage from "./components/SettingsPage";
import NotificationCenter from "./components/NotificationCenter";

export default function AdminDashboardPage() {
    const [stats, setStats] = useState<any>(null);
    const [activeTab, setActiveTab] = useState("overview");

    useEffect(() => {
        // Updated to use your adminService
        adminService.getStats().then(res => setStats(res.data));
    }, []);

    const menuItems = [
        { id: "overview", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
        { id: "users", label: "Users", icon: <Users size={20} /> },
        { id: "routes", label: "Routes", icon: <Map size={20} /> },
        { id: "bookings", label: "Bookings", icon: <Ticket size={20} /> },
        { id: "fleet", label: "Fleet & Buses", icon: <Bus size={20} /> },
        { id: "analytics", label: "Revenue", icon: <BarChart3 size={20} /> },
        { id: "notifications", label: "Notifications", icon: <ClipboardCheck size={20} /> },
        { id: "promos", label: "Discounts", icon: <Tag size={20} /> },
        { id: "reports", label: "Safety Reports", icon: <ShieldAlert size={20} /> },
        { id: "settings", label: "System Config", icon: <Settings size={20} /> },
    ];

    return (
        <div className="min-h-screen bg-[#f8f9fa] flex">
            {/* 1. STYLED SIDEBAR */}
            <aside className="w-72 bg-white border-r border-gray-200 hidden md:flex flex-col sticky top-0 h-screen">
                <div className="p-8">
                    <h1 className="text-2xl font-black tracking-tighter text-gray-900 flex items-center gap-2">
                        <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center text-white text-xs">GB</div>
                        GoBet <span className="text-blue-600 font-normal">Admin</span>
                    </h1>
                </div>

                <nav className="flex-1 px-4 space-y-1">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${activeTab === item.id
                                ? "bg-gray-900 text-white shadow-md"
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
                {/* Header Section */}
                <header className="flex justify-between items-end mb-10">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 capitalize">
                            {activeTab === "overview" ? "Welcome back, Admin" : activeTab}
                        </h2>
                        <p className="text-gray-500 mt-1">Manage your transport network efficiently.</p>
                    </div>
                    <div className="text-right hidden lg:block">
                        <p className="text-sm font-medium text-gray-900">Addis Ababa, ET</p>
                        <p className="text-xs text-gray-400">{new Date().toDateString()}</p>
                    </div>
                </header>

                {/* Tab Switcher */}
                <div className="animate-in fade-in duration-500">
                    {activeTab === "overview" && (
                        <div className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <StatsCard title="Total Users" value={stats?.usersCount || 0} />
                                <StatsCard title="Active Trips" value={stats?.activeTripsCount || 0} />
                                <StatsCard title="System Revenue" value={stats?.totalRevenue || 0} />
                                <StatsCard title="Pending Drivers" value={stats?.pendingDriversCount || 0} />
                            </div>

                            <div className="grid lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="font-bold text-lg">Recent Driver Requests</h3>
                                        <button onClick={() => setActiveTab("verifications")} className="text-blue-600 text-sm font-medium">View All</button>
                                    </div>
                                    <DriverRequestsTable />
                                </div>
                                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                                    <h3 className="font-bold text-lg mb-6">System Health</h3>
                                    <ul className="space-y-4">
                                        <li className="flex justify-between text-sm">
                                            <span className="text-gray-500">API Server</span>
                                            <span className="text-green-500 font-bold">● Operational</span>
                                        </li>
                                        <li className="flex justify-between text-sm">
                                            <span className="text-gray-500">Database</span>
                                            <span className="text-green-500 font-bold">● Operational</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "users" && <UsersTable />}
                    {activeTab === "routes" && <RouteManagement />}
                    {activeTab === "bookings" && <BookingsTable />}
                    {activeTab === "fleet" && <FleetTable />}
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
}