import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UsersService } from '@/service/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern({ cmd: 'get', role: 'profile' })
  async getProfile(userId: string) {
    const user = await this.usersService.user({ id: userId });
    if (!user) {
      return null;
    }

    delete user.password;
    return user;
  }

  @MessagePattern({ cmd: 'users', role: 'tenant' })
  async getUsersByTenant(tenantId: string) {
    return this.usersService.getUsersByTenant(tenantId);
  }

  @MessagePattern({ cmd: 'delete', role: 'tenant' })
  async deleteUser(data: { tenantId: string; userId: string }) {
    return this.usersService.deleteUser(data.tenantId, data.userId);
  }
}
