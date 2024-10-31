import MainLayout from "@/components/main-layout";
import AssetTypesPage from "@/pages/asset-types";
import DashboardPage from "@/pages/dashboard";
import NotFoundPage from "@/pages/error/not-found-404";
import LandingPage from "@/pages/landing-page";
import LoginPage from "@/pages/login";
import ModelsPage from "@/pages/models";
import OSPage from "@/pages/os"; 
import RegisterPage from "@/pages/register";
import SettingsPage from "@/pages/settings";
import UsersPage from "@/pages/users";
import { RouteObject } from "react-router-dom";

export const ROUTES: RouteObject[] = [
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <NotFoundPage />,
        children: [
            {
                path: "/workspace/:workspaceId",
                element: <DashboardPage />,
                errorElement: <NotFoundPage />,
            },
            {
                path: "settings",
                element: <SettingsPage />,
                errorElement: <NotFoundPage />,
            },
            {
                path: "settings/:section",
                element: <SettingsPage />,
                errorElement: <NotFoundPage />,
            },
            {
                path: "users",
                element: <UsersPage />,
                errorElement: <NotFoundPage />,
            },
            {
                path: "/types/hardware",
                element: <AssetTypesPage />,
                errorElement: <NotFoundPage />,
            },
            {
                path: "/types/models",
                element: <ModelsPage />,
                errorElement: <NotFoundPage />,
            },
            {
                path: "/types/os",
                element: <OSPage />,
                errorElement: <NotFoundPage />,
            },
        ]
    },
    {
        path: "/login",
        element: <LoginPage />,
        errorElement: <NotFoundPage />,
    },
    {
        path: '/register',
        element: <RegisterPage />,
        errorElement: <NotFoundPage />,
    },
    {
        path: "/landing",
        element: <LandingPage />,
        errorElement: <NotFoundPage />,
    },
    {
        path: "*",
        element: <NotFoundPage />,
        errorElement: <NotFoundPage />
    }
];