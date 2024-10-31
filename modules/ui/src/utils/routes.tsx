import MainLayout from "@/components/main-layout";
import AssetTypesPage from "@/pages/asset-types";
import DashboardPage from "@/pages/dashboard";
import LoginPage from "@/pages/login";
import ModelsPage from "@/pages/models";
import NotificationPage from "@/pages/notification";
import OSPage from "@/pages/os"; 
import RegisterPage from "@/pages/register";
import SettingsPage from "@/pages/settings";
import UsersPage from "@/pages/users";
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
                path: "settings/:section",
                element: <SettingsPage />
            },
            {
                path: "users",
                element: <UsersPage />
            },
            {
                path: "/types/hardware",
                element: <AssetTypesPage />
            },
            {
                path: "/types/models",
                element: <ModelsPage />
            },
            {
                path: "/types/os",
                element: <OSPage />
            },
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