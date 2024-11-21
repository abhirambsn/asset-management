import { BaseEndpointService } from "./BaseEndpointService";
import _ from "lodash";

export class UserService {
  endpointClient: BaseEndpointService;

  constructor() {
    this.endpointClient = new BaseEndpointService();
  }

  async login(payload: LoginPayload): Promise<string> {
    const endpoint = "/auth/";
    const body = _.cloneDeep(payload);
    const response = await this.endpointClient.sendRequest<AuthResponse>(
      endpoint,
      "POST",
      body
    );

    if (!response) {
      console.log("login failed");
      return Promise.reject("Login failed");
    }
    return response.access_token;
  }

  async getUser(token: string): Promise<User> {
    const endpoint = "/auth";
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const user = await this.endpointClient.sendRequest<User>(
        endpoint,
        "GET",
        {},
        {},
        headers
      );
      return user;
    } catch (err) {
      console.log("error fetching user", err);
      return Promise.reject("Error fetching user");
    }
  }

  async getTenantUsers(token: string, tenantId: string): Promise<User[]> {
    const endpoint = `/auth/tenant/${tenantId}`;
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const users = await this.endpointClient.sendRequest<User[]>(
        endpoint,
        "GET",
        {},
        {},
        headers
      );
      return users;
    } catch (err) {
      console.log("error fetching tenant users", err);
      return Promise.reject("Error fetching tenant users");
    }
  }

  async createTenantUser(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    tenantName: string,
    username: string,
    roles: string[],
    token: string
  ) {
    const endpoint = "/auth/register";
    const body = {
      firstName,
      lastName,
      email,
      password,
      tenantName,
      username,
      roles,
      internalTenantUser: true,
    }

    const headers = {
      Authorization: `Bearer ${token}`,
    }

    try {
      const response = await this.endpointClient.sendRequest<User>(
        endpoint,
        "POST",
        body,
        {},
        headers
      );
      return response;
    } catch (err) {
      console.log("error creating tenant user", err);
      return Promise.reject("Error creating tenant user");
    }
  }
}
