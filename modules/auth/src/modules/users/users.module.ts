import { Module } from '@nestjs/common';
import { PrismaService } from 'src/service/prisma/prisma.service';
import { UsersService } from 'src/service/users/users.service';

@Module({
  providers: [UsersService, PrismaService],
  exports: [UsersService],
})
export class UsersModule {}
