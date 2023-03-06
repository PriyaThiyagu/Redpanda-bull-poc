import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";
import { MessageConsumer } from "src/bull/message.consumer";
import { MessageProducerService } from "src/bull/message.producer.service";
import { KafkaModule } from "src/kafka/kafka.module";
import { UserController } from "./user.controller";

@Module({
    imports:[
        KafkaModule,
        BullModule.registerQueue({
            name:'message-queue'
          },
          )
    ],
    controllers:[UserController],
    providers:[MessageConsumer,MessageProducerService]
})
export class UserModule{}