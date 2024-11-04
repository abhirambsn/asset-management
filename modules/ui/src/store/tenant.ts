import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTenantStore = create(
  persist<TenantState>(
    (set) => ({
      tenant: {} as Tenant,
      setTenant: (tenant: Tenant) => set({ tenant }),
      invalidateTenant: () => set({ tenant: {} as Tenant }),
    }),
    {
      name: "tenant",
    }
  )
);
