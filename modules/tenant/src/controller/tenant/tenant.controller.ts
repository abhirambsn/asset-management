import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { MessagePayload } from 'src/dto/MessagePayload';
import { TenantService } from 'src/service/tenant/tenant.service';

@Controller('tenant')
export class TenantController {
  constructor(private tenantService: TenantService) {}

  @MessagePattern({ cmd: 'tenant_get' })
  async tenant(data: MessagePayload) {
    console.log(data);
    return this.tenantService.tenant({
      id: data.payload.id,
    });
  }

  @MessagePattern({ cmd: 'tenant_create' })
  async createTenant(data: MessagePayload) {
    return this.tenantService.create(data.payload);
  }
}
