import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { MessagePayload } from 'src/dto/MessagePayload';
import { ExtensionsService } from 'src/service/extensions/extensions.service';

@Controller('extensions')
export class ExtensionsController {
  constructor(private extensionsService: ExtensionsService) {}

  @MessagePattern({ cmd: 'create', role: 'extensions' })
  async create(data: MessagePayload) {
    switch (data?.type) {
      case 'asset-type':
        return this.extensionsService.createAssetType(data.payload);
      case 'os-type':
        return this.extensionsService.createOsType(data.payload);
      case 'asset-model':
        return this.extensionsService.createAssetModel(data.payload);
      default:
        return { error: 'Invalid type' };
    }
  }

  @MessagePattern({ cmd: 'get', role: 'extensions' })
  async get(data: MessagePayload) {
    switch (data.type) {
      case 'asset-type':
        return this.extensionsService.assetTypes(data.payload);
      case 'os-type':
        return this.extensionsService.osTypes(data.payload);
      case 'asset-model':
        return this.extensionsService.assetModels(data.payload);
      default:
        return { error: 'Invalid type' };
    }
  }

  @MessagePattern({ cmd: 'delete', role: 'extensions' })
  async delete(data: MessagePayload) {
    switch (data.type) {
      case 'asset-type':
        return this.extensionsService.deleteAssetType(data.payload);
      case 'os-type':
        return this.extensionsService.deleteOsType(data.payload);
      case 'asset-model':
        return this.extensionsService.deleteAssetModel(data.payload);
      default:
        return { error: 'Invalid type' };
    }
  }
}
