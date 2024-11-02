import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller('metrics')
export class MetricsController {
  @MessagePattern({ cmd: 'ping' })
  async health() {
    return { status: 'UP' };
  }
}
