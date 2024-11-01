import { Controller, Get, Param, Post } from '@nestjs/common';
import { CreateWorkspaceDto } from 'src/dto/CreateWorkspaceDto';
import { WorkspaceService } from 'src/service/workspace/workspace.service';

@Controller('workspace')
export class WorkspaceController {
  constructor(private workspaceService: WorkspaceService) {}

  @Post('')
  async createWorkspace(createWorkspaceDto: CreateWorkspaceDto) {
    return this.workspaceService.create(createWorkspaceDto);
  }

  @Get(':id')
  async getWorkspace(@Param('id') id: string) {
    return this.workspaceService.workspace({
      id,
    });
  }
}
