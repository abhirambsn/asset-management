import AssetsDataTable from "@/components/assets-data-table";
import DonutChart from "@/components/donut-chart";
import StatsTable from "@/components/stats-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTenant } from "@/hooks/tenant-hook";
import {
  DATA_SERVICE_STATS,
  DONUT_CHART_ASSET_CLASS_CONFIG,
  DONUT_CHART_ASSET_OWNER_CONFIG,
  DONUT_CHART_DATA_SERVICE_OUTPUT_ASSET_CLASS,
  DONUT_CHART_DATA_SERVICE_OUTPUT_ASSET_OWNER,
} from "@/utils/constants";
import { useParams } from "react-router-dom";


const DashboardPage = () => {
  const params = useParams();
  const { tenant } = useTenant();
  console.log(params);
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
        <CardHeader>
          <h2 className="text-xl">My Assets</h2>
        </CardHeader>
        <CardContent>
          <AssetsDataTable data={tenant.assets} />
        </CardContent>
      </Card>
    </section>
  );
};

export default DashboardPage;
