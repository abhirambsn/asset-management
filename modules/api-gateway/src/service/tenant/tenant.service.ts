import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom, take } from 'rxjs';
import { CreateTenantDto } from 'src/dto/tenant/CreateTenantDto';
import { TenantResponseDto } from 'src/dto/tenant/TenantResponseDto';

@Injectable()
export class TenantService {
  private readonly logger = new Logger(TenantService.name);
  constructor(@Inject('TENANT_SERVICE') private readonly client: ClientProxy) {}

  async create(data: CreateTenantDto) {
    const pattern = { cmd: 'tenant_create' };
    const payload = data;

    const response$ = this.client
      .send<TenantResponseDto>(pattern, { payload })
      .pipe(take(1));

    const response = await lastValueFrom(response$);
    this.logger.log(`Tenant created with id: ${response.id}`);

    return response;
  }

  async get(id: string) {
    const pattern = { cmd: 'tenant_get' };
    const payload = { id };

    const response$ = this.client
      .send<TenantResponseDto>(pattern, { payload })
      .pipe(take(1));

    const response = await lastValueFrom(response$);
    this.logger.log(`Fetched tenant with id: ${id}`);

    return response;
  }
}
