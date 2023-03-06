import { OnQueueActive, Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { ProducerService } from "src/kafka/producer.service";


@Processor('message-queue')
export class MessageConsumer {
    constructor(private readonly producerService:ProducerService){}
    @Process('message-job')
    async messagejob(job: Job<any>) {
        console.log(job.data);
        await this.producerService.produce({
            topic:'chat-room',
            messages:[
                {
                    value:`user profile created succesfully for ${job.data['userName']}`
                }
            ]
        })
    }

    @Process('message-job1')
    async signin(job:Job<unknown>){
        let userName=job.data['userName'];
        let password=job.data['password'];
        if(userName==='priya' && password==='123456'){
        await this.producerService.produce({
            topic:'chat-room',
            messages:[
                {
                    value:'user signed in successfully'

                }
            ]
        })
    }else{
        await this.producerService.produce({
            topic:'chat-room',
            messages:[
                {
                    value:'invalid credentials'
                }
            ]
        })
    }
}
}