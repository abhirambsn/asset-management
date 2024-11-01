import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class WorkspaceService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.workspace.create({
      data: {
        name: data.name,
        owner: data.owner,
        tenant: {
          connect: {
            id: data.tenantId,
          },
        },
      },
    });
  }

  async workspace(workspaceWhereUniqueInput: Prisma.WorkspaceWhereUniqueInput) {
    return this.prisma.workspace.findUnique({
      where: workspaceWhereUniqueInput,
      include: {
        assets: true,
        assetModels: true,
        osTypes: true,
        assetTypes: true,
      },
    });
  }

  async workspaces(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.WorkspaceWhereUniqueInput;
    where?: Prisma.WorkspaceWhereInput;
    orderBy?: Prisma.WorkspaceOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.workspace.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async deleteWorkspace(tenantId: string, workspaceId: string) {
    return this.prisma.workspace.delete({
      where: {
        id: workspaceId,
        tenantId: tenantId,
      },
    });
  }
}
