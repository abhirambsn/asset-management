/* eslint-disable react-refresh/only-export-components */
import { TenantService } from "@/service/TenantService";
import { TENANTS } from "@/utils/constants";
import { getSubdomain } from "@/utils/helper"
import { useQuery } from "@tanstack/react-query";
import { createContext } from "react";

type TenantProviderState = {
    tenant: Tenant
    subdomain?: string
}

const initialState: TenantProviderState = { tenant: TENANTS[0] }

export const TenantProviderContext = createContext(initialState);

export const TenantProvider = ({
    children,
    ...props
}: { children: React.ReactNode }) => {

    const tenantService = new TenantService();
    const subdomain = getSubdomain(window.location.hostname);
    console.log('Subdomain', subdomain);

    let tenant: Tenant;

    const fetchTenant = async () => {
        const tenant = await tenantService.getTenant(subdomain);
        console.log('Fetching tenant from api');
        return tenant;
    }

    const {data} = useQuery({queryKey: ['tenant', subdomain], queryFn: fetchTenant, staleTime: 1000 * 60 * 60});

    if (!data) {
        tenant = TENANTS[0];
    } else {
        console.log('FETCHED TENANT', data);
        tenant = data;
    }

    return (
        <TenantProviderContext.Provider value={{tenant, subdomain}} {...props}>
            {children}
        </TenantProviderContext.Provider>
    )
}

