import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersService } from './service/users/users.service';
import { AuthService } from './service/auth/auth.service';
import { AuthController } from './controller/auth/auth.controller';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaService } from './service/prisma/prisma.service';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { UsersController } from './controller/users/users.controller';

@Module({
  imports: [UsersModule, AuthModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController, AuthController, UsersController],
  providers: [AppService, UsersService, PrismaService, AuthService],
})
export class AppModule {}
