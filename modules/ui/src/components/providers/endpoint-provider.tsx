/* eslint-disable react-refresh/only-export-components */
import { TenantService } from "@/service/TenantService";
import { UserService } from "@/service/UserService";
import { WorkspaceService } from "@/service/WorkspaceService";
import { createContext } from "react";

type EndpointProviderState = {
    tenantService: TenantService;
    workspaceService: WorkspaceService;
    userService: UserService;
}

const initialState: EndpointProviderState = {
    tenantService: new TenantService(),
    workspaceService: new WorkspaceService(),
    userService: new UserService(),
}

export const EndpointProviderContext = createContext<EndpointProviderState>(initialState);

export const EndpointProvider = ({
    children,
    ...props
}: { children: React.ReactNode }) => {
    const value = {
        tenantService: new TenantService(),
        workspaceService: new WorkspaceService(),
        userService: new UserService(),
    }

    return (
        <EndpointProviderContext.Provider value={value} {...props}>
            {children}
        </EndpointProviderContext.Provider>
    )
}