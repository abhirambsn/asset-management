import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AssetClass } from '@prisma/client';
import { MessagePayload } from 'src/dto/MessagePayload';
import { AssetsService } from 'src/service/assets/assets.service';

@Controller('asset')
export class AssetController {
  constructor(private assetService: AssetsService) {}

  @MessagePattern({ role: 'asset', cmd: 'create' })
  async createAsset(data: MessagePayload) {
    let classType: AssetClass = AssetClass.NORMAL;
    const createAssetBody = data.payload;
    switch (createAssetBody.class) {
      case 'normal':
        classType = AssetClass.NORMAL;
        break;
      case 'critical':
        classType = AssetClass.CRITICAL;
        break;
      case 'not_important':
        classType = AssetClass.NOT_IMPORTANT;
        break;
      default:
        classType = AssetClass.NORMAL;
        break;
    }
    const body = {
      ...createAssetBody,
      class: classType,
      lastUpdated: new Date(),
      registrationDate: new Date(),
    };
    return await this.assetService.create(body);
  }

  @MessagePattern({ role: 'asset', cmd: 'get' })
  async getAssets(data: MessagePayload) {
    const workspaceId = data.payload.workspaceId;
    return await this.assetService.assets({
      where: {
        workspaceId,
      },
    });
  }

  @MessagePattern({ role: 'asset', cmd: 'getById' })
  async getAssetById(data: MessagePayload) {
    const id = data.payload.id;
    return await this.assetService.asset({
      id,
    });
  }

  @MessagePattern({ role: 'asset', cmd: 'delete' })
  async deleteAsset(data: MessagePayload) {
    const id = data.payload.id;
    return await this.assetService.delete({
      id,
    });
  }
}
