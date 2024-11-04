import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom, take } from 'rxjs';
import { CreateWorkspaceDto } from 'src/dto/tenant/CreateWorkspaceDto';

@Injectable()
export class WorkspaceService {
  constructor(@Inject('TENANT_SERVICE') private readonly client: ClientProxy) {}

  async create(createWorkspaceDto: CreateWorkspaceDto) {
    const pattern = { role: 'workspace', cmd: 'create' };
    const payload = createWorkspaceDto;

    const response$ = this.client.send(pattern, { payload }).pipe(take(1));

    return await lastValueFrom(response$);
  }

  async getWorkspace(id: string) {
    const pattern = { role: 'workspace', cmd: 'get' };
    const payload = { id };

    const response$ = this.client.send(pattern, { payload }).pipe(take(1));

    return await lastValueFrom(response$);
  }

  async getWorkspacesByTenant(tenantId: string) {
    const pattern = { role: 'workspace', cmd: 'get_by_tenant' };
    const payload = { tenantId };

    const response$ = this.client.send(pattern, { payload }).pipe(take(1));

    return await lastValueFrom(response$);
  }
}
