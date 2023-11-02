import { user } from "@prisma/client";


export class Auth implements user {
    id: number
    username: string
    password: string
    activity_templateId: string;
    createdAt: Date;
    updatedAt: Date;
}
