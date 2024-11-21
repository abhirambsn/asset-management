import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from 'src/dto/RegisterUserDto';
import { User, Role } from '@prisma/client';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom, take } from 'rxjs';
import { kebabCase } from 'lodash';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    @Inject('TENANT_SERVICE') private readonly client: ClientProxy,
  ) {}

  async signIn(
    tenantId: string,
    username: string,
    password: string,
  ): Promise<any> {
    const user = await this.userService.getTenantUserByUsername(
      tenantId,
      username,
    );
    if (!user) {
      return null;
    }

    try {
      const isValid = await this.userService.validatePassword(
        user.password,
        password,
      );
      if (isValid) {
        const payload = {
          roles: user.roles,
          tenant: user.tenantId,
          sub: user.id,
        };
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
      } else {
        return null;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async register(data: RegisterUserDto): Promise<User> {
    const hashedPassword = await this.userService.hashPassword(data.password);
    const { tenantName, internalTenantUser, ...rest } = data;
    const userResponse = await this.userService.createUser({
      ...rest,
      tenantId: kebabCase(tenantName),
      password: hashedPassword,
      roles: (data.roles as Role[]) ?? ['ADMIN'],
    });

    if (!internalTenantUser) {
      const cmd = { cmd: 'create', role: 'tenant' };
      const payload = {
        name: tenantName,
        owner: userResponse.id,
      };

      const response$ = this.client.send(cmd, { payload }).pipe(take(1));
      await lastValueFrom(response$);
    }

    return userResponse;
  }
}
