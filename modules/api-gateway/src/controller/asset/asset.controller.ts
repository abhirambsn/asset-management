import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';
import { CreateAssetDto } from 'src/dto/tenant/CreateAssetDto';
import { Roles } from 'src/roles.decorator';
import { RolesGuard } from 'src/roles.guard';
import { AssetsService } from 'src/service/assets/assets.service';

@Controller('asset')
@UseGuards(AuthGuard, RolesGuard)
export class AssetController {
  constructor(private assetService: AssetsService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('')
  @Roles(['ADMIN', 'WRITE'])
  async createAsset(@Body() data: CreateAssetDto) {
    return await this.assetService.create(data);
  }

  @HttpCode(HttpStatus.OK)
  @Get('')
  @Roles(['ADMIN', 'READ'])
  async getAssets(workspaceId: string) {
    return await this.assetService.getAssets(workspaceId);
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  @Roles(['ADMIN', 'READ'])
  async getAssetById(@Param('id') id: string) {
    const asset = await this.assetService.getAssetById(id);
    if (!asset) {
      throw new HttpException('Asset not found', HttpStatus.NOT_FOUND);
    }
    return await this.assetService.getAssetById(id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  @Roles(['ADMIN', 'WRITE'])
  async deleteAsset(@Param('id') id: string) {
    return await this.assetService.delete(id);
  }
}
