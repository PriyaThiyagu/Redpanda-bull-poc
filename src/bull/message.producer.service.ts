import { InjectQueue } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import { Queue } from "bull";
import { SessionDto } from "../user/user.controller";

@Injectable()
export class MessageProducerService{
    constructor(@InjectQueue('message-queue')private queue:Queue){}

    async sendMessage(dto:SessionDto){
        await this.queue.add('message-job',{
            userName:dto.userName,
            password:dto.password
        },)
    }
    async signin(dto:SessionDto){
        await this.queue.add('message-job1',{
            userName:dto.userName,
            password:dto.password
        })
        
    }
}