import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NotificationService {
    constructor(private readonly db: PrismaService) { }

    async create(data: any) {
        return await this.db.notification.create({
            data: {
                ...data,
                userId: data.userId
            }
        })
    }

    async findAllByUser(userId: number) {
        return await this.db.notification.findMany({
            where: { userId },
            orderBy: { isOpened: 'asc' }
        })
    }

    async findOne(id: string) {
        return await this.db.notification.findUnique({
            where: { id }
        })
    }

    async update(id: string, data: any) {
        return await this.db.notification.update({
            where: { id },
            data
        })
    }

    async delete(id: string) {
        return await this.db.notification.delete({
            where: { id }
        })
    }

    @Cron(CronExpression.EVERY_30_MINUTES)
    async handleScheduledTask() {
        // Fetch users with their associated activities and details
        const usersWithActivities = await this.db.user.findMany({
            include: {
                area: {
                    include: {
                        ActivityDetail: true,
                        ProblemDetail: true, // Include ProblemDetail as well
                    },
                },
            },
        });

        // Iterate through users and create notifications
        for (const user of usersWithActivities) {
            for (const area of user.area) {
                // Access the specific ActivityDetail and ProblemDetail objects
                const problemDetail = area.ProblemDetail as any;
                const activityDetail = area.ActivityDetail as any;

                if (problemDetail) {
                    const notificationTime = this.calculateNotificationTime(problemDetail.time);
                    const currentTime = new Date().toLocaleTimeString('id-ID', { hour12: false });

                    console.log('Current Time:', currentTime);
                    console.log('Notification Time (ProblemDetail):', notificationTime);
                    console.log('notif split', notificationTime.split(':')[0])
                    console.log('current split', currentTime.split(':')[0])

                    // Check if notification for the current problem detail and user already exists
                    const existingNotification = await this.db.notification.findFirst({
                        where: {
                            userId: user.id,
                            message: {
                                contains: `Reminder: ${problemDetail.name} at ${notificationTime}`,
                            },
                        },
                    });

                    if (!existingNotification && notificationTime.split(':')[0] === currentTime.split('.')[0]) {
                        const message = `Reminder: ${problemDetail.name} at ${notificationTime}`;
                        await this.db.notification.create({
                            data: {
                                type: 2,
                                userId: user.id,
                                message: message,
                            },
                        });

                        console.log('Notification created (ProblemDetail):', message);
                    }
                } else if (activityDetail) {
                    const notificationTime = this.calculateNotificationTime(activityDetail.time);
                    const currentTime = new Date().toLocaleTimeString('id-ID', { hour12: false });

                    console.log('Current Time:', currentTime);
                    console.log('Notification Time (ActivityDetail):', notificationTime);
                    console.log('notif split', notificationTime.split(':')[0])
                    console.log('current split', currentTime.split(':')[0])

                    // Check if notification for the current activity and user already exists
                    const existingNotification = await this.db.notification.findFirst({
                        where: {
                            userId: user.id,
                            message: {
                                contains: `Reminder: ${activityDetail.name} at ${notificationTime}`,
                            },
                        },
                    });

                    if (!existingNotification && notificationTime.split(':')[0] === currentTime.split('.')[0]) {
                        const message = `Reminder: ${activityDetail.name} at ${notificationTime}`;
                        await this.db.notification.create({
                            data: {
                                userId: user.id,
                                message: message,
                            },
                        });

                        console.log('Notification created (ActivityDetail):', message);
                    }
                }
            }
        }
    }

    private calculateNotificationTime(activityTime: string): string {
        const [hours, minutes, seconds] = activityTime.split(':').map(Number);
        const notificationHours = hours - 1 < 0 ? 23 : hours;
        return `${notificationHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }

}
