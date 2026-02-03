import api from "@/lib/api";

export const driverService = {
    requestDriver: () => api.post("/Driver/request-driver"),
    myRequestStatus: () => api.get("/Driver/my-request-status"),
     getAvailableRoutes: () => api.get("/admin/routes"), // Drivers need to see what admins created
    createTrip: (data: any) => api.post("/Trips", data),
    getMyTrips: () => api.get("/Trips/my-trips"),
};
