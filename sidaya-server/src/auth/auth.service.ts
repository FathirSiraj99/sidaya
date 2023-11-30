import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { AuthLoginDto, AuthRegisterDto } from './auth.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwt: JwtService
    ) { }

    async register(data: AuthRegisterDto) {
        const existingUser = await this.prisma.user.findFirst({
            where: { username: data.username }
        })

        if (existingUser) {
            throw new UnauthorizedException('username already in use')
        }

        const hashedPassword = await bcrypt.hash(data.password, 10)

        const user = await this.prisma.user.create({
            data: {
                ...data,
                password: hashedPassword
            }
        })

        const { password: newUserPassword, ...rest } = user

        return {
            status: HttpStatus.CREATED,
            data: {
                user: rest
            },
        }

    }

    async login(data: AuthLoginDto) {
        const user = await this.prisma.user.findUnique({
            where: { username: data.username }
        })

        if (!user) {
            throw new UnauthorizedException('email not found')
        }

        const password = await bcrypt.compare(data.password, user.password)

        if (!password) {
            throw new UnauthorizedException('password wrong')
        }

        const payload = { sub: user.id, username: user.username, role: user.roles }

        return {
            status: HttpStatus.OK,
            access_token: await this.jwt.signAsync(payload)
        }
    }

}
