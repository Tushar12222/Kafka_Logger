import { Injectable } from '@nestjs/common';
import { Kafka, Producer, Admin } from 'kafkajs';

@Injectable()
export class KafkaService {
  private producer: Producer;
  private admin: Admin;

  constructor() {
    const kafka = new Kafka({
      clientId: 'chat-app',
      brokers: ['192.168.235.104:9092'],
    });

    this.producer = kafka.producer();
    this.admin = kafka.admin();
  }

  async createTopic(): Promise<void> {
    await this.admin.connect();
    await this.admin.createTopics({
      topics: [
        {
          topic: 'chats',
          numPartitions: 1,
        },
      ],
    });
    await this.admin.disconnect();
  }

  async produceMessage(topic: string, message: string): Promise<void> {
    await this.producer.connect();
    await this.producer.send({
      topic,
      messages: [{ value: JSON.stringify({date: Date().toString() , message: message}) }],
    });
    await this.producer.disconnect();
  }
}
