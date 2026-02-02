"use client";

import StatsCard from "./components/StatsCard";
import UsersTable from "./components/UsersTable";
import TripsTable from "./components/TripsTable";
import DriverRequestsTable from "./components/DriverRequestsTable";
import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function AdminDashboardPage() {
    const [stats, setStats] = useState<any>(null);

    useEffect(() => {
        // fetch stats from backend
        api.get("/admin/stats").then(res => setStats(res.data));
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="max-w-7xl mx-auto px-6 py-8">
                <h1 className="text-3xl text-gray-800 font-bold mb-6">Admin Dashboard</h1>

                {/* Stats */}
                <div className="grid text-gray-700 grid-cols-1 md:grid-cols-6 gap-6 mb-10">
                    <StatsCard title="Total Users" value={stats?.usersCount || 0} />
                    <StatsCard title="Active Users" value={stats?.activeUsersCount || 0} />
                    <StatsCard title="Total Admins" value={stats?.adminsCount || 0} />
                    <StatsCard title="Active Admins" value={stats?.activeAdminsCount || 0} />
                    <StatsCard title="Total Drivers" value={stats?.driversCount || 0} />
                    <StatsCard title="Active Drivers" value={stats?.activeDriversCount || 0} />
                    <StatsCard title="Total Passengers" value={stats?.passengersCount || 0} />
                    <StatsCard title="Active Passengers" value={stats?.activePassengersCount || 0} />
                    <StatsCard title="Total Trips" value={stats?.tripsCount || 0} />
                    <StatsCard title="Active Trips" value={stats?.activeTripsCount || 0} />
                    <StatsCard title="Total Bookings" value={stats?.bookingsCount || 0} />
                    <StatsCard title="Pending Requests" value={stats?.pendingBookingsCount || 0} />
                </div>
                <section className="mb-10">
                    <div className="flex items-center gap-2 mb-4">
                        <h2 className="text-xl text-gray-800 font-semibold">Driver Verification Requests</h2>
                        <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full text-xs font-bold">Pending Action</span>
                    </div>
                    <DriverRequestsTable />
                </section>

                <section className="mb-10">
                    <h2 className="text-xl text-gray-800 font-semibold mb-4">User Management</h2>
                    <UsersTable />
                </section>

                <section>
                    <h2 className="text-xl text-gray-800 font-semibold mb-4">System Trips</h2>
                    <TripsTable />
                </section>

            </main>
        </div>
    );
}
