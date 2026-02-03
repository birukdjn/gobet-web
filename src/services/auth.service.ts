import api from "@/lib/api";

export const authService = {
    login: (data: { email: string; password: string }) =>
        api.post("/Auth/login", data),
    register: (data: any) => api.post("/Auth/register", data),
    forgotPassword: (email: string) =>
        api.post("/Auth/forgot-password", { email }),
    resetPassword: (data: any) => api.post("/Auth/reset-password", data),
};
