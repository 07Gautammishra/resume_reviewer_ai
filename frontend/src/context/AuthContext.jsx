import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { authApi } from "@/api/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const queryClient = useQueryClient();

  const refresh = useCallback(async () => {
    try {
      const data = await authApi.me();
      setUser(data.user ?? null);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const login = useCallback(async (credentials) => {
    const data = await authApi.login(credentials);
    if (data.token) {
      localStorage.setItem("scanmycv_token", data.token);
    }
    setUser(data.user);
    // Clear old query cache to avoid showing stale data from a previous session
    queryClient.clear();
    return data.user;
  }, [queryClient]);

  const register = useCallback(async (payload) => {
    const data = await authApi.register(payload);
    if (data.token) {
      localStorage.setItem("scanmycv_token", data.token);
    }
    setUser(data.user);
    queryClient.clear();
    return data.user;
  }, [queryClient]);

  const updateProfile = useCallback(async (payload) => {
    const data = await authApi.updateProfile(payload);
    setUser(data.user);
    return data.user;
  }, []);

  const logout = useCallback(() => {
    // 1. Optimistic synchronous session cleanup: instant UI responsiveness
    try {
      localStorage.removeItem("scanmycv_token");
    } catch {
      // Gracefully handle storage errors in restricted contexts
    }
    setUser(null);
    queryClient.clear();

    // 2. Non-blocking background session invalidation on server
    return authApi.logout().catch((err) => {
      console.warn("Background logout sync:", err?.message || err);
    });
  }, [queryClient]);

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, refresh, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
