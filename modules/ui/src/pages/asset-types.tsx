import AssetTypesDataTable from "@/components/data-tables/asset-types";
import CreateAssetTypeModal from "@/components/forms/create-asset-type";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTenant } from "@/hooks/tenant-hook";
import { useBreadcrumbNav } from "@/store/breadcrumb-nav";
import { useModalStore } from "@/store/create-modal";
import { Plus } from "lucide-react";
import { useEffect } from "react";

const AssetTypesPage = () => {
  const { tenant } = useTenant();
  const { addToNavStack, removeFromNavStack } = useBreadcrumbNav();
  const {openModal} = useModalStore();

  useEffect(() => {
    addToNavStack({ name: "Asset Types", path: "/types/hardware" });
    return () => {
      removeFromNavStack();
    };
  }, [addToNavStack, removeFromNavStack]);

  return (
    <section>
      <Card className="p-1">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl">Asset Types</CardTitle>
          <Button onClick={() => openModal('assetType')} variant="outline" className="p-2">
            <Plus />
          </Button>
        </CardHeader>
        <CardContent>
          <AssetTypesDataTable data={tenant.assetTypes} />
        </CardContent>
      </Card>
      <CreateAssetTypeModal />
    </section>
  );
};

export default AssetTypesPage;
