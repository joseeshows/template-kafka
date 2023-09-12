import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {
  Client,
  ClientKafka,
  KafkaOptions,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { kafka } from './kafka';

@Controller()
export class AppController {
  @Client(kafka as KafkaOptions)
  client: ClientKafka;

  constructor(private readonly appService: AppService) {}

  async onModuleInit() {
    this.client.subscribeToResponseOf('teste_topic');
    await this.client.connect();
  }

  @Get()
  getHello(): string {
    this.client.emit('teste_topic', 'hello');
    return this.appService.getHello();
  }

  @MessagePattern('teste_topic')
  processTopic(@Payload() message: any): any {
    console.log(message);
    return message;
  }
}
