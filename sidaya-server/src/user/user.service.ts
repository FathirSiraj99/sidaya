import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private readonly db: PrismaService) { }

    async findAllUser() {
        const user = await this.db.user.findMany({
            select: {
                id: true,
                username: true,
                roles: true
            }
        })

        if (!user) {
            return {
                response: HttpStatus.NOT_FOUND,
            }
        }

        return {
            response: HttpStatus.OK,
            data: {
                user: user
            }
        }
    }

    async findAllAdmin() {
        const admin = await this.db.user.findMany({
            where: { roles: 'ADMIN' }
        })

        if (!admin) {
            return {
                response: HttpStatus.NOT_FOUND
            }
        }

        return {
            response: HttpStatus.OK,
            data: {
                admin: admin
            }
        }
    }

    async updateUserToAdmin(id: number) {
        const updatedAdmin = await this.db.user.update({
            where: { id },
            data: { roles: 'ADMIN' }
        })

        if (!updatedAdmin) {
            return {
                response: HttpStatus.NOT_FOUND
            }
        }

        return {
            response: HttpStatus.OK,
            data: {
                admin: updatedAdmin
            }
        }
    }

    async delete(id: number) {
        const deletedUser = await this.db.user.delete({
            where: { id }
        })

        if (!deletedUser) {
            return {
                response: HttpStatus.NOT_FOUND
            }
        }

        return {
            response: HttpStatus.GONE
        }
    }
}
