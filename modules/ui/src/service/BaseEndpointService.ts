import axios, { AxiosInstance } from "axios";

export class BaseEndpointService {
  baseUrl: string;
  client: AxiosInstance;

  constructor() {
    this.baseUrl =
      (import.meta.env.VITE_API_URL as string) || "http://localhost:8080";
    console.log("API URL:", this.baseUrl);
    this.client = axios.create({
      baseURL: this.baseUrl,
    });
  }

  private buildQueryParams(params: Record<string, string>) {
    if (Object.keys(params).length === 0) return "";
    const urlParams = new URLSearchParams(params);
    return urlParams.toString();
  }

  async sendRequest<T>(
    endpoint: string,
    method: "GET" | "POST" | "PUT" | "DELETE",
    body: unknown,
    params: Record<string, string> = {},
    headers: Record<string, string> = {}
  ) {
    const queryParams = this.buildQueryParams(params);

    try {
      const response = await this.client.request({
        method,
        params: queryParams,
        headers,
        data: body,
        url: endpoint,
      });

      return response.data as T;
    } catch (err) {
      console.error("Error sending request:", err);
      return Promise.reject(err);
    }
  }
}
