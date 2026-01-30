import { jwtDecode } from "jwt-decode";

export type JwtPayload = {
    sub?: string;
    email?: string;
    exp?: number;
    role?: string | string[];
    roles?: string[];
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?: string | string[];
};

const TOKEN_KEY = "token";

export function saveToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
    localStorage.removeItem(TOKEN_KEY);
}

export function getToken() {
    return typeof window === "undefined" ? null : localStorage.getItem(TOKEN_KEY);
}

export function decodeToken(): JwtPayload | null {
    const token = getToken();
    if (!token) return null;
    try {
        return jwtDecode<JwtPayload>(token);
    } catch {
        return null;
    }
}

export function getUserRoles(): string[] {
    const decoded = decodeToken();
    if (!decoded) return [];

    const roles =
        decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ??
        decoded.roles ??
        decoded.role;

    if (!roles) return [];
    return Array.isArray(roles) ? roles : [roles];
}

export function getPrimaryRole(): string | null {
    const roles = getUserRoles();
    return roles.length ? roles[0] : null;
}

export function getUserFromToken() {
    const decoded = decodeToken();
    if (!decoded) return null;

    return {
        id: decoded.sub,
        email: decoded.email,
        roles: getUserRoles(),
        role: getPrimaryRole(),
    };
}

export function isAuthenticated() {
    return !!getToken();
}
