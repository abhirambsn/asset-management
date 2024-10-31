import MyBarChart from "@/components/charts/bar-chart";
import MyLineChart from "@/components/charts/line-chart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UsersDataTable from "@/components/data-tables/users";
import { useTenant } from "@/hooks/tenant-hook";
import { useBreadcrumbNav } from "@/store/breadcrumb-nav";
import { DONUT_CHART_DATA_SERVICE_OUTPUT_USERS, DONUT_CHART_USERS_CONFIG, LINE_CHART_CONFIG, LINE_CHART_USER_TREND } from "@/utils/constants";
import { Plus } from "lucide-react";
import { useEffect } from "react";
import { useModalStore } from "@/store/create-modal";
import CreateUserModal from "@/components/forms/create-user";

const UsersPage = () => {
  const { tenant } = useTenant();
  const { addToNavStack, removeFromNavStack } = useBreadcrumbNav();
  const {openModal} = useModalStore();

  useEffect(() => {
    addToNavStack({ name: "Users", path: "/users" });
    return () => {
      removeFromNavStack();
    };
  }, [addToNavStack, removeFromNavStack]);
  return (
    <section className="grid grid-cols-2 gap-3">
      <Card className="bg-sidebar p-1">
        <CardHeader>
          <CardTitle>Users by Role</CardTitle>
          <CardContent>
            <MyBarChart data={DONUT_CHART_DATA_SERVICE_OUTPUT_USERS} config={DONUT_CHART_USERS_CONFIG} dataKey="count" nameKey="role" />
          </CardContent>
        </CardHeader>
      </Card>

      <Card className="bg-sidebar p-1">
        <CardHeader>
          <CardTitle>User trend</CardTitle>
          <CardContent>
            <MyLineChart data={LINE_CHART_USER_TREND} config={LINE_CHART_CONFIG} dataKey="count" nameKey="month" />
          </CardContent>
        </CardHeader>
      </Card>

      <Card className="col-span-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>All Users</CardTitle>
          <Button onClick={() => openModal('user')} variant='outline'>
            <Plus className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <UsersDataTable data={tenant.users} />
        </CardContent>
      </Card>
      <CreateUserModal />
    </section>
  );
};

export default UsersPage;
