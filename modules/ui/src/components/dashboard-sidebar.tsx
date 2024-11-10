import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { ADMIN_SIDEBAR_MENU, SIDEBAR_MENU } from "@/utils/constants";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ChevronUp, CogIcon, LogOutIcon, Plus, User2 } from "lucide-react";
import { getAvatarUrl } from "@/utils/helper";
import { useWorkspace } from "@/store/workspace";
import { Link, useNavigate } from "react-router-dom";
import { Separator } from "./ui/separator";
import { useBreadcrumbNav } from "@/store/breadcrumb-nav";
import { useAuthStore } from "@/store/auth-store";
import { useEffect, useState } from "react";
import { useUser } from "@/store/user";
import { useTenantMetadata } from "@/store/tenant-metadata";
import { useTenantStore } from "@/store/tenant";
import { useTenantUsers } from "@/store/tenant-users";
import { useModalStore } from "@/store/create-modal";

const DashboardSidebar = () => {
  const navigate = useNavigate();

  const { tenant, invalidateTenant } = useTenantStore();
  const { user, invalidateUser } = useUser();
  const { invalidateTenantMetadata } = useTenantMetadata();

  const { currentWorkspace, setCurrentWorkspace, workspaces, clearState } =
    useWorkspace();
  const { addToNavStack, removeFromNavStack } = useBreadcrumbNav();
  const { logout } = useAuthStore();
  const { invalidateTenantUsers } = useTenantUsers();

  const [workspacesQuota, setWorkspacesQuota] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);

  const { openModal } = useModalStore();

  const handleChangeWorkspace = (workspaceId: string) => {
    const workspace = workspaces.find(
      (workspace) => workspace.id === workspaceId
    );
    if (workspace) {
      setCurrentWorkspace(workspace);
      removeFromNavStack();
      navigate(`/workspace/${workspace.id}`);
      addToNavStack({
        name: workspace.name,
        path: `/workspace/${workspace.id}`,
      });
    }
  };

  useEffect(() => {
    setWorkspacesQuota(tenant?.workspaces?.length || 0);
  }, [tenant]);

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      setIsAdmin(user.roles.includes("ADMIN"));
    }
  }, [user]);

  const logoutUser = () => {
    console.log("Logging out...");
    invalidateTenant();
    invalidateUser();
    invalidateTenantMetadata();
    invalidateTenantUsers();
    clearState();
    logout();
    navigate("/login");
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  {currentWorkspace ? (
                    <>
                      <img
                        className="w-7 h-7 rounded-lg"
                        src={
                          currentWorkspace.avatar ||
                          getAvatarUrl(currentWorkspace.name)
                        }
                      />
                      <span>{currentWorkspace.name}</span>
                    </>
                  ) : (
                    "Select workspace"
                  )}
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                <DropdownMenuLabel>My Workspaces</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {workspaces.map((workspace) => (
                  <DropdownMenuItem
                    onClick={() => handleChangeWorkspace(workspace.id)}
                    key={workspace.id}
                  >
                    <img
                      className="w-8 h-8 rounded-lg"
                      src={workspace.avatar || getAvatarUrl(workspace.name)}
                    />
                    <span>{workspace.name}</span>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => openModal("workspace")}>
                  <Plus />
                  <span>Create Workspace</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {SIDEBAR_MENU.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={
                        item.url === ""
                          ? `/workspace/${currentWorkspace?.id}`
                          : item.url
                      }
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {isAdmin && (
          <SidebarGroup>
            <SidebarGroupLabel>Admin Actions</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {ADMIN_SIDEBAR_MENU.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        to={
                          item.url === ""
                            ? `/${currentWorkspace?.id}`
                            : item.url
                        }
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="mb-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              Workspace Quota: {workspacesQuota}/4
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> {user?.firstName} {user?.lastName}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem asChild>
                  <Link to="/settings">
                    <CogIcon />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logoutUser} className="text-red-500">
                  <LogOutIcon />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
          <Separator className="my-2" />
          <SidebarMenuItem>
            <SidebarMenuButton>
              <img
                className="h-7 w-7 rounded-lg"
                src={getAvatarUrl(tenant.name)}
              />
              <span>{tenant.name}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;
