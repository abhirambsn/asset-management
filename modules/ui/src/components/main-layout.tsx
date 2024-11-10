import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import DashboardSidebar from "./dashboard-sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useTenant } from "@/hooks/tenant-hook";
import { Fragment, useEffect } from "react";
import { useWorkspace } from "@/store/workspace";
import { buildTitle } from "@/utils/helper";
import Navbar from "./navbar";
import { Separator } from "./ui/separator";
import { useBreadcrumbNav } from "@/store/breadcrumb-nav";
import CreateAssetModal from "@/components/forms/create-asset";
import { useAuthStore } from "@/store/auth-store";
import { useLoading } from "@/store/loading";
import LoaderSkeleton from "./skeleton/loader-skeleton";
import CreateWorkspaceModal from "./forms/create-workspace";

const MainLayout = () => {
  const { tenant, subdomain } = useTenant();
  const navigate = useNavigate();

  const { setCurrentWorkspace, currentWorkspace, personalWorkspace } =
    useWorkspace();
  const { addToNavStack } = useBreadcrumbNav();
  const { isAuthenticated } = useAuthStore();
  const { loading, setLoading } = useLoading();

  useEffect(() => {
    if (!tenant || subdomain === "") {
      navigate("/landing");
    }
    if (!isAuthenticated) {
      navigate("/login");
    }
    document.title = buildTitle(tenant.name);

    if (window.location.pathname === "/") {
      setCurrentWorkspace(personalWorkspace || ({} as Workspace));

      navigate("/workspace/personal");
      addToNavStack({
        name: "Personal Workspace",
        path: "/workspace/personal",
      });
    }

    if (!currentWorkspace || !tenant) {
      setLoading(true);
      return;
    }
  }, [
    tenant,
    navigate,
    setCurrentWorkspace,
    addToNavStack,
    subdomain,
    isAuthenticated,
    personalWorkspace,
    currentWorkspace,
    setLoading,
  ]);

  return (
    <SidebarProvider>
      {!loading ? (
        <Fragment>
          <DashboardSidebar />
          <main className="w-full">
            <Navbar SidebarTrigger={SidebarTrigger} />
            <Separator />
            <div className="p-3">
              <Outlet />
            </div>
          </main>
        </Fragment>
      ) : (
        <LoaderSkeleton />
      )}
      <CreateAssetModal />
      <CreateWorkspaceModal />
    </SidebarProvider>
  );
};

export default MainLayout;
