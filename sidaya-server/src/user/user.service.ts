import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChangePasswordDto, ChangeUsernameDto, CreateUserDto, UpdateUserDTo } from './user.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
    constructor(private readonly db: PrismaService) { }

    async create(data: CreateUserDto) {
        const hashedPassword = bcrypt.hash(data.password, 8)
        const user = await this.db.user.create({
            data: {
                ...data,
                password: hashedPassword
            }
        })

        return {
            status: HttpStatus.CREATED,
            data: {
                user: user
            }
        }
    }

    async findAll() {
        const user = await this.db.user.findMany()

        return {
            status: HttpStatus.OK,
            data: {
                user: user
            }
        }
    }

    async findAllUser() {
        const user = await this.db.user.findMany({
            where: { roles: "USER" }
        })

        return {
            status: HttpStatus.OK,
            data: {
                user: user
            }
        }
    }

    async findAllAdmin() {
        const admin = await this.db.user.findMany({
            where: { roles: 'ADMIN' }
        })

        return {
            status: HttpStatus.OK,
            data: {
                user: admin
            }
        }
    }

    async findById(id: number) {
        const user = await this.db.user.findUnique({
            where: { id }
        })

        if (!user) {
            return {
                status: HttpStatus.NOT_FOUND,
                data: null
            }
        }

        return {
            status: HttpStatus.OK,
            data: {
                user: user
            }
        }
    }

    async update(id: number, data: UpdateUserDTo) {

        const hashedPassword = await bcrypt.hash(data.password, 8)

        const updatedUser = await this.db.user.update({
            where: { id },
            data: {
                ...data,
                password: hashedPassword
            }
        })

        return {
            status: HttpStatus.OK,
            data: {
                user: updatedUser
            }
        }
    }

    async updatePassword(id: number, data: ChangePasswordDto) {
        const user = await this.db.user.findUnique({
            where: { id }
        })

        const isPasswordValid = bcrypt.compare(user.password, data.oldPassword)
        if (!isPasswordValid) {
            return {
                status: HttpStatus.UNAUTHORIZED,
                data: null,
            }
        }

        const hashedPassword = bcrypt.hash(data.newPasssword, 8)
        const updatedUser = await this.db.user.update({
            where: { id },
            data: {
                password: hashedPassword
            }
        })

        return {
            status: HttpStatus.OK,
            data: {
                user: updatedUser
            }
        }
    }

    async updateUsername(id: number, data: ChangeUsernameDto) {
        const existingUsername = await this.db.user.findUnique({
            where: { username: data.username }
        })

        if (existingUsername) {
            return {
                status: HttpStatus.CONFLICT,
                data: null,
            }
        }

        const updatedUser = await this.db.user.update({
            where: { id },
            data
        })

        return {
            status: HttpStatus.OK,
            data: {
                user: updatedUser
            }
        }
    }

    async delete(id: number) {
        await this.db.user.delete({
            where: { id }
        })

        return {
            status: HttpStatus.GONE,
        }
    }
}
