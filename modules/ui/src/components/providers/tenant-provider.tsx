/* eslint-disable react-refresh/only-export-components */
import { TenantService } from "@/service/TenantService";
import { useAuthStore } from "@/store/auth-store";
import { useWorkspace } from "@/store/workspace";
import { TENANTS } from "@/utils/constants";
import { getSubdomain } from "@/utils/helper";
import { useQuery } from "@tanstack/react-query";
import { createContext } from "react";

type TenantProviderState = {
  tenant: Tenant | TenantMetadata;
  subdomain: string;
  invalidateTenant: () => void;
  workspaces: WorkspaceList;
  PERSONAL_WORKSPACE: Workspace;
  invalidateWorkspace: () => void;
};

const initialState: TenantProviderState = {
  tenant: TENANTS[0],
  invalidateTenant: () => {},
  subdomain: "",
  workspaces: [],
  PERSONAL_WORKSPACE: {} as Workspace,
  invalidateWorkspace: () => {},
};

export const TenantProviderContext = createContext(initialState);

export const TenantProvider = ({
  children,
  ...props
}: {
  children: React.ReactNode;
}) => {
  const tenantService = new TenantService();
  const subdomain = getSubdomain(window.location.hostname);
  const authState = useAuthStore();
  const { setWorkspaces } = useWorkspace();
  let isMeta = true;
  let PERSONAL_WORKSPACE: Workspace = {} as Workspace;

  console.log("Subdomain", subdomain);

  let tenant: Tenant | TenantMetadata;
  let workspaces: WorkspaceList = [];

  const fetchTenant = async () => {
    const tenant = await tenantService.getTenant(subdomain, authState.token);
    console.log("Fetching tenant from api");
    return tenant;
  };

  const fetchTenantMetadata = async () => {
    const tenantMeta = await tenantService.getTenantMetadata(subdomain);
    console.log("Fetching tenant metadata from api");
    return tenantMeta;
  };

  const getTenant = async () => {
    if (authState.isAuthenticated) {
      isMeta = true;
      const tenantData = await fetchTenant();
      workspaces = tenantData.workspaces;
      PERSONAL_WORKSPACE = workspaces.find(
        (w) => w.id === "personal"
      ) as Workspace;
      return tenantData;
    } else {
      isMeta = false;
      return await fetchTenantMetadata();
    }
  };

  const fetchworkspacesByTenant = async () => {
    if (!tenant || !authState.isAuthenticated) return;
    const workspaces = await tenantService.getWorkspacesByTenant(
      subdomain,
      authState.token
    );
    setWorkspaces(workspaces);
    return workspaces;
  };

  const { data, refetch } = useQuery({
    queryKey: ["tenant", subdomain],
    queryFn: getTenant,
    staleTime: 1000 * 60 * 60,
  });

  const { refetch: refetchWorkspaces } = useQuery({
    queryKey: ["workspaces", subdomain],
    queryFn: fetchworkspacesByTenant,
    staleTime: 1000 * 60 * 60,
  });

  if (!data) {
    tenant = TENANTS[0];
  } else {
    console.log("FETCHED TENANT", data);
    tenant = data;
  }

  const invalidateTenant = async () => {
    if (isMeta) return;
    console.log("Invalidating tenant");
    await refetch();
  };

  const invalidateWorkspace = async () => {
    if (isMeta) return;
    console.log("Invalidating workspace");
    await refetchWorkspaces();
  };

  return (
    <TenantProviderContext.Provider
      value={{
        tenant,
        subdomain,
        invalidateTenant,
        invalidateWorkspace,
        workspaces,
        PERSONAL_WORKSPACE,
      }}
      {...props}
    >
      {children}
    </TenantProviderContext.Provider>
  );
};
