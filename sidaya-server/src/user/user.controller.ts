import { Controller, Delete, Get, Param, ParseIntPipe, Patch, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiParam } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('user')
@UseGuards(AuthGuard, RolesGuard)
@ApiBearerAuth() // Menandakan bahwa autentikasi token bearer diperlukan
@Roles(Role.ADMIN)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('')
  @ApiOperation({ summary: 'Get all users' })
  async findAllUser() {
    return await this.userService.findAllUser()
  }

  @Get('find/admin')
  @ApiOperation({ summary: 'Get all admin users' })
  async findAllAdmin() {
    return await this.userService.findAllAdmin()
  }

  @Get('update/:id')
  @ApiOperation({ summary: 'Update user to admin' })
  @ApiParam({ name: 'id', description: 'User ID', type: Number })
  async updateUserToAdmin(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.updateUserToAdmin(id)
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete user' })
  @ApiParam({ name: 'id', description: 'User ID', type: Number })
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.delete(id)
  }
}
