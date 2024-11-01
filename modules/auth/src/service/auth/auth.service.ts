import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from 'src/dto/RegisterUserDto';
import { User, Role } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
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
    return await this.userService.createUser({
      ...data,
      password: hashedPassword,
      roles: (data.roles as Role[]) ?? ['ADMIN'],
    });
  }
}
