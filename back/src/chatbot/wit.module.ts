import { Module } from '@nestjs/common';
import { WitService } from './wit.service';
import { ChatbotController } from './wit.controller';

@Module({
  controllers: [ChatbotController],
  providers: [WitService],
  exports: [WitService],
})
export class ChatbotModule {}
