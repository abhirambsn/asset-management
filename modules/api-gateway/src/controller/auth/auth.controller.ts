import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  UseGuards,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { AuthGuard } from 'src/auth.guard';
import { RegisterUserDto } from 'src/dto/auth/RegisterUserDto';
import { SignInDto } from 'src/dto/auth/SignInDto';
import { AuthService } from 'src/service/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject(REQUEST) private request: AuthenticatedRequest,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('')
  async signIn(@Body() signInDto: SignInDto) {
    return this.authService.login(signInDto);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Get('')
  async me() {
    return this.authService.getProfile(this.request.user.sub);
  }
}
