import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NotificationService {
    constructor(private readonly prisma: PrismaService) { }

    @Cron(CronExpression.EVERY_5_MINUTES)
    async handleScheduledTask() {

        // Fetch users with their associated activities and details
        const usersWithActivities = await this.prisma.user.findMany({
            include: {
                area: {
                    include: {
                        ActivityDetail: true,
                    },
                },
            },
        });

        // Iterate through users and create notifications
        for (const user of usersWithActivities) {
            for (const area of user.area) {
                // Access the specific ActivityDetail object
                const activityDetail = area.ActivityDetail as any;
                if (activityDetail) {
                    const notificationTime = this.calculateNotificationTime(activityDetail.time);
                    const currentTime = new Date().toLocaleTimeString('id-ID', { hour12: false });

                    // console.log('Current Time:', currentTime);
                    // console.log('Notification Time:', notificationTime);

                    if (notificationTime === currentTime) {
                        const message = `Reminder: ${activityDetail.name} at ${activityDetail.time}`;
                        await this.prisma.notification.create({
                            data: {
                                userId: user.id,
                                message: message,
                            },
                        });

                        // console.log('Notification created:', message);
                    }
                }
            }
        }

        // console.log('Scheduled task executed at', new Date().toLocaleTimeString('en-US', { hour12: false }));
    }

    private calculateNotificationTime(activityTime: string): string {
        const [hours, minutes, seconds] = activityTime.split(':').map(Number);
        const notificationHours = hours - 1 < 0 ? 23 : hours - 1;
        return `${notificationHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}
