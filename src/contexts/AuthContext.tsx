"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

type User = {
    role: string;
    email?: string;
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

    useEffect(() => {
        const stored = localStorage.getItem("token");
        if (!stored) {
            setLoading(false);
            return;
        }

        try {
            const payload: any = jwtDecode(stored);
            setUser({ role: payload.role, email: payload.email });
            setToken(stored);
        } catch {
            localStorage.removeItem("token");
        } finally {
            setLoading(false);
        }
    }, []);

    const login = (jwt: string) => {
        localStorage.setItem("token", jwt);
        const payload: any = jwtDecode(jwt);
        setUser({ role: payload.role, email: payload.email });
        setToken(jwt);

        if (payload.role === "Admin") router.push("/admin");
        else if (payload.role === "Driver") router.push("/driver");
        else router.push("/passenger");
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setToken(null);
        router.push("/login");
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
