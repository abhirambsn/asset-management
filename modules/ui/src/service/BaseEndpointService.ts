import axios, { AxiosInstance } from "axios";

export class BaseEndpointService {
    baseUrl: string;
    client: AxiosInstance;

    constructor() {
        this.baseUrl = import.meta.env.VITE_API_URL as string || 'http://localhost:8080';
        this.client = axios.create({
            baseURL: this.baseUrl
        })

    }

    private buildQueryParams(params: Record<string, string>) {
        if (Object.keys(params).length === 0) return '';
        const urlParams = new URLSearchParams(params);
        return urlParams.toString();
    }

    async sendRequest(
        endpoint: string,
        method: "GET" | "POST" | "PUT" | "DELETE",
        body: never,
        params: Record<string, string> = {},
        headers: Record<string, string> = {}
    ) {
        const queryParams = this.buildQueryParams(params);

        const response = await this.client.request({
            method,
            params: queryParams,
            headers,
            data: body,
            url: endpoint
        });

        return response.data;
    }
}