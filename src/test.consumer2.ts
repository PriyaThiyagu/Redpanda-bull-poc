import { Injectable, OnModuleInit } from "@nestjs/common";
import { ConsumerService } from "./kafka/consumer.service";

@Injectable()
export class TestConsumer2 implements OnModuleInit{
    constructor(private readonly consumerService:ConsumerService){}

    async onModuleInit() {
        await this.consumerService.consume(
            {topics:['chat-room'],fromBeginning:true},{
            
                eachMessage:async({topic,partition,message})=>{
                    console.log("Consumer 2: ",{
                        value:message.value.toString(),
                        topic:topic.toString(),
                        partition:partition.toString()
                    }
                    )
                }
            }
        )
    }
}
