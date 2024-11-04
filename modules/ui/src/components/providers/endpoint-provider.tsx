/* eslint-disable react-refresh/only-export-components */
import { TenantService } from "@/service/TenantService";
import { UserService } from "@/service/UserService";
import { createContext } from "react";

type EndpointProviderState = {
  tenantService: TenantService;
  userService: UserService;
};

const initialState: EndpointProviderState = {
  tenantService: new TenantService(),
  userService: new UserService(),
};

export const EndpointProviderContext =
  createContext<EndpointProviderState>(initialState);

export const EndpointProvider = ({
  children,
  ...props
}: {
  children: React.ReactNode;
}) => {
  const value = {
    tenantService: new TenantService(),
    userService: new UserService(),
  };

  return (
    <EndpointProviderContext.Provider value={value} {...props}>
      {children}
    </EndpointProviderContext.Provider>
  );
};
