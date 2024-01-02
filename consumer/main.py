import logging
from confluent_kafka import Consumer, KafkaError

# Configure logging to write messages to a file
logging.basicConfig(filename='kafka_consumer.log', level=logging.INFO,
                    format='%(asctime)s - %(levelname)s - %(message)s')

consumer = Consumer({
   'bootstrap.servers': '192.168.235.104:9092',  # Replace with your Kafka broker address
   'group.id': 'my-consumer-group',
   'auto.offset.reset': 'earliest'  # You can adjust this based on your requirements
})

topic = 'chats'  # Replace with the Kafka topic you want to consume

def kafka_consumer():
   consumer.subscribe([topic])

   while True:
       msg = consumer.poll(1.0)

       if msg is None:
           continue
       if msg.error():
           if msg.error().code() == KafkaError._PARTITION_EOF:
               continue
           else:
               logging.error(f"Kafka error: {msg.error()}")
               break

       # Process the Kafka message (you can customize this part)
       message_value = msg.value().decode('utf-8')
       logging.info(f"Received message: {message_value}")

if __name__ == '__main__':
   kafka_consumer()
