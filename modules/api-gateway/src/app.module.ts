import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  ClientProviderOptions,
  ClientsModule,
  Transport,
} from '@nestjs/microservices';
import { AuthController } from './controller/auth/auth.controller';
import { TenantController } from './controller/tenant/tenant.controller';
import { AuthService } from './service/auth/auth.service';
import { TenantService } from './service/tenant/tenant.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AssetController } from './controller/asset/asset.controller';
import { WorkspaceController } from './controller/workspace/workspace.controller';
import { ExtensionsController } from './controller/extensions/extensions.controller';
import { WorkspaceService } from './service/workspace/workspace.service';
import { ExtensionsService } from './service/extensions/extensions.service';
import { AssetsService } from './service/assets/assets.service';

const SERVICE_MAP = [
  {
    name: 'TENANT_SERVICE',
    host: process.env.TENANT_SERVICE_HOST || 'localhost',
    port: process.env.TENANT_SERVICE_PORT || 53002,
  },
  {
    name: 'AUTH_SERVICE',
    host: process.env.AUTH_SERVICE_HOST || 'localhost',
    port: process.env.AUTH_SERVICE_PORT || 53001,
  },
  // {
  //   name: 'INSIGHTS_SERVICE',
  //   host: process.env.INSIGHTS_SERVICE_HOST || 'localhost',
  //   port: process.env.INSIGHTS_SERVICE_PORT || 53003,
  // },
];

@Module({
  imports: [
    ClientsModule.register(
      SERVICE_MAP.map(
        (svc) =>
          ({
            name: svc.name,
            transport: Transport.TCP,
            options: {
              host: svc.host,
              port: svc.port,
            },
          }) as ClientProviderOptions,
      ),
    ),
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [
    AppController,
    AuthController,
    TenantController,
    AssetController,
    WorkspaceController,
    ExtensionsController,
  ],
  providers: [
    AppService,
    AuthService,
    TenantService,
    JwtService,
    WorkspaceService,
    ExtensionsService,
    AssetsService,
  ],
})
export class AppModule {}
