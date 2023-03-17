import { Injectable, OnApplicationShutdown, OnModuleInit } from "@nestjs/common";
import { Kafka, Producer, ProducerRecord } from "kafkajs";

@Injectable()
export class ProducerService implements OnModuleInit, OnApplicationShutdown{
    private readonly kafka=new Kafka({
        brokers:['localhost:9092'],
        clientId:'my-app',
        sasl:{
            username:'admin',
            password:'123456',
            mechanism:'scram-sha-256'
        }
    });
    
    private readonly producer:Producer=this.kafka.producer();
    

    async onModuleInit() {
        await this.producer.connect();
    }

    async produce_message(topic,partition,message){
        await this.producer.send({
            topic,
            messages:[
                {
                    value:message,
                    partition:partition
                }
            ]
        })
    }

    async produce(record:ProducerRecord){
        await this.producer.send(record);
    }

    async onApplicationShutdown() {
        await this.producer.disconnect();
    }
}