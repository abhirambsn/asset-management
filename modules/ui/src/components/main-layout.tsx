import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import DashboardSidebar from "./dashboard-sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useTenant } from "@/hooks/tenant-hook";
import { useEffect } from "react";
import { useCurrentWorkspace } from "@/store/workspace";
import { buildTitle } from "@/utils/helper";
import Navbar from "./navbar";
import { Separator } from "./ui/separator";
import { useBreadcrumbNav } from "@/store/breadcrumb-nav";
import { PERSONAL_WORKSPACE } from "@/utils/constants";
import CreateAssetModal from "./create-asset-modal";

const MainLayout = () => {
  const {tenant} = useTenant();
  const navigate = useNavigate();

  const {setCurrentWorkspace} = useCurrentWorkspace();
  const {addToNavStack} = useBreadcrumbNav();

  useEffect(() => {
    if (!tenant) {
      navigate("/register");
    }
    document.title = buildTitle(tenant.name);

    if (window.location.pathname === "/") {
      setCurrentWorkspace(PERSONAL_WORKSPACE);
      navigate("/workspace/personal");
      addToNavStack(PERSONAL_WORKSPACE);
      return;
    }
  }, [tenant, navigate, setCurrentWorkspace, addToNavStack]);

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
