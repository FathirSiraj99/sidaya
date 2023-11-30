import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthLoginDto, AuthRegisterDto } from './auth.dto';
import { Response } from 'express';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  @ApiBody({ type: AuthRegisterDto })
  async register(@Body() data: AuthRegisterDto, @Res() res: Response) {
    const register = await this.authService.register(data)
    return res.status(register.status).json(register)
  }

  @Post('login')
  @ApiBody({ type: AuthLoginDto })
  async loginWithUsername(@Body() data: AuthLoginDto, @Res() res: Response) {
    const login = await this.authService.login(data)
    return res.status(login.status).json(login)
  }
}
