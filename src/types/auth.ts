import { jwtDecode } from "jwt-decode";

type JwtPayload = {
  sub?: string;
  role?: string | string[];
  exp?: number;
  email?: string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?: string | string[];
};

const TOKEN_KEY = "token";

// --------------------
// Token helpers
// --------------------
export function saveToken(token: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function logout() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
  window.location.href = "/login";
}

// --------------------
// JWT helpers
// --------------------
export function decodeToken() {
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
