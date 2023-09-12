import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { kafka } from './kafka';

async function bootstrap() {
  const appApi = await NestFactory.create(AppModule);
  await appApi.listen(3000);

  const appMicroService =
    await NestFactory.createMicroservice<MicroserviceOptions>(
      AppModule,
      kafka as MicroserviceOptions,
    );
  appMicroService.listen();
}
bootstrap();
