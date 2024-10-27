import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ROUTES } from "./utils/routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { EndpointProvider } from "./components/providers/endpoint-provider.tsx";
import { ThemeProvider } from "./components/providers/theme-provider.tsx";
import { TenantProvider } from "./components/providers/tenant-provider.tsx";

const router = createBrowserRouter(ROUTES);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <TenantProvider>
          <EndpointProvider>
              <RouterProvider router={router} />
          </EndpointProvider>
        </TenantProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);