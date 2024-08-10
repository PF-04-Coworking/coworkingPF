import { Module } from '@nestjs/common';
import { NodeMailerService } from './node-mailer.service';
import { NodeMailerController } from './node-mailer.controller';
import { NodeMailerRepository } from './node-mailer.repository';

@Module({
  imports:[],
  controllers:[ NodeMailerController],
  providers: [NodeMailerService, NodeMailerRepository]
})
export class NodeMailerModule {}
