import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom, take } from 'rxjs';
import { CreateAssetDto } from 'src/dto/tenant/CreateAssetDto';

@Injectable()
export class AssetsService {
  constructor(@Inject('TENANT_SERVICE') private readonly client: ClientProxy) {}

  async create(createAssetDto: CreateAssetDto) {
    const pattern = { role: 'asset', cmd: 'create' };
    const payload = createAssetDto;

    const response$ = await this.client
      .send(pattern, { payload })
      .pipe(take(1));

    return await lastValueFrom(response$);
  }

  async getAssets(workspaceId: string) {
    const pattern = { role: 'asset', cmd: 'get' };
    const payload = { workspaceId };

    const response$ = await this.client
      .send(pattern, { payload })
      .pipe(take(1));

    return await lastValueFrom(response$);
  }

  async getAssetById(id: string) {
    const pattern = { role: 'asset', cmd: 'getById' };
    const payload = { id };

    const response$ = await this.client
      .send(pattern, { payload })
      .pipe(take(1));

    return await lastValueFrom(response$);
  }

  async delete(id: string) {
    const pattern = { role: 'asset', cmd: 'delete' };
    const payload = { id };

    const response$ = await this.client
      .send(pattern, { payload })
      .pipe(take(1));

    return await lastValueFrom(response$);
  }
}
