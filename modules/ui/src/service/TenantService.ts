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

  async createAsset(
    name: string,
    workspaceId: string,
    typeId: string,
    modelId: string,
    osTypeId: string,
    osVersion: string,
    owner: string,
    assetClass: string,
    value: number,
    token: string
  ) {
    const body = {
      name,
      workspaceId,
      typeId,
      modelId,
      osTypeId,
      osVersion,
      owner,
      class: assetClass,
      value,
    };

    const endpoint = "/asset";
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await this.endpointClient.sendRequest<Asset>(
      endpoint,
      "POST",
      body,
      {},
      headers
    );
    if (!response) {
      console.log("Error");
      return Promise.reject("error in creating asset");
    }

    return response;
  }

  async createAssetType(name: string, workspaceId: string, token: string) {
    const body = {
      name,
      workspaceId,
    };

    const endpoint = "/extensions/asset-type";
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await this.endpointClient.sendRequest<AssetType>(
      endpoint,
      "POST",
      body,
      {},
      headers
    );
    if (!response) {
      console.log("Error");
      return Promise.reject("error in creating asset type");
    }

    return response;
  }

  async createAssetModel(
    name: string,
    specs: Record<string, string>,
    company: string,
    releaseYear: number,
    typeId: string,
    workspaceId: string,
    token: string
  ) {
    const body = {
      name,
      specs,
      company,
      releaseYear,
      typeId,
      workspaceId,
    };

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const endpoint = "/extensions/asset-model";
    const response = await this.endpointClient.sendRequest<AssetModel>(
      endpoint,
      "POST",
      body,
      {},
      headers
    );
    if (!response) {
      console.log("Error");
      return Promise.reject("error in creating asset model");
    }

    return response;
  }

  async createOSType(name: string, workspaceId: string, token: string) {
    const body = {
      name,
      workspaceId,
    };

    const endpoint = "/extensions/os-type";
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await this.endpointClient.sendRequest<OperatingSystem>(
      endpoint,
      "POST",
      body,
      {},
      headers
    );

    if (!response) {
      console.log("Error");
      return Promise.reject("error in creating os type");
    }

    return response;
  }
}
