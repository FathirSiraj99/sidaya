installing nest {
    npm i -g @nest/cli -> installing nest CLI
    nest new nama-project -> installing nest project
}
package {
    uuid
    class-validator
    class-transformer
    date-fns
}

create database {
    mysql -u root -p
    create database "nest"
    exit
}

install prisma {
    npx prisma -> installing prisma dependencies
    npx prisma init -> setup prisma into project
    npx prisma migrate dev -> migrating into database 
    npx prisma db push -> add migrate to exiting DB
    npm i @prisma/client -> installing prisma client
    nest g mo prisma -> add prisma module
    nest g s prisma -> add prisma service
    add to prisma.service {
        import { Injectable, OnModuleInit } from '@nestjs/common';
        import { PrismaClient } from '@prisma/client';

        @Injectable()
        export class PrismaService extends PrismaClient implements OnModuleInit {
        async onModuleInit() {
            await this.$connect();
        }
        }
    }
}

add feature {
    nest g mo name -> add module -> generate first
    nest g co name -> add controller
    nest g s name -> add service
}

writeable files {
    *.controller.ts -> API integration
    *.module.ts -> Importing/Exporting module
    *.service.ts -> DB integration
}

running project developer -> npm run start:dev
running project -> npm run dev