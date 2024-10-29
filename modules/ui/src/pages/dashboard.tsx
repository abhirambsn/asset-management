import AssetsDataTable from "@/components/assets-data-table";
import { useTenant } from "@/hooks/tenant-hook";
import { useParams } from "react-router-dom"

const DashboardPage = () => {
  const params = useParams();
  const {tenant} = useTenant();
  console.log(params);
  return (
    <section>
        <AssetsDataTable data={tenant.assets} />
    </section>
  )
}

export default DashboardPage