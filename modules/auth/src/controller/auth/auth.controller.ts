import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { RegisterUserDto } from 'src/dto/RegisterUserDto';
import { SignInDto } from 'src/dto/SignInDto';
import { AuthService } from 'src/service/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @MessagePattern({ cmd: 'login' })
  signIn(signInDto: SignInDto) {
    return this.authService.signIn(
      signInDto.tenantId,
      signInDto.username,
      signInDto.password,
    );
  }

  @MessagePattern({ cmd: 'register' })
  register(registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }
}
