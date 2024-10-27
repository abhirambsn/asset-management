import { TenantProviderContext } from "@/components/providers/tenant-provider";
import { useContext } from "react";

export const useTenant = () => {
    const context = useContext(TenantProviderContext);

    if (context === undefined) {
        throw new Error("useTenant must be used within a TenantProvider");
    }

    return context;
}