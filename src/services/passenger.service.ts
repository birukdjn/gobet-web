import api from "@/lib/api";

export const passengerService = {
    findBuses: (params?: any) => api.get("/passenger/find-buses", { params }),
    nearestTerminalBuses: () => api.get("/passenger/nearest-terminal-buses"),
    bookPickup: (data: any) => api.post("/passenger/book-pickup", data),
};
