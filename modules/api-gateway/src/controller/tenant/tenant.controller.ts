import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { AuthGuard } from 'src/auth.guard';
import { CreateTenantDto } from 'src/dto/tenant/CreateTenantDto';
import { Roles } from 'src/roles.decorator';
import { RolesGuard } from 'src/roles.guard';
import { TenantService } from 'src/service/tenant/tenant.service';

@Controller('tenant')
@UseGuards(AuthGuard, RolesGuard)
export class TenantController {
  constructor(
    private tenantService: TenantService,
    @Inject(REQUEST) private request: AuthenticatedRequest,
  ) {}

  @Post('')
  async createTenant(@Body() createTenantDto: CreateTenantDto) {
    return this.tenantService.create(createTenantDto);
  }

  @Get(':id')
  async getTenant(@Param('id') id: string) {
    if (this.request?.user.tenant !== id) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return this.tenantService.get(id);
  }

  @Put(':id')
  @Roles(['admin'])
  async updateTenant(
    @Param('id') id: string,
    @Body() updateTenantDto: CreateTenantDto,
  ) {
    console.log('updateTenant', id, updateTenantDto);
    return { id, ...updateTenantDto };
  }
}
