"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    clearToken,
    getPrimaryRole,
    getToken,
    getUserFromToken,
    saveToken,
} from "@/auth/auth.service";

type User = {
    fullname?: string;
    id?: string;
    email?: string;
    role: string;
    roles?: string[];
};

type AuthContextType = {
    user: User | null;
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
    loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    // Load session on refresh
    useEffect(() => {
        const stored = getToken();
        if (!stored) {
            setLoading(false);
            return;
        }

        const userData = getUserFromToken();
        if (!userData) {
            clearToken();
            setLoading(false);
            return;
        }

        setUser({
            ...userData,
            role: userData.role || "Passenger",
        });
        setToken(stored);
        setLoading(false);
    }, []);



    const login = (jwt: string) => {
        saveToken(jwt);

        const userData = getUserFromToken();
        if (!userData) return;

        const userWithRole = {
            ...userData,
            role: userData.role || "Passenger",
        };

        setUser(userWithRole);
        setToken(jwt);

        switch (userWithRole.role) {
            case "Admin":
                router.replace("/admin");
                break;
            case "Driver":
                router.replace("/driver");
                break;
            default:
                router.replace("/passenger");
        }
    };

    const logout = () => {
        clearToken();
        setUser(null);
        setToken(null);
        router.replace("/login");
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuthContext() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuthContext must be used inside AuthProvider");
    return ctx;
}
