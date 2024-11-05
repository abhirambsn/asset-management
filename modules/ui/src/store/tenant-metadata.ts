import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTenantMetadata = create(
  persist<TenantMetadataState>(
    (set) => ({
      tenantMetadata: {} as TenantMetadata,
      setTenantMetadata: (tenantMetadata: TenantMetadata) =>
        set({ tenantMetadata }),
      invalidateTenantMetadata: () =>
        set({ tenantMetadata: {} as TenantMetadata }),
    }),
    { name: "tenant-metadata" }
  )
);
