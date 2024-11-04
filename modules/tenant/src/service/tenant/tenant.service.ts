import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { kebabCase } from 'lodash';

@Injectable()
export class TenantService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.tenant.create({
      data: {
        ...data,
        id: kebabCase(data.name),
        users: [data.owner],
        workspaces: {
          create: {
            id: 'personal',
            name: 'Personal Workspace',
            owner: data.owner,
          },
        },
      },
    });
  }

  async tenant(tenantWhereUniqueInput: Prisma.TenantWhereUniqueInput) {
    return this.prisma.tenant.findUnique({
      where: tenantWhereUniqueInput,
      include: {
        workspaces: {
          include: {
            assetModels: true,
            assets: true,
            osTypes: true,
            assetTypes: true,
          },
        },
      },
    });
  }

  async tenantMeta(tenantWhereUniqueInput: Prisma.TenantWhereUniqueInput) {
    return this.prisma.tenant.findUnique({
      where: tenantWhereUniqueInput,
      select: {
        id: true,
        name: true,
      },
    });
  }

  async tenants(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TenantWhereUniqueInput;
    where?: Prisma.TenantWhereInput;
    orderBy?: Prisma.TenantOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.tenant.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }
}
