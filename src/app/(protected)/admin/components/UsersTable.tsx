"use client";

import { useEffect, useState, useMemo } from "react";
import api from "@/lib/api";
import ConfirmationModal from "./ConfirmationModal";
import { ChevronUp, ChevronDown, ArrowUpDown, Clock, Search } from "lucide-react";
import Input from "@/components/ui/Input";

type User = {
    id: string;
    fullName: string;
    email: string;
    role: string;
    isActive: boolean;
    lastLoginDate: string;
};

type SortConfig = {
    key: keyof User | null;
    direction: "asc" | "desc";
};

export default function UsersTable() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: "asc" });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userToToggle, setUserToToggle] = useState<User | null>(null);

    const [searchTerm, setSearchTerm] = useState("");



    useEffect(() => {
        api.get("/admin/users")
            .then(res => setUsers(res.data))
            .finally(() => setLoading(false));
    }, []);
    const sortedUsers = useMemo(() => {
        let sortableUsers = [...users];
        if (sortConfig.key !== null) {
            sortableUsers.sort((a, b) => {
                const key = sortConfig.key!;
                let aValue = a[key];
                let bValue = b[key];

                // 1. Handle Date Sorting specifically
                if (key === "lastLoginDate") {
                    const aStr = aValue as string;
                    const bStr = bValue as string;
                    const aTime = aStr ? new Date(aStr.endsWith("Z") ? aStr : `${aStr}Z`).getTime() : 0;
                    const bTime = bStr ? new Date(bStr.endsWith("Z") ? bStr : `${bStr}Z`).getTime() : 0;
                    return sortConfig.direction === "asc" ? aTime - bTime : bTime - aTime;
                }

                // 2. Handle Boolean Sorting (isActive)
                if (typeof aValue === "boolean" && typeof bValue === "boolean") {
                    return sortConfig.direction === "asc"
                        ? (aValue === bValue ? 0 : aValue ? -1 : 1)
                        : (aValue === bValue ? 0 : aValue ? 1 : -1);
                }

                // 3. Standard string sorting (Name, Email, Role)
                const aString = String(aValue).toLowerCase();
                const bString = String(bValue).toLowerCase();

                if (aString < bString) return sortConfig.direction === "asc" ? -1 : 1;
                if (aString > bString) return sortConfig.direction === "asc" ? 1 : -1;
                return 0;
            });
        }
        return sortableUsers;
    }, [users, sortConfig]);

    const requestSort = (key: keyof User) => {
        let direction: "asc" | "desc" = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    };

    const getSortIcon = (key: keyof User) => {
        if (sortConfig.key !== key) return <ArrowUpDown size={14} className="inline ml-1 opacity-40" />;
        return sortConfig.direction === "asc"
            ? <ChevronUp size={14} className="inline ml-1 text-blue-600" />
            : <ChevronDown size={14} className="inline ml-1 text-blue-600" />;
    };


    const formatTimeAgo = (dateString: string | null) => {
        if (!dateString) return "Never";

        const fixedDateString = dateString.endsWith("Z") ? dateString : `${dateString}Z`;

        const lastLogin = new Date(fixedDateString);
        const now = new Date();

        const diffInMs = now.getTime() - lastLogin.getTime();
        const seconds = Math.floor(diffInMs / 1000);

        if (seconds < 60) return "Just now";

        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes}m ago`;

        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours}h ago`;

        const days = Math.floor(hours / 24);
        if (days < 7) return `${days}d ago`;

        return lastLogin.toLocaleDateString();
    };

    const changeRole = async (userId: string, newRole: string) => {
        try {
            await api.patch(`/admin/users/${userId}/role`, { role: newRole });
            setUsers(prev => prev.map(u => (u.id === userId ? { ...u, role: newRole } : u)));
        } catch (error: any) {
            alert(error.response?.data?.message || "Failed to update role.");
        }
    };

    const handleStatusButtonClick = (user: User) => {
        setUserToToggle(user);
        setIsModalOpen(true);
    };

    const handleConfirmToggle = async () => {
        if (!userToToggle) return;
        try {

            await api.patch(`/admin/users/${userToToggle.id}/status`);

            setUsers(prev =>
                prev.map(u => (u.id === userToToggle.id ? { ...u, isActive: !u.isActive } : u))
            );
        } catch (error: any) {
            alert(error.response?.data || "Update failed. Check admin privileges.");
        } finally {
            setIsModalOpen(false);
            setUserToToggle(null);
        }
    };

    const filteredUsers = useMemo(() => {
        return sortedUsers.filter(user =>
            user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [sortedUsers, searchTerm]);

    if (loading) return <p className="p-10 text-center text-gray-500">Loading users...</p>;

    return (
        <div className="overflow-x-auto p-4">
            <div className="mb-6 flex gap-4">
                <div className="relative flex-1">
                    <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                        <Search size={18} />
                    </span>
                    <Input
                        className="pl-10"
                        placeholder="Search users by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            <table className="w-full border-collapse bg-white shadow rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                    <tr className="text-gray-600 font-medium border-b select-none">
                        <th onClick={() => requestSort("fullName")} className="p-3 text-left cursor-pointer hover:bg-gray-200 transition-colors">
                            Name {getSortIcon("fullName")}
                        </th>
                        <th className="p-3 text-left">Email</th>
                        <th onClick={() => requestSort("role")} className="p-3 text-left cursor-pointer hover:bg-gray-200 transition-colors">
                            Role {getSortIcon("role")}
                        </th>
                        <th onClick={() => requestSort("lastLoginDate")} className="p-3 text-left cursor-pointer hover:bg-gray-200">
                            Last Login {getSortIcon("lastLoginDate")}
                        </th>
                        <th onClick={() => requestSort("isActive")} className="p-3 text-left cursor-pointer hover:bg-gray-200 transition-colors">
                            Status {getSortIcon("isActive")}
                        </th>
                        <th className="p-3 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedUsers.map(user => (
                        <tr key={user.id} className="border-b hover:bg-gray-50 transition-colors">
                            <td className="p-3 font-medium text-gray-700">{user.fullName}</td>
                            <td className="p-3 text-sm text-gray-500">{user.email}</td>
                            <td className="p-3">
                                <span className="text-xs font-mono bg-blue-50 text-blue-600 px-2 py-1 rounded">
                                    {user.role}
                                </span>
                            </td>
                            <td className="p-3 text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                    <Clock size={14} className="text-gray-300" />
                                    {formatTimeAgo(user.lastLoginDate)}
                                </div>
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
                                    className="border rounded px-2 text-gray-500 py-1 text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none"
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

            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirmToggle}
                title="Change User Access"
                message={`Are you sure you want to ${userToToggle?.isActive ? "deactivate" : "activate"} ${userToToggle?.fullName}?`}
                confirmText={userToToggle?.isActive ? "Deactivate" : "Activate"}
                type={userToToggle?.isActive ? "danger" : "info"}
            />
        </div>
    );
}