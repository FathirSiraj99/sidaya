import { Body, Controller, Post, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { AuthGuard } from './guard/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  async register(@Body() dto: CreateAuthDto) {
    return await this.authService.register(dto)
  }

  @Post('login')
  async loginWithUsername(@Body() dto: CreateAuthDto) {
    return await this.authService.login(dto)
  }

}
