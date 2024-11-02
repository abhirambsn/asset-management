import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { MessagePayload } from 'src/dto/MessagePayload';
import { WorkspaceService } from 'src/service/workspace/workspace.service';

@Controller('workspace')
export class WorkspaceController {
  constructor(private workspaceService: WorkspaceService) {}

  @MessagePattern({ role: 'workspace', cmd: 'create' })
  async createWorkspace(data: MessagePayload) {
    return this.workspaceService.create(data.payload);
  }

  @MessagePattern({ role: 'workspace', cmd: 'get' })
  async getWorkspace(data: MessagePayload) {
    const id = data.payload.id;
    return this.workspaceService.workspace({
      id,
    });
  }
}
