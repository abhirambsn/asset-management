import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom, take } from 'rxjs';
import { CreateAssetModelDto } from 'src/dto/tenant/CreateAssetModelDto';
import { CreateAssetTypeDto } from 'src/dto/tenant/CreateAssetTypeDto';
import { CreateOsTypeDto } from 'src/dto/tenant/CreateOsTypeDto';

@Injectable()
export class ExtensionsService {
  constructor(@Inject('TENANT_SERVICE') private readonly client: ClientProxy) {}

  async createAssetType(data: CreateAssetTypeDto) {
    const pattern = { role: 'extensions', cmd: 'create' };
    const payload = { type: 'asset-type', payload: data };

    const response$ = this.client.send(pattern, payload).pipe(take(1));

    return await lastValueFrom(response$);
  }

  async createOsType(data: CreateOsTypeDto) {
    const pattern = { role: 'extensions', cmd: 'create' };
    const payload = { type: 'os-type', payload: data };

    const response$ = this.client.send(pattern, payload).pipe(take(1));

    return await lastValueFrom(response$);
  }

  async createAssetModel(data: CreateAssetModelDto) {
    const pattern = { role: 'extensions', cmd: 'create' };
    const payload = { type: 'asset-model', payload: data };

    const response$ = this.client.send(pattern, payload).pipe(take(1));

    return await lastValueFrom(response$);
  }

  async getAssetTypes() {
    const pattern = { role: 'extensions', cmd: 'get' };
    const payload = { type: 'asset-type', payload: {} };

    const response$ = this.client.send(pattern, payload).pipe(take(1));

    return await lastValueFrom(response$);
  }

  async getOsTypes() {
    const pattern = { role: 'extensions', cmd: 'get' };
    const payload = { type: 'os-type', payload: {} };

    const response$ = this.client.send(pattern, payload).pipe(take(1));

    return await lastValueFrom(response$);
  }

  async getAssetModels() {
    const pattern = { role: 'extensions', cmd: 'get' };
    const payload = { type: 'asset-model', payload: {} };

    const response$ = this.client.send(pattern, payload).pipe(take(1));

    return await lastValueFrom(response$);
  }

  async deleteAssetType(id: string) {
    const pattern = { role: 'extensions', cmd: 'delete' };
    const payload = { type: 'asset-type', payload: { id } };

    const response$ = this.client.send(pattern, payload).pipe(take(1));

    return await lastValueFrom(response$);
  }

  async deleteOsType(id: string) {
    const pattern = { role: 'extensions', cmd: 'delete' };
    const payload = { type: 'os-type', payload: { id } };

    const response$ = this.client.send(pattern, payload).pipe(take(1));

    return await lastValueFrom(response$);
  }

  async deleteAssetModel(id: string) {
    const pattern = { role: 'extensions', cmd: 'delete' };
    const payload = { type: 'asset-model', payload: { id } };

    const response$ = this.client.send(pattern, payload).pipe(take(1));

    return await lastValueFrom(response$);
  }
}
