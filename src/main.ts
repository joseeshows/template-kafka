import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices/enums';

async function bootstrap() {
  const appApi = await NestFactory.create(AppModule);
  await appApi.listen(3000);

  const appMicroService =
    await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['localhost:2181'],
        },
      },
    });
  // appMicroService.listen();
}
bootstrap();
