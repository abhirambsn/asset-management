import MainLayout from "@/components/main-layout";
import DashboardPage from "@/pages/dashboard";
import LoginPage from "@/pages/login";
import NotificationPage from "@/pages/notification";
import RegisterPage from "@/pages/register";
import SettingsPage from "@/pages/settings";
import { RouteObject } from "react-router-dom";

export const ROUTES: RouteObject[] = [
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/workspace/:workspaceId",
                element: <DashboardPage />
            },
            {
                path: "notifications",
                element: <NotificationPage />
            },
            {
                path: "settings",
                element: <SettingsPage />
            },
            {
                path: "users",
                element: <div>Users</div>
            },
            {
                path: "/types/hardware",
                element: <div>Hardware</div>
            },
            {
                path: "/types/models",
                element: <div>Asset Models</div>
            },
            {
                path: "/types/os",
                element: <div>OS</div>
            },
            {
                path: "/types/os-versions",
                element: <div>OS Versions</div>
            }
        ]
    },
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: '/register',
        element: <RegisterPage />
    }
];