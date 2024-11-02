import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';
import { CreateAssetModelDto } from 'src/dto/tenant/CreateAssetModelDto';
import { CreateAssetTypeDto } from 'src/dto/tenant/CreateAssetTypeDto';
import { CreateOsTypeDto } from 'src/dto/tenant/CreateOsTypeDto';
import { Roles } from 'src/roles.decorator';
import { RolesGuard } from 'src/roles.guard';
import { ExtensionsService } from 'src/service/extensions/extensions.service';

@Controller('extensions')
@UseGuards(AuthGuard, RolesGuard)
export class ExtensionsController {
  constructor(private readonly extensionsService: ExtensionsService) {}

  @Post('asset-type')
  @Roles(['ADMIN', 'WRITE'])
  async createAssetType(@Body() data: CreateAssetTypeDto) {
    return this.extensionsService.createAssetType(data);
  }

  @Post('os-type')
  @Roles(['ADMIN', 'WRITE'])
  async createOsType(@Body() data: CreateOsTypeDto) {
    return this.extensionsService.createOsType(data);
  }

  @Post('asset-model')
  @Roles(['ADMIN', 'WRITE'])
  async createAssetModel(@Body() data: CreateAssetModelDto) {
    return this.extensionsService.createAssetModel(data);
  }

  @Get('asset-types')
  @Roles(['ADMIN', 'READ', 'WRITE'])
  async getAssetTypes() {
    return this.extensionsService.getAssetTypes();
  }

  @Get('os-types')
  @Roles(['ADMIN', 'READ', 'WRITE'])
  async getOsTypes() {
    return this.extensionsService.getOsTypes();
  }

  @Get('asset-models')
  @Roles(['ADMIN', 'READ', 'WRITE'])
  async getAssetModels() {
    return this.extensionsService.getAssetModels();
  }

  @Delete('asset-type/:id')
  @Roles(['ADMIN', 'WRITE'])
  async deleteAssetType(@Param('id') id: string) {
    return this.extensionsService.deleteAssetType(id);
  }

  @Delete('os-type/:id')
  @Roles(['ADMIN', 'WRITE'])
  async deleteOsType(@Param('id') id: string) {
    return this.extensionsService.deleteOsType(id);
  }

  @Delete('asset-model/:id')
  @Roles(['ADMIN', 'WRITE'])
  async deleteAssetModel(@Param('id') id: string) {
    return this.extensionsService.deleteAssetModel(id);
  }
}
