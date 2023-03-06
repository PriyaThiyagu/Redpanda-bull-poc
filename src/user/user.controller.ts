import { Body, Controller, Get, Post } from '@nestjs/common';
// import { AppService } from './app.service';
import { MessageProducerService } from '../bull/message.producer.service';

export interface SessionDto{
  userName:string;
  password:string;
}

@Controller()
export class UserController {
  constructor(
    // private readonly appService: AppService,
    private readonly messageProducerService:MessageProducerService) {}

  
  @Post('create')
  async sendMessage(
    @Body() dto:SessionDto){
    await this.messageProducerService.sendMessage(dto);
    return dto;
  }

  @Post('signin')
  async signin(
    @Body() dto:SessionDto
  ){
    await this.messageProducerService.signin(dto);
    return dto;
  }
}
