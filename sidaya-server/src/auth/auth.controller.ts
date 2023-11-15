import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthLoginDto, AuthRegisterDto } from './auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  @ApiBody({ type: [AuthRegisterDto] })
  async register(@Body() data: AuthRegisterDto) {
    return await this.authService.register(data)
  }

  @Post('login')
  @ApiBody({ type: [AuthLoginDto] })
  async loginWithUsername(@Body() data: AuthLoginDto) {
    return await this.authService.login(data)
  }
}
