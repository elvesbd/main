import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [
        'amqps://xpsgnyxv:LO-4ofzqJSVdmyOAnehCot8yyq3C6n5W@clam.rmq.cloudamqp.com/xpsgnyxv',
      ],
      queue: 'main_queue',
      queueOptions: {
        durable: false,
      },
    },
  });

  app.listen();
  console.log('microservice is running');
}
bootstrap();
