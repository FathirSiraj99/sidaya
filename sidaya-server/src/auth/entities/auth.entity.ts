import { User } from "@prisma/client";


export class Auth implements User {
    id: number
    username: string
    password: string
    createdAt: Date;
    updatedAt: Date;
    activity_templateId: string;
    areaId: string;
}
