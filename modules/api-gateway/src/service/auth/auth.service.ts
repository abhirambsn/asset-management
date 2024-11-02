import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom, take } from 'rxjs';
import { RegisterUserDto } from 'src/dto/auth/RegisterUserDto';
import { SignInDto } from 'src/dto/auth/SignInDto';

@Injectable()
export class AuthService {
  constructor(@Inject('AUTH_SERVICE') private readonly client: ClientProxy) {}

  async login(signInUserDto: SignInDto) {
    const pattern = { cmd: 'login' };
    const payload = signInUserDto;
    const response$ = this.client.send(pattern, payload).pipe(take(1));

    const response = await lastValueFrom(response$);
    return response;
  }

  async register(data: RegisterUserDto) {
    const pattern = { cmd: 'register' };
    const payload = data;
    const response$ = this.client.send(pattern, payload).pipe(take(1));

    const response = await lastValueFrom(response$);
    return response;
  }

  async getProfile(userId: string) {
    const pattern = { cmd: 'get', role: 'profile' };
    const payload = userId;
    const response$ = this.client.send(pattern, payload).pipe(take(1));

    const response = await lastValueFrom(response$);
    return response;
  }
}
