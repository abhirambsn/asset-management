import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom, take } from 'rxjs';
import { CreateTenantDto } from 'src/dto/tenant/CreateTenantDto';

@Injectable()
export class TenantService {
  constructor(@Inject('TENANT_SERVICE') private readonly client: ClientProxy) {}

  async create(data: CreateTenantDto) {
    const pattern = { cmd: 'tenant_create' };
    const payload = data;

    const response$ = this.client.send(pattern, { payload }).pipe(take(1));

    const response = await lastValueFrom(response$);
    return response;
  }

  async get(id: string) {
    const pattern = { cmd: 'tenant_get' };
    const payload = { id };

    const response$ = this.client.send(pattern, { payload }).pipe(take(1));

    const response = await lastValueFrom(response$);
    return response;
  }
}
