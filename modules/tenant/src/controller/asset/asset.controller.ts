import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AssetClass } from '@prisma/client';
import { CreateAssetDto } from 'src/dto/CreateAssetDto';
import { AssetsService } from 'src/service/assets/assets.service';

@Controller('asset')
export class AssetController {
  constructor(private assetService: AssetsService) {}

  @Post('')
  async createAsset(@Body() createAssetDto: CreateAssetDto) {
    let classType: AssetClass = AssetClass.NORMAL;
    switch (createAssetDto.class) {
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
      ...createAssetDto,
      class: classType,
      lastUpdated: new Date(),
      registrationDate: new Date(),
    };
    return await this.assetService.create(body);
  }

  @Get('')
  async getAssets(@Query('workspaceId') workspaceId: string) {
    return await this.assetService.assets({
      where: {
        workspaceId,
      },
    });
  }
}
