import { EndpointProviderContext } from "@/components/providers/endpoint-provider";
import { useContext } from "react";

export const useEndpoint = () => {
    const context = useContext(EndpointProviderContext);

    if (context === undefined) {
        throw new Error("useEndpoint must be used within a EndpointProvider");
    }

    return context;
}