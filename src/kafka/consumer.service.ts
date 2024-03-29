import { Injectable, OnApplicationShutdown } from "@nestjs/common";
import { Consumer, ConsumerRunConfig, ConsumerSubscribeTopics, Kafka } from "kafkajs";

@Injectable()
export class ConsumerService implements OnApplicationShutdown{
    private readonly kafka=new Kafka({
        clientId:'my-app',
        sasl:{
            username:'admin',
            password:'123456',
            mechanism:'scram-sha-256'
        },
        brokers:['localhost:9092'],
    });
    private readonly consumers:Consumer
        
    async consume(topic:ConsumerSubscribeTopics, config:ConsumerRunConfig){
        const consumer=this.kafka.consumer({groupId:'nestjs-kafka'});
        await consumer.connect();
        await consumer.subscribe(topic);
        await consumer.run(config);
    }
      
    
    async onApplicationShutdown() {
            await this.consumers.disconnect();
        }
    }
