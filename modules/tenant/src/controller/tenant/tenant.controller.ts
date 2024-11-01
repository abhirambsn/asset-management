import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateTenantDto } from 'src/dto/CreateTenantDto';
import { TenantService } from 'src/service/tenant/tenant.service';

@Controller('tenant')
export class TenantController {
  constructor(private tenantService: TenantService) {}

  @Get(':id')
  async tenant(@Param('id') id: string) {
    return this.tenantService.tenant({
      id,
    });
  }

  @Post('')
  async createTenant(@Body() data: CreateTenantDto) {
    return this.tenantService.create(data);
  }
}
