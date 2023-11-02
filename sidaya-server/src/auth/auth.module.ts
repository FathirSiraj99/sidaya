
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
    imports: [ JwtModule.register({
      global: true,
      secret: process.env.secret,
      signOptions: { expiresIn: '24h' },
    }),],
    controllers: [AuthController],
    providers: [AuthService, PrismaService],
})
export class AuthModule {}
