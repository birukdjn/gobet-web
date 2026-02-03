import api from "@/lib/api";

export const driverService = {
    requestDriver: () => api.post("/Driver/request-driver"),
    myRequestStatus: () => api.get("/Driver/my-request-status"),
};
