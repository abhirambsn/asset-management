import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useBreadcrumbNav } from "@/store/breadcrumb-nav";
import { SETTINGS_TABSBAR } from "@/utils/constants";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SettingsPage = () => {
  const { addToNavStack, removeFromNavStack } = useBreadcrumbNav();
  const [currentSection, setCurrentSection] = useState<string>("general");
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      params.section &&
      SETTINGS_TABSBAR.find((tab) => tab.id === params.section)
    ) {
      setCurrentSection(params.section);
    }
    addToNavStack({ name: "Settings", path: "/settings" });
    return () => {
      removeFromNavStack();
    };
  }, [addToNavStack, removeFromNavStack, params]);

  const tabChange = (value: string) => {
    navigate(`/settings/${value}`);
  }

  return (
    <section className="gap-3 flex flex-col">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and billing here
        </p>
      </div>

      <Tabs
        defaultValue={currentSection}
        value={currentSection}
        onValueChange={tabChange}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
          {SETTINGS_TABSBAR.map((tab) => (
            <TabsTrigger className="gap-2" key={tab.id} value={tab.id}>
              <tab.icon className="h-4 w-4" />
              <span>{tab.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="general">
          <h3>General</h3>
        </TabsContent>
        <TabsContent value="security">
          <h3>Security</h3>
        </TabsContent>
        <TabsContent value="billing">
          <h3>Billing</h3>
        </TabsContent>
        <TabsContent value="notifications">
          <h3>Notifications</h3>
        </TabsContent>
        <TabsContent value="appearance">
          <h3>Appearance</h3>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default SettingsPage;
