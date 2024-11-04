/* eslint-disable react-refresh/only-export-components */
import { useEndpoint } from "@/hooks/endpoint-hook";
import { useAuthStore } from "@/store/auth-store";
import { useLoading } from "@/store/loading";
import { useTenantStore } from "@/store/tenant";
import { useTenantUsers } from "@/store/tenant-users";
import { useUser } from "@/store/user";
import { useWorkspace } from "@/store/workspace";
import { getSubdomain } from "@/utils/helper";
import { createContext, useCallback, useEffect } from "react";

type TenantProviderState = {
  tenant: Tenant;
  subdomain: string;
};

const initialState: TenantProviderState = {
  tenant: {} as Tenant,
  subdomain: "",
};

export const TenantProviderContext = createContext(initialState);

export const TenantProvider = ({
  children,
  ...props
}: {
  children: React.ReactNode;
}) => {
  const { tenantService, userService } = useEndpoint();
  const subdomain = getSubdomain(window.location.hostname);
  const authState = useAuthStore();
  const { setWorkspaces, setPersonalWorkspace, setCurrentWorkspace } =
    useWorkspace();
  const { user } = useUser();
  const { setTenant, tenant } = useTenantStore();
  const { setUsers } = useTenantUsers();
  const { setLoading } = useLoading();

  const fetchTenant = useCallback(async () => {
    const tenant = await tenantService.getTenant(subdomain, authState.token);
    console.log("Fetching tenant from api");
    return tenant;
  }, [subdomain, tenantService, authState.token]);

  const fetchTenantMetadata = useCallback(async () => {
    const tenantMeta = await tenantService.getTenantMetadata(subdomain);
    console.log("Fetching tenant metadata from api");
    return tenantMeta;
  }, [subdomain, tenantService]);

  const getTenant = useCallback(async () => {
    if (authState.isAuthenticated) {
      return await fetchTenant();
    } else {
      const tenantMeta = await fetchTenantMetadata();
      return {
        ...tenantMeta,
        workspaces: [] as WorkspaceList,
        users: [] as User[],
      } as Tenant;
    }
  }, [fetchTenant, fetchTenantMetadata, authState.isAuthenticated]);

  const fetchworkspacesByTenant = useCallback(async () => {
    if (!authState.isAuthenticated) return [];
    const workspaces = await tenantService.getWorkspacesByTenant(
      subdomain,
      authState.token
    );
    return workspaces;
  }, [authState.isAuthenticated, subdomain, authState.token, tenantService]);

  const fetchUsersByTenant = useCallback(async () => {
    console.log(user?.roles);
    if (!authState.isAuthenticated || (user && !user?.roles.includes("ADMIN")))
      return [];
    console.log("Fetching tenant users from API of tenant", subdomain);
    const users = await userService.getTenantUsers(authState.token, subdomain);
    console.log("Fetching tenant users from API", users);
    return users;
  }, [
    authState.isAuthenticated,
    user,
    userService,
    authState.token,
    subdomain,
  ]);

  useEffect(() => {
    if (!authState.isAuthenticated) return;
    setLoading(true);
    (async () => {
      console.log("Logged in as User", user);
      console.log("Fetching Tenant...");
      const tenant = await getTenant();
      console.log("Tenant", tenant);
      console.log("Fetching Tenant Users...");
      const tenantUsers = await fetchUsersByTenant();
      console.log("Tenant Users", tenantUsers);
      console.log("Fetching Tenant Workspaces...");
      const workspaces = await fetchworkspacesByTenant();
      console.log("Tenant Workspaces", workspaces);
      const personalWorkspace =
        workspaces.find((w) => w.name === `personal-${tenant.id}`) ||
        ({} as Workspace);

      console.log("Personal Workspace", personalWorkspace);

      setPersonalWorkspace(personalWorkspace);
      setCurrentWorkspace(personalWorkspace);
      setWorkspaces(workspaces);
      setUsers(tenantUsers);
      setTenant(tenant);
      setLoading(false);
    })();
  }, [
    getTenant,
    setTenant,
    fetchUsersByTenant,
    fetchworkspacesByTenant,
    setUsers,
    setWorkspaces,
    setPersonalWorkspace,
    setCurrentWorkspace,
    setLoading,
    authState.isAuthenticated,
    user,
  ]);

  return (
    <TenantProviderContext.Provider
      value={{
        tenant,
        subdomain,
      }}
      {...props}
    >
      {children}
    </TenantProviderContext.Provider>
  );
};
