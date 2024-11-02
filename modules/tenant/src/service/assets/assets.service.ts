import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Asset } from '@prisma/client';

@Injectable()
export class AssetsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.AssetUncheckedCreateInput): Promise<Asset> {
    return this.prisma.asset.create({
      data: {
        ...data,
      },
    });
  }

  async asset(
    assetWhereUniqueInput: Prisma.AssetWhereUniqueInput,
  ): Promise<Asset | null> {
    return this.prisma.asset.findUnique({
      where: assetWhereUniqueInput,
      include: {
        model: true,
        osType: true,
        type: true,
      },
    });
  }

  async assets(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.AssetWhereUniqueInput;
    where?: Prisma.AssetWhereInput;
    orderBy?: Prisma.AssetOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.asset.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        model: true,
        osType: true,
        type: true,
      },
    });
  }

  async delete(where: Prisma.AssetWhereUniqueInput): Promise<Asset | null> {
    return this.prisma.asset.delete({
      where,
    });
  }
}
