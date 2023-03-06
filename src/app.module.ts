import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { KafkaModule } from './kafka/kafka.module';
import { TestConsumer2 } from './test.consumer2';
import { TestConsumer1 } from './test.consumer1';
import { UserModule } from './user/user.module';
import { TestConsumer3 } from './test.consumer3';

@Module({
  imports: [
    UserModule,
    KafkaModule,
    BullModule.forRoot({
      redis:{
        host:'localhost',
        port:6379
      }
    }),
    
  ],
  providers:[
    TestConsumer1,
    TestConsumer2,
    TestConsumer3
  ]
 
})
export class AppModule {}
