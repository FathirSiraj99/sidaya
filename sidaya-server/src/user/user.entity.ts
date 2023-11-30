import { $Enums, User } from "@prisma/client";

export class UserEntity implements User {
    id: number;
    username: string;
    password: string;
    roles: $Enums.Role;
    createdAt: Date;
    updatedAt: Date;
}