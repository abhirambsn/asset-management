import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AssetModel, AssetType, Prisma } from '@prisma/client';
import { kebabCase } from 'lodash';

@Injectable()
export class ExtensionsService {
  constructor(private prisma: PrismaService) {}

  async createAssetType(data: any): Promise<AssetType> {
    return this.prisma.assetType.create({
      data: {
        name: data.name,
        id: kebabCase(data.name),
        workspace: {
          connect: {
            id: data.workspaceId,
          },
        },
      },
    });
  }

  async createAssetModel(data: any): Promise<AssetModel> {
    return this.prisma.assetModel.create({
      data: {
        name: data.name,
        id: kebabCase(data.name),
        specs: data.specs,
        company: data.company,
        releaseYear: data.releaseYear,
        type: {
          connect: {
            id: data.typeId,
          },
        },
        workspace: {
          connect: {
            id: data.workspaceId,
          },
        },
      },
    });
  }

  async createOsType(data: Prisma.OsTypesUncheckedCreateInput) {
    return this.prisma.osTypes.create({
      data: {
        name: data.name,
        id: kebabCase(data.name),
        workspace: {
          connect: {
            id: data.workspaceId,
          },
        },
      },
    });
  }

  async assetTypes(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.AssetTypeWhereUniqueInput;
    where?: Prisma.AssetTypeWhereInput;
    orderBy?: Prisma.AssetTypeOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.assetType.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async assetModels(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.AssetModelWhereUniqueInput;
    where?: Prisma.AssetModelWhereInput;
    orderBy?: Prisma.AssetModelOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.assetModel.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async osTypes(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.OsTypesWhereUniqueInput;
    where?: Prisma.OsTypesWhereInput;
    orderBy?: Prisma.OsTypesOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.osTypes.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async deleteAssetType(where: Prisma.AssetTypeWhereUniqueInput) {
    return this.prisma.assetType.delete({
      where,
    });
  }

  async deleteAssetModel(where: Prisma.AssetModelWhereUniqueInput) {
    return this.prisma.assetModel.delete({
      where,
    });
  }
  async deleteOsType(where: Prisma.OsTypesWhereUniqueInput) {
    return this.prisma.osTypes.delete({
      where,
    });
  }
}
