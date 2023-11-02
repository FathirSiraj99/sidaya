import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('find-all')
  async findAll() {

  }

  @UseGuards(AuthGuard)
  @Get()
  async findUserBySelf(@Req() req) {
    const userId = req.user.sub
    return await this.userService.validateUser(userId)
  }

  @UseGuards(AuthGuard)
  @Patch('update')
  async updateUserBySelf(@Req() req, @Body() data: { activityTemplateId: string }) {
    const userId = req.user.sub
    return await this.userService.updateUserBySelf(userId, data)
  }
}
