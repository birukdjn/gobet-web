"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

type User = {
    id: string;
    fullName: string;
    email: string;
    role: string;
    status: string;
};

export default function UsersTable() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/admin/users")
            .then(res => setUsers(res.data))
            .finally(() => setLoading(false));
    }, []);

    const changeRole = async (userId: string, newRole: string) => {
        await api.patch(`/admin/users/${userId}/role`, { role: newRole });
        setUsers(prev =>
            prev.map(u => (u.id === userId ? { ...u, role: newRole } : u))
        );
    };

    const ChangeStatus = async (userId: string, newStatus: string) => {
        await api.patch(`/admin/users/${userId}/status`, { status: newStatus });
        setUsers(prev =>
            prev.map(u => (u.id === userId ? { ...u, status: newStatus } : u))
        );
    };

    if (loading) return <p>Loading users...</p>;
    if (!users.length) return <p className="text-red-800">No users found</p>;
    return (
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
                    <tr key={user.id} className="border-b">
                        <td className="p-3">{user.fullName}</td>
                        <td className="p-3">{user.email}</td>
                        <td className="p-3">{user.role}</td>
                        <td className="p-3">{user.status}</td>
                        <td className="p-3">
                            <select
                                value={user.role}
                                onChange={e => changeRole(user.id, e.target.value)}
                                className="border rounded px-2 py-1"
                            >
                                <option value="Admin">Admin</option>
                                <option value="Driver">Driver</option>
                                <option value="Passenger">Passenger</option>
                            </select>
                        </td>
                        <td className="p-3">
                            <select
                                value={user.status}
                                onChange={e => ChangeStatus(user.id, e.target.value)}
                                className="border rounded px-2 py-1"
                            >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
