import { user } from "@prisma/client";


export class Auth implements user {
    id : number
    username : string
    password : string
    createdAt: Date;
    updatedAt: Date;
}
