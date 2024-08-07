import { Controller, Post, Body } from '@nestjs/common';
import { WitService } from './wit.service';

@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly witService: WitService) {}

  @Post('message')
  async handleMessage(@Body('message') message: string) {
    const witResponse = await this.witService.queryWitAI(message);
    return witResponse;
  }
}
