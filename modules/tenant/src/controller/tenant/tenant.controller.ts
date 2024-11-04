import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { MessagePayload } from 'src/dto/MessagePayload';
import { TenantService } from 'src/service/tenant/tenant.service';

@Controller('tenant')
export class TenantController {
  constructor(private tenantService: TenantService) {}

  @MessagePattern({ cmd: 'get', role: 'tenant' })
  async tenant(data: MessagePayload) {
    return this.tenantService.tenant({
      id: data.payload.id,
    });
  }

  @MessagePattern({ cmd: 'create', role: 'tenant' })
  async createTenant(data: MessagePayload) {
    return this.tenantService.create(data.payload);
  }

  @MessagePattern({ cmd: 'meta', role: 'tenant' })
  async getTenantMetadata(data: MessagePayload) {
    return this.tenantService.tenantMeta(data.payload);
  }
}
