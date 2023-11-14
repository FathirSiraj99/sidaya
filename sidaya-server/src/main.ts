import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NotificationService } from './notification/notification.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.setGlobalPrefix('api');
  app.enableCors();

  // const notificationService = app.get(NotificationService);

  // setInterval(() => {
  //   notificationService.handleScheduledTask();
  // }, 1000);

  await app.listen(process.env.PORT, () => {
    console.log('Successfully Connected');
  });
}

bootstrap();
