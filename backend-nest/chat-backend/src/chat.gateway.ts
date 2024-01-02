import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { KafkaService } from './kafka/kafka.service';

@WebSocketGateway(3002)
export class ChatGateway {
  constructor(private kafkaService: KafkaService) {
  }
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('send-message')
  async handleMessage(
    @MessageBody() message: string,
    @ConnectedSocket() client: Socket,
  ) {
    client.broadcast.emit('receive-message', message);
    await this.kafkaService.produceMessage('chats', message);
  }
}
