import { BaseEndpointService } from "./BaseEndpointService";

export class WorkspaceService {
    endpointClient: BaseEndpointService;

    constructor() {
        this.endpointClient = new BaseEndpointService();
    }

    async getWorkspaces(): Promise<WorkspaceList> {
        return Promise.resolve([
            {
                id: 'ws-1',
                name: 'Personal Workspace',
                owner: "james.corezo",
                tenantId: "2"
            }
        ]);
    }

    async getWorkspaceByTenantUser(tenantId: string, userId: string): Promise<WorkspaceList> {
        console.log('tenantId', tenantId);
        console.log('userId', userId);
        return Promise.resolve([
            {
                id: 'ws-1',
                name: 'Personal Workspace',
                owner: "james.corezo",
                tenantId: "2"
            }
        ]);
    }
}