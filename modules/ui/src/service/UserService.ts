import { BaseEndpointService } from "./BaseEndpointService";

export class UserService {
    endpointClient: BaseEndpointService;

    constructor() {
        this.endpointClient = new BaseEndpointService();
    }

    async getUser(): Promise<User> {
        return Promise.resolve({
            email: 'james.corezo@gmail.com',
            id: '1',
            password: 'hash123',
            roles: ["ADMIN"],
            username: "james.corezo"
        })
    }
}