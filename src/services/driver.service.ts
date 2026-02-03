import api from "@/lib/api";

export const driverService = {
    // Auth & Profile
    myRequestStatus: () => api.get("/Driver/my-request-status"),

    // Trip Lifecycle (OAS 3.0 Endpoints)
    getAvailableRoutes: () => api.get("/admin/routes"),
    createTrip: (data: { destination: string; totalSeats: number; routeId: string; busPlateNumber: string }) =>
        api.post("/Trips", data),
    startTrip: (id: string) => api.post(`/Trips/${id}/start`),
    completeTrip: (id: string) => api.post(`/Trips/${id}/complete`),
    updateLocation: (id: string, lat: number, lng: number) =>
        api.put(`/Trips/${id}/location`, { latitude: lat, longitude: lng }),
    getTripDetails: (id: string) => api.get(`/Trips/${id}`),
};