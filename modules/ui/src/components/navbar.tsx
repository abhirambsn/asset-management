import React, { Fragment, useEffect } from "react";
import BreadcrumbNav from "./breadcrumb-nav";
import ThemeToggle from "./theme-toggle";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Bell, BellDotIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import NotificationList from "./notification-list";
import { useNotificationStore } from "@/store/notifications";
import { NOTIFICATIONS } from "@/utils/constants";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";

type NavbarProps = {
  SidebarTrigger: React.FC;
};

const Navbar = ({ SidebarTrigger }: NavbarProps) => {
  const { addNotification, clearNotifications, notifications } =
    useNotificationStore();
  useEffect(() => {
    NOTIFICATIONS.map((n) => addNotification(n));

    return () => {
      clearNotifications();
    };
  }, [addNotification, clearNotifications]);
  return (
    <nav className="flex items-center p-2.5 gap-4 bg-sidebar">
      <SidebarTrigger />
      <div className="flex-1">
        <BreadcrumbNav />
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">
            {notifications.length > 0 ? (
              <Fragment>
                <BellDotIcon className="h-[1.2rem] w-[1.2rem] text-primary" />
                <Badge className="rounded-full text-[0.5rem]">
                  {notifications.length}
                </Badge>
              </Fragment>
            ) : (
              <Bell className="h-[1.2rem] w-[1.2rem] text-primary" />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[400px]">
          <div className="flex items-center justify-between pb-2">
            <h2 className="text-lg">Notifications</h2>
            <Button onClick={clearNotifications} variant="outline" size="icon">
              <XIcon className="h-2 w-2 text-muted-foreground" />
            </Button>
          </div>
          <Separator />
          <NotificationList />
        </PopoverContent>
      </Popover>
      <ThemeToggle />
    </nav>
  );
};

export default Navbar;
