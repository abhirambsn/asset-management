import OSTypesDataTable from "@/components/data-tables/os"
import CreateOSModal from "@/components/forms/create-os"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useTenant } from "@/hooks/tenant-hook"
import { useBreadcrumbNav } from "@/store/breadcrumb-nav"
import { useModalStore } from "@/store/create-modal"
import { Plus } from "lucide-react"
import { useEffect } from "react"

const OSPage = () => {
    const {tenant} = useTenant();
    const {addToNavStack, removeFromNavStack} = useBreadcrumbNav();
    const {openModal} = useModalStore();

    useEffect(() => {
        addToNavStack({name: "Operating System Types", path: "/types/os"});
        return () => {
            removeFromNavStack();
        };
    }, [addToNavStack, removeFromNavStack]);
  return (
    <section>
        <Card className="p-1">
            <CardHeader className="flex flex-row items-center justify-between">
                <h2 className="text-xl">Operating Systems</h2>
                <Button onClick={() => openModal('os')} variant='outline'>
                    <Plus />
                </Button>
            </CardHeader>
            <CardContent>
                <OSTypesDataTable data={tenant.osTypes} />
            </CardContent>
        </Card>
        <CreateOSModal />
    </section>
  )
}

export default OSPage