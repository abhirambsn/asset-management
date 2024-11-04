import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      isAuthenticated: false,
      token: "",
      expiresAt: -1,
      authenticate: (token: string, expiresAt: number) =>
        set({ isAuthenticated: true, token, expiresAt }),
      logout: () => set({ isAuthenticated: false, token: "", expiresAt: 0 }),
    }),
    {
      name: "auth-storage",
    }
  )
);
