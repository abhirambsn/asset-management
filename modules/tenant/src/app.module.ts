import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TenantService } from './service/tenant/tenant.service';
import { WorkspaceService } from './service/workspace/workspace.service';
import { TenantController } from './controller/tenant/tenant.controller';
import { WorkspaceController } from './controller/workspace/workspace.controller';
import { PrismaService } from './service/prisma/prisma.service';
import { AssetsService } from './service/assets/assets.service';
import { AssetController } from './controller/asset/asset.controller';
import { ExtensionsService } from './service/extensions/extensions.service';
import { ExtensionsController } from './controller/extensions/extensions.controller';

@Module({
  imports: [],
  controllers: [AppController, TenantController, WorkspaceController, AssetController, ExtensionsController],
  providers: [AppService, TenantService, WorkspaceService, PrismaService, AssetsService, ExtensionsService],
})
export class AppModule {}
