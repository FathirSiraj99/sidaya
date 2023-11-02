import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private readonly db: PrismaService) { }

    async validateUser(userId: number) {
        const user = await this.db.user.findUnique({
            where: { id: userId }
        })

        if (!user) throw new NotFoundException("User not found")

        const { password: newUserPassword, ...rest } = user

        return rest
    }

    async updateUserBySelf(userId: number, data: { activityTemplateId: string }) {
        this.validateUser(userId)

        const activityTemplate = await this.db.activity_template.findFirst({
            where: {
                id: data.activityTemplateId
            }
        })


        if (!activityTemplate) throw new NotFoundException("Activity template id not found")

        const updatedUser = await this.db.user.update({
            where: { id: userId },
            data: {
                activity_templateId: activityTemplate.id
            }
        })

        return updatedUser
    }
}
