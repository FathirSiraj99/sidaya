import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private readonly db: PrismaService) { }

    async findAllUser() {
        return await this.db.user.findMany({
            select: {
                id: true,
                username: true,
                roles: true
            }
        })
    }

    async findAllAdmin() {
        return await this.db.user.findMany({
            where: { roles: 'ADMIN' }
        })
    }

    async updateUserToAdmin(id: number) {
        return await this.db.user.update({
            where: { id },
            data: { roles: 'ADMIN' }
        })
    }

    async delete(id: number) {
        return await this.db.user.delete({
            where: { id }
        })
    }
}
