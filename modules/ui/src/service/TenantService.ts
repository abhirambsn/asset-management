import { TENANTS } from "@/utils/constants";
import { BaseEndpointService } from "./BaseEndpointService";

export class TenantService {
    endpointClient: BaseEndpointService;

    constructor() {
        this.endpointClient = new BaseEndpointService();
    }

    getTenant(subdomain: string): Promise<Tenant> {
        const tenant = TENANTS.find(app => app.subdomain === subdomain);
        if (!tenant) {
            console.log('tenant not found');
            return Promise.reject('Tenant not found');
        }
        return Promise.resolve(tenant);
    }

    getTenantsByUser(username: string): Promise<TenantList> {
        const tenants = TENANTS.filter(tenant => tenant.owner.username === username);
        return Promise.resolve(tenants);
    }
}