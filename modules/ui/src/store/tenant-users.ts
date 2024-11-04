import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTenantUsers = create(
  persist<TenantUsersState>(
    (set) => ({
      users: [],
      setUsers: (users) => set({ users }),
      invalidateTenantUsers: () => set({ users: [] }),
    }),
    {
      name: "tenant-users",
    }
  )
);
