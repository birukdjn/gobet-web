"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import Button from "@/components/ui/Button";

export default function DriverRequestsTable() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchRequests = async () => {
        try {
            const res = await api.get("/admin/driver-requests");
            setRequests(res.data);
        } catch (err) {
            console.error("Fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchRequests(); }, []);

    const handleApprove = async (userId: string) => {
        if (!confirm("Approve this driver?")) return;
        try {
            await api.post(`/admin/approve-driver/${userId}`);
            fetchRequests();
        } catch (err) { alert("Approval failed"); }
    };

    const handleReject = async (userId: string) => {
        const reason = prompt("Reason for rejection:");
        if (!reason) return;

        try {
            // Swagger endpoint: POST /api/admin/reject-driver/{userId}
            // Logic: Send the reason as a plain string body
            await api.post(`/admin/reject-driver/${userId}`, JSON.stringify(reason), {
                headers: { "Content-Type": "application/json" }
            });
            fetchRequests();
        } catch (err) { alert("Rejection failed"); }
    };

    if (loading) return <div className="p-10 text-center text-gray-500 italic">Checking for requests...</div>;

    return (
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <table className="w-full text-left">
                <thead className="bg-gray-50 border-b text-gray-600 text-sm uppercase tracking-wider">
                    <tr>
                        <th className="px-6 py-4">Full Name</th>
                        <th className="px-6 py-4">Email</th>
                        <th className="px-6 py-4">License</th>
                        <th className="px-6 py-4 ">Decision</th>
                    </tr>
                </thead>
                <tbody className="divide-y">
                    {requests.length === 0 ? (
                        <tr><td colSpan={4} className="px-6 py-10 text-center text-gray-400">No pending requests found.</td></tr>
                    ) : (
                        requests.map((req: any) => (
                            <tr key={req.userId} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 font-medium text-gray-900">{req.fullName}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">{req.email}</td>
                                <td className="px-6 py-4 font-mono text-sm text-blue-600">{req.licenseNumber}</td>
                                <td className="px-3 py-4 text-right flex justify-between">
                                    <Button variant="secondary" className="!py-1 !px-3" onClick={() => handleReject(req.userId)}>Reject</Button>
                                    <Button className="!py-1 !px-3 !w-auto" onClick={() => handleApprove(req.userId)}>Approve</Button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}