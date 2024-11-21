import AssetsDataTable from "@/components/data-tables/assets";
import DonutChart from "@/components/charts/donut-chart";
import StatsTable from "@/components/data-tables/stats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { useTenant } from "@/hooks/tenant-hook";
import {
  DATA_SERVICE_STATS,
  DONUT_CHART_ASSET_CLASS_CONFIG,
  DONUT_CHART_ASSET_OWNER_CONFIG,
  DONUT_CHART_DATA_SERVICE_OUTPUT_ASSET_CLASS,
  DONUT_CHART_DATA_SERVICE_OUTPUT_ASSET_OWNER,
} from "@/utils/constants";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useModalStore } from "@/store/create-modal";
import { Plus } from "lucide-react";
import { useWorkspace } from "@/store/workspace";
import { useEffect } from "react";
import { useTenant } from "@/hooks/tenant-hook";
import { useUser } from "@/store/user";

const DashboardPage = () => {
  const params = useParams();
  const { openModal } = useModalStore();
  const { subdomain } = useTenant();
  const { currentWorkspace, setCurrentWorkspace, workspaces } = useWorkspace();
  const {user} = useUser();

  useEffect(() => {
    if (!params.workspaceId) return;
    console.log("Workspace ID", params.workspaceId);
    const workspaceId =
      params.workspaceId === "personal"
        ? `personal-${subdomain}`
        : params.workspaceId;
    const workspace = workspaces.find(
      (workspace) => workspace.id === workspaceId
    );
    if (!workspace) {
      throw new Error("Workspace not found");
    }
    setCurrentWorkspace(workspace);
  }, [params, setCurrentWorkspace, workspaces, subdomain]);

  return (
    <section className="grid grid-cols-3 gap-3">
      <Card className="bg-sidebar p-1">
        <CardHeader>
          <CardTitle>Assets by classification</CardTitle>
        </CardHeader>
        <CardContent>
          <DonutChart
            data={DONUT_CHART_DATA_SERVICE_OUTPUT_ASSET_CLASS}
            config={DONUT_CHART_ASSET_CLASS_CONFIG}
            dataKey="count"
            nameKey="classification"
          />
        </CardContent>
      </Card>
      <Card className="bg-sidebar p-1">
        <CardHeader>
          <CardTitle>Assets by Owner</CardTitle>
        </CardHeader>
        <CardContent>
          <DonutChart
            data={DONUT_CHART_DATA_SERVICE_OUTPUT_ASSET_OWNER}
            config={DONUT_CHART_ASSET_OWNER_CONFIG}
            dataKey="count"
            nameKey="owner"
          />
        </CardContent>
      </Card>
      <Card className="bg-sidebar p-1">
        <CardHeader>
          <CardTitle>Tenant Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <StatsTable tableData={DATA_SERVICE_STATS} />
        </CardContent>
      </Card>
      <Card className="col-span-3">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl">My Assets</CardTitle>
          <Button
            variant="outline"
            size="icon"
            disabled={user && !(user?.roles.includes("ADMIN") || user?.roles.includes("WRITE"))}
            onClick={() => openModal("asset")}
          >
            <Plus />
          </Button>
        </CardHeader>
        <CardContent>
          <AssetsDataTable
            data={currentWorkspace ? currentWorkspace.assets : []}
          />
        </CardContent>
      </Card>
    </section>
  );
};

export default DashboardPage;
