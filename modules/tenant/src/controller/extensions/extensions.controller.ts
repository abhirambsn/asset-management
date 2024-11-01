import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateAssetTypeDto } from 'src/dto/CreateAssetTypeDto';
import { ExtensionsService } from 'src/service/extensions/extensions.service';

@Controller('extensions')
export class ExtensionsController {
  constructor(private extensionsService: ExtensionsService) {}

  @Post('asset-type')
  async createAssetType(@Body() data: CreateAssetTypeDto) {
    return this.extensionsService.createAssetType(data);
  }

  @Post('os-type')
  async createOsType(@Body() data) {
    return this.extensionsService.createOsType(data);
  }

  @Post('asset-model')
  async createAssetModel(@Body() data) {
    return this.extensionsService.createAssetModel(data);
  }

  @Get('asset-types')
  async assetTypes(params) {
    return this.extensionsService.assetTypes(params);
  }

  @Get('asset-models')
  async assetModels(params) {
    return this.extensionsService.assetModels(params);
  }

  @Get('os-types')
  async osTypes(params) {
    return this.extensionsService.osTypes(params);
  }
}
