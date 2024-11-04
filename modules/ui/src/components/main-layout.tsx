import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import DashboardSidebar from "./dashboard-sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useTenant } from "@/hooks/tenant-hook";
import { useEffect } from "react";
import { useWorkspace } from "@/store/workspace";
import { buildTitle } from "@/utils/helper";
import Navbar from "./navbar";
import { Separator } from "./ui/separator";
import { useBreadcrumbNav } from "@/store/breadcrumb-nav";
import CreateAssetModal from "@/components/forms/create-asset";
import { useAuthStore } from "@/store/auth-store";

const MainLayout = () => {
  const {
    tenant,
    subdomain,
    invalidateTenant,
    invalidateWorkspace,
    PERSONAL_WORKSPACE,
  } = useTenant();
  const navigate = useNavigate();

  const { setCurrentWorkspace } = useWorkspace();
  const { addToNavStack } = useBreadcrumbNav();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!tenant || subdomain === "") {
      navigate("/landing");
    }
    if (!isAuthenticated) {
      navigate("/login");
    }
    invalidateTenant();
    invalidateWorkspace();
    document.title = buildTitle(tenant.name);

    if (window.location.pathname === "/") {
      setCurrentWorkspace(PERSONAL_WORKSPACE);
      navigate("/workspace/personal");
      addToNavStack({
        name: "Personal Workspace",
        path: "/workspace/personal",
      });
      return;
    }
  }, [
    tenant,
    navigate,
    setCurrentWorkspace,
    addToNavStack,
    subdomain,
    isAuthenticated,
    invalidateTenant,
    invalidateWorkspace,
    PERSONAL_WORKSPACE,
  ]);

  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="w-full">
        <Navbar SidebarTrigger={SidebarTrigger} />
        <Separator />
        <div className="p-3">
          <Outlet />
        </div>
      </main>
      <CreateAssetModal />
    </SidebarProvider>
  );
};

export default MainLayout;
