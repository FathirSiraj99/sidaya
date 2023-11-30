import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Query, Req, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from '@prisma/client';
import { Response } from 'express';
import { ChangePasswordDto, ChangeUsernameDto, UpdateUserDTo } from './user.dto'; // Pastikan import DTO yang benar

@ApiTags('User')
@UseGuards(AuthGuard)
@ApiBearerAuth()
// @Roles(Role.ADMIN)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('find')
  @ApiOperation({ summary: 'Get all users' })
  @ApiQuery({ name: 'role', description: 'Role of the user', required: false, enum: Role }) // Menambahkan enum Role untuk kueri
  @ApiResponse({ status: 200, description: 'List of users fetched successfully.' }) // Menggunakan DTO untuk respons
  async findAllUser(@Query('role') role?: Role, @Res() res?: Response) {
    if (role === Role.ADMIN) {
      const user = await this.userService.findAllAdmin();
      return res.status(user.status).json(user);
    }
    if (role === Role.USER) {
      const user = await this.userService.findAllUser()
      return res.status(user.status).json(user)
    }
    const user = await this.userService.findAll();
    return res.status(user.status).json(user);
  }

  @Patch('update/username')
  @ApiOperation({ summary: 'Update username' })
  @ApiResponse({ status: 200, description: 'Username updated successfully.' }) // Menggunakan DTO untuk respons
  @ApiResponse({ status: 404, description: 'User not found.' })
  async updateUsername(@Req() req, @Body() data: ChangeUsernameDto, @Res() res: Response) {
    const id = req.user.sub
    const user = await this.userService.updateUsername(id, data)
    return res.status(user.status).json(user)
  }

  @Patch('update/password')
  @ApiOperation({ summary: 'Update password' })
  @ApiResponse({ status: 200, description: 'Password updated successfully.' }) // Menggunakan DTO untuk respons
  @ApiResponse({ status: 404, description: 'User not found.' })
  async updatePassword(@Req() req, @Body() data: ChangePasswordDto, @Res() res: Response) {
    const id = req.user.sub
    const user = await this.userService.updatePassword(id, data)
    return res.status(user.status).json(user)
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Update user to admin' })
  @ApiParam({ name: 'id', description: 'User ID', type: Number })
  @ApiBody({ type: UpdateUserDTo }) // Menggunakan DTO untuk permintaan
  @ApiResponse({ status: 200, description: 'User updated successfully to admin.' }) // Menggunakan DTO untuk respons
  @ApiResponse({ status: 404, description: 'User not found.' })
  async updateUserToAdmin(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateUserDTo, @Res() res: Response) {
    const admin = await this.userService.update(id, data);
    return res.status(admin.status).json(admin);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete user' })
  @ApiParam({ name: 'id', description: 'User ID', type: Number })
  @ApiResponse({ status: 200, description: 'User deleted successfully.' }) // Menggunakan DTO untuk respons
  @ApiResponse({ status: 404, description: 'User not found.' })
  async deleteUser(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    const user = await this.userService.delete(id);
    return res.status(user.status).json(user);
  }
}
