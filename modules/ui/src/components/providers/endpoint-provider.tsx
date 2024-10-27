/* eslint-disable react-refresh/only-export-components */
import { TenantService } from "@/service/TenantService";
import { WorkspaceService } from "@/service/WorkspaceService";
import { createContext } from "react";

type EndpointProviderState = {
    tenantService: TenantService;
    workspaceService: WorkspaceService;
}

const initialState: EndpointProviderState = {
    tenantService: new TenantService(),
    workspaceService: new WorkspaceService()
}

export const EndpointProviderContext = createContext<EndpointProviderState>(initialState);

export const EndpointProvider = ({
    children,
    ...props
}: { children: React.ReactNode }) => {
    const value = {
        tenantService: new TenantService(),
        workspaceService: new WorkspaceService()
    }

    return (
        <EndpointProviderContext.Provider value={value} {...props}>
            {children}
        </EndpointProviderContext.Provider>
    )
}