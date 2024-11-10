/* eslint-disable react-refresh/only-export-components */
import { useEndpoint } from "@/hooks/endpoint-hook";
import { useAuthStore } from "@/store/auth-store";
import { useLoading } from "@/store/loading";
import { useTenantStore } from "@/store/tenant";
import { useTenantMetadata } from "@/store/tenant-metadata";
import { useTenantUsers } from "@/store/tenant-users";
import { useUser } from "@/store/user";
import { useWorkspace } from "@/store/workspace";
import { getSubdomain } from "@/utils/helper";
import { AxiosError } from "axios";
import { createContext, useCallback, useEffect } from "react";
import { redirect } from "react-router-dom";

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
  const {
    setWorkspaces,
    setPersonalWorkspace,
    setCurrentWorkspace,
    clearState,
  } = useWorkspace();
  const { user } = useUser();
  const { setTenant, tenant, invalidateTenant } = useTenantStore();
  const { setUsers, invalidateTenantUsers } = useTenantUsers();
  const { setLoading } = useLoading();
  const { setTenantMetadata, invalidateTenantMetadata } = useTenantMetadata();

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

  const fetchworkspacesByTenant = useCallback(async () => {
    if (!authState.isAuthenticated) return [];
    const workspaces = await tenantService.getWorkspacesByTenant(
      subdomain,
      authState.token
    );
    return workspaces;
  }, [authState.isAuthenticated, subdomain, authState.token, tenantService]);

  const fetchUsersByTenant = useCallback(async () => {
    if (
      !authState.isAuthenticated ||
      (Object.keys(user).length > 0 && !user?.roles.includes("ADMIN"))
    )
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
    setLoading(true);
    (async () => {
      if (subdomain === "") {
        invalidateTenant();
        invalidateTenantMetadata();
        invalidateTenantUsers();
        clearState();
        redirect("/register");
        return;
      }
      console.log("Logged in as User", user);
      if (authState.isAuthenticated) {
        try {
          console.log("Fetching Tenant...");
          const tenant = await fetchTenant();
          console.log("Tenant", tenant);
          setTenant(tenant);
          console.log("Fetching Tenant Users...");
          const tenantUsers = await fetchUsersByTenant();
          console.log("Tenant Users", tenantUsers);
          console.log("Fetching Tenant Workspaces...");
          const workspaces = await fetchworkspacesByTenant();
          console.log("Tenant Workspaces", workspaces);
          const personalWorkspace =
            workspaces.find((w) => w.id === `personal-${tenant.id}`) ||
            ({} as Workspace);

          console.log("Personal Workspace", personalWorkspace);

          setPersonalWorkspace(personalWorkspace);
          setCurrentWorkspace(personalWorkspace);
          setWorkspaces(workspaces);
          setUsers(tenantUsers);
        } catch (err: AxiosError | unknown) {
          if (err instanceof AxiosError) {
            console.log("Error fetching tenant", err.response?.data);
            if (err.response?.status === 401) {
              authState.logout();
              window.location.href = "/login";
            }
          } else {
            console.log("Error fetching tenant", err);
          }

          setLoading(false);
        }
      } else {
        console.log("Fetching tenant metadata");
        const tenantMeta = await fetchTenantMetadata();
        console.log("Tenant Metadata", tenantMeta);
        setTenantMetadata(tenantMeta);
      }
      setLoading(false);
    })();
  }, [
    fetchTenant,
    setTenant,
    fetchUsersByTenant,
    fetchworkspacesByTenant,
    setUsers,
    setWorkspaces,
    setPersonalWorkspace,
    setCurrentWorkspace,
    setLoading,
    setTenantMetadata,
    fetchTenantMetadata,
    clearState,
    invalidateTenant,
    invalidateTenantMetadata,
    invalidateTenantUsers,
    subdomain,
    authState,
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
