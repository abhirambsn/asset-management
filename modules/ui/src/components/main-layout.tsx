import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import DashboardSidebar from "./dashboard-sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useTenant } from "@/hooks/tenant-hook";
import { useEffect } from "react";
import { useCurrentWorkspace } from "@/store/workspace";
import { buildTitle } from "@/utils/helper";

const MainLayout = () => {
  const {tenant} = useTenant();
  const navigate = useNavigate();

  const {setCurrentWorkspace} = useCurrentWorkspace();

  useEffect(() => {
    if (!tenant) {
      navigate("/register");
    }

    if (window.location.pathname === "/") {
      navigate("/personal");
    }

    const personalWorkspace = {id: 'personal', name: "Personal Workspace" };

    setCurrentWorkspace(personalWorkspace);
    document.title = buildTitle(tenant.name);

  }, [tenant, navigate, setCurrentWorkspace]);

  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main>
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default MainLayout;
