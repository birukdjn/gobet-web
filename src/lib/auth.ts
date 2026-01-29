import { jwtDecode } from "jwt-decode";

type JwtPayload = {
  sub: string;
  role: string | string[];
  exp: number;
};

export function saveToken(token: string) {
  localStorage.setItem("token", token);
}

export function getToken() {
  return localStorage.getItem("token");
}

export function logout() {
  localStorage.removeItem("token");
  window.location.href = "/login";
}

export function getUserRole(): string[] {
  const token = getToken();
  if (!token) return [];
  const decoded = jwtDecode<JwtPayload>(token);
  const roles = decoded.role;
  return Array.isArray(roles) ? roles : [roles];
}

export function isAuthenticated() {
  return !!getToken();
}
