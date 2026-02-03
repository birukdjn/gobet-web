import api from "@/lib/api";

export const adminService = {
    getStats: () => api.get("/admin/stats"),
    getUsers: () => api.get("/admin/users"),
    getDriverRequests: () => api.get("/admin/driver-requests"),
    approveDriver: (userId: string) =>
        api.post(`/admin/approve-driver/${userId}`),
    rejectDriver: (userId: string) =>
        api.post(`/admin/reject-driver/${userId}`),
    updateUserRole: (userId: string, role: string) =>
        api.patch(`/admin/users/${userId}/role`, { role }),
    updateUserStatus: (userId: string, status: string) =>
        api.patch(`/admin/users/${userId}/status`, { status }),
};
