import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGateway } from './chat.gateway';
import { KafkaService } from './kafka/kafka.service';


@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ChatGateway, KafkaService],
})
export class AppModule {}
