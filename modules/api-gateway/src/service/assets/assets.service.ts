import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom, take } from 'rxjs';
import { AssetResponseDto } from 'src/dto/tenant/AssetResponseDto';
import { CreateAssetDto } from 'src/dto/tenant/CreateAssetDto';

@Injectable()
export class AssetsService {
  private readonly logger = new Logger(AssetsService.name);
  constructor(@Inject('TENANT_SERVICE') private readonly client: ClientProxy) {}

  async create(createAssetDto: CreateAssetDto) {
    const pattern = { role: 'asset', cmd: 'create' };
    const payload = createAssetDto;

    const response$ = await this.client
      .send<AssetResponseDto>(pattern, { payload })
      .pipe(take(1));

    const response = await lastValueFrom(response$);

    this.logger.log(`Asset created with id: ${response.id}`);
    return response;
  }

  async getAssets(workspaceId: string) {
    const pattern = { role: 'asset', cmd: 'get' };
    const payload = { workspaceId };

    const response$ = await this.client
      .send<AssetResponseDto[]>(pattern, { payload })
      .pipe(take(1));

    const response = await lastValueFrom(response$);

    this.logger.log(`Fetched assets for workspace: ${workspaceId}`);

    return response;
  }

  async getAssetById(id: string) {
    const pattern = { role: 'asset', cmd: 'getById' };
    const payload = { id };

    const response$ = await this.client
      .send<AssetResponseDto>(pattern, { payload })
      .pipe(take(1));

    this.logger.log(`Fetched asset with id: ${id}`);

    return await lastValueFrom(response$);
  }

  async delete(id: string) {
    const pattern = { role: 'asset', cmd: 'delete' };
    const payload = { id };

    const response$ = await this.client
      .send(pattern, { payload })
      .pipe(take(1));

    this.logger.log(`Asset deleted with id: ${id}`);

    return await lastValueFrom(response$);
  }
}
