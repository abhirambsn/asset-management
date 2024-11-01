import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createUser(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data,
    });
  }

  async user(userWhereInput: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.findUnique({
      where: userWhereInput,
    });
  }

  async deleteUser(tenantId: string, userId: string) {
    return this.prisma.user.delete({
      where: {
        id: userId,
        tenantId: tenantId,
      },
    });
  }

  async getUsersByTenant(tenantId: string) {
    return this.users({ where: { tenantId } });
  }

  async getTenantUserById(tenantId: string, userId: string) {
    return this.user({
      id: userId,
      tenantId: tenantId,
    });
  }

  async getTenantUserByUsername(tenantId: string, username: string) {
    return this.user({
      username,
      tenantId,
    });
  }

  async getTenantUserByEmail(tenantId: string, email: string) {
    return this.user({
      email,
      tenantId,
    });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }) {
    const { data, where } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  async validatePassword(userPassword: string, password: string) {
    return await argon2.verify(userPassword, password);
  }

  async hashPassword(password: string) {
    return await argon2.hash(password);
  }
}
