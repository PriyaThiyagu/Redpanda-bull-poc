import { Injectable, OnApplicationShutdown } from "@nestjs/common";
import { Consumer, ConsumerRunConfig, ConsumerSubscribeTopics, Kafka } from "kafkajs";

@Injectable()
export class ConsumerService implements OnApplicationShutdown{
    private readonly kafka=new Kafka({
        brokers:['localhost:9092'],
    });
    private readonly consumers:Consumer
        
    async consume(topic:ConsumerSubscribeTopics, config:ConsumerRunConfig){
        const consumer1=this.kafka.consumer({groupId:'nestjs-kafka'});
        const consumer2=this.kafka.consumer({groupId:'nestjs-kafka'});
        await consumer1.connect();
        await consumer1.subscribe(topic);
        await consumer1.run(config);
        await consumer2.connect();
        await consumer2.subscribe(topic);
        await consumer2.run(config);
    }
      
    
    async onApplicationShutdown() {
            await this.consumers.disconnect();
        }
    }
