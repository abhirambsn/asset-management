import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { RegisterUserDto } from 'src/dto/RegisterUserDto';
import { SignInDto } from 'src/dto/SignInDto';
import { AuthService } from 'src/service/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(
      signInDto.tenantId,
      signInDto.username,
      signInDto.password,
    );
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }
}
