"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import ConfirmationModal from "./ConfirmationModal";

type User = {
    id: string;
    fullName: string;
    email: string;
    role: string;
    isActive: boolean;
};

export default function UsersTable() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userToToggle, setUserToToggle] = useState<User | null>(null);

    useEffect(() => {
        api.get("/admin/users")
            .then(res => setUsers(res.data))
            .finally(() => setLoading(false));
    }, []);

    const changeRole = async (userId: string, newRole: string) => {
        try {
            await api.patch(`/admin/users/${userId}/role`, { role: newRole });
            setUsers(prev =>
                prev.map(u => (u.id === userId ? { ...u, role: newRole } : u))
            );
        } catch (error: any) {
            alert(error.response?.data?.message || "Failed to update role.");
        }
    };

    // 1. Opens the modal instead of window.confirm
    const handleStatusButtonClick = (user: User) => {
        setUserToToggle(user);
        setIsModalOpen(true);
    };

    // 2. Logic called when "Confirm" is clicked in the modal
    const handleConfirmToggle = async () => {
        if (!userToToggle) return;

        const nextStatusLabel = userToToggle.isActive ? "Inactive" : "Active";

        try {
            await api.patch(`/admin/users/${userToToggle.id}/status`, { status: nextStatusLabel });

            setUsers(prev =>
                prev.map(u => (u.id === userToToggle.id ? { ...u, isActive: !u.isActive } : u))
            );
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Failed to update status.";
            alert(errorMessage);
        } finally {
            setIsModalOpen(false);
            setUserToToggle(null);
        }
    };

    if (loading) return <p className="p-10 text-center text-gray-500">Loading users...</p>;
    if (!users.length) return <p className="p-10 text-center text-red-800">No users found</p>;

    return (
        <div className="overflow-x-auto p-4">
            <table className="w-full border-collapse bg-white shadow rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                    <tr className="text-gray-600 font-medium border-b">
                        <th className="p-3 text-left">Name</th>
                        <th className="p-3 text-left">Email</th>
                        <th className="p-3 text-left">Role</th>
                        <th className="p-3 text-left">Status</th>
                        <th className="p-3 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id} className="border-b hover:bg-gray-50 transition-colors">
                            <td className="p-3">{user.fullName}</td>
                            <td className="p-3 text-sm text-gray-500">{user.email}</td>
                            <td className="p-3">
                                <span className="text-xs font-mono bg-blue-50 text-blue-600 px-2 py-1 rounded">
                                    {user.role}
                                </span>
                            </td>
                            <td className="p-3">
                                <button
                                    onClick={() => handleStatusButtonClick(user)}
                                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all border ${user.isActive
                                        ? "bg-green-100 text-green-700 border-green-200 hover:bg-green-200"
                                        : "bg-red-100 text-red-700 border-red-200 hover:bg-red-200"
                                        }`}
                                >
                                    {user.isActive ? "Active" : "Inactive"}
                                </button>
                            </td>
                            <td className="p-3">
                                <select
                                    value={user.role}
                                    onChange={e => changeRole(user.id, e.target.value)}
                                    className="border rounded px-2 py-1 text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                                >
                                    <option value="Admin">Admin</option>
                                    <option value="Driver">Driver</option>
                                    <option value="Passenger">Passenger</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* The Custom Modal */}
            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirmToggle}
                title="Change User Access"
                message={`Are you sure you want to ${userToToggle?.isActive ? "deactivate" : "activate"} ${userToToggle?.fullName}? This will immediately update their account permissions.`}
                confirmText={userToToggle?.isActive ? "Deactivate" : "Activate"}
                type={userToToggle?.isActive ? "danger" : "info"}
            />
        </div>
    );
}