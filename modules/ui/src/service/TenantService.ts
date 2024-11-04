import { BaseEndpointService } from "./BaseEndpointService";

export class TenantService {
  endpointClient: BaseEndpointService;

  constructor() {
    this.endpointClient = new BaseEndpointService();
  }

  async getTenant(subdomain: string, token: string): Promise<Tenant> {
    if (!subdomain) {
      console.log("subdomain not provided");
      return Promise.reject("Subdomain not provided");
    }
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const endpoint = `/tenant/${subdomain}`;
    const tenant = await this.endpointClient.sendRequest<Tenant>(
      endpoint,
      "GET",
      {},
      {},
      headers
    );

    if (!tenant) {
      console.log("tenant not found");
      return Promise.reject("Tenant not found");
    }
    return tenant;
  }

  async getTenantMetadata(subdomain: string): Promise<TenantMetadata> {
    if (!subdomain) {
      console.log("subdomain not provided");
      return Promise.reject("Subdomain not provided");
    }
    const endpoint = `/tenant/${subdomain}/meta`;
    const tenantMetadata =
      await this.endpointClient.sendRequest<TenantMetadata>(
        endpoint,
        "GET",
        {}
      );

    if (!tenantMetadata) {
      console.log("tenant metadata not found");
      return Promise.reject("Tenant metadata not found");
    }
    return Promise.resolve(tenantMetadata);
  }

  async getWorkspacesByTenant(
    subdomain: string,
    token: string
  ): Promise<WorkspaceList> {
    if (!subdomain) {
      console.log("subdomain not provided");
      return Promise.reject("Subdomain not provided");
    }
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const endpoint = `/workspace/tenant/${subdomain}/`;
    const workspaces = await this.endpointClient.sendRequest<WorkspaceList>(
      endpoint,
      "GET",
      {},
      {},
      headers
    );

    if (!workspaces) {
      console.log("workspaces not found");
      return Promise.reject("Workspaces not found");
    }

    return workspaces;
  }
}
