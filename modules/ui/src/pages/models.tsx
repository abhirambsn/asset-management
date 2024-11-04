import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useBreadcrumbNav } from "@/store/breadcrumb-nav";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AssetModelsDataTable from "@/components/data-tables/asset-models";
import CreateAssetModelModal from "@/components/forms/create-asset-model";
import { useModalStore } from "@/store/create-modal";
import { useWorkspace } from "@/store/workspace";

const ModelsPage = () => {
  const { currentWorkspace } = useWorkspace();
  const { addToNavStack, removeFromNavStack } = useBreadcrumbNav();
  const [assetType, setAssetType] = useState<string>("");
  const { openModal } = useModalStore();

  useEffect(() => {
    addToNavStack({ name: "Asset Models", path: "/types/models" });
    return () => {
      removeFromNavStack();
    };
  }, [addToNavStack, removeFromNavStack]);

  const getAssetModelsByType = () => {
    if (!currentWorkspace || assetType.length === 0) {
      return [];
    }

    return currentWorkspace.assetModels.filter(
      (model) => model.typeId === assetType
    );
  };

  return (
    <section>
      <Card className="p-1">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl">Asset Models</CardTitle>
          <Button onClick={() => openModal("model")} variant="outline">
            <Plus />
          </Button>
        </CardHeader>
        <CardContent>
          <Select
            onValueChange={(value) => {
              setAssetType(value);
            }}
            value={assetType}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select an Asset Type" />
            </SelectTrigger>
            <SelectContent>
              {currentWorkspace &&
                currentWorkspace.assetTypes.map((assetType) => (
                  <SelectItem key={assetType.id} value={assetType.id}>
                    {assetType.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>

          {currentWorkspace && assetType.length > 0 && (
            <AssetModelsDataTable data={getAssetModelsByType()} />
          )}
        </CardContent>
      </Card>
      <CreateAssetModelModal />
    </section>
  );
};

export default ModelsPage;
