import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { AuthGuard } from 'src/auth.guard';
import { CreateAssetDto } from 'src/dto/tenant/CreateAssetDto';
import { Roles } from 'src/roles.decorator';
import { RolesGuard } from 'src/roles.guard';
import { WorkspaceService } from 'src/service/workspace/workspace.service';

@Controller('workspace')
@UseGuards(AuthGuard, RolesGuard)
export class WorkspaceController {
  constructor(
    private workspaceService: WorkspaceService,
    @Inject(REQUEST) private request: AuthenticatedRequest,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('')
  @Roles(['ADMIN'])
  async createWorkspace(@Body() data: CreateAssetDto) {
    return this.workspaceService.create(data);
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  @Roles(['ADMIN', 'READ', 'WRITE'])
  async getWorkspace(@Param('id') id: string) {
    const workspace = await this.workspaceService.getWorkspace(id);
    if (!workspace) {
      throw new HttpException('Workspace not found', HttpStatus.NOT_FOUND);
    }

    if (workspace.tenantId !== this.request?.user.tenant) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    return workspace;
  }

  @HttpCode(HttpStatus.OK)
  @Get('tenant/:tenantId')
  @Roles(['ADMIN', 'READ', 'WRITE'])
  async getWorkspacesByTenant(@Param('tenantId') tenantId: string) {
    if (tenantId !== this.request?.user.tenant) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    return this.workspaceService.getWorkspacesByTenant(tenantId);
  }
}
