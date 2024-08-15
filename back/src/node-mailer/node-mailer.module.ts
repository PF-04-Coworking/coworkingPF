import { Module } from '@nestjs/common';
import { NodeMailerService } from './node-mailer.service';
import { NodeMailerController } from './node-mailer.controller';
import { NodeMailerRepository } from './node-mailer.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from 'src/entities/Reservations.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Reservation])],
  controllers:[ NodeMailerController],
  providers: [NodeMailerService, NodeMailerRepository]
})
export class NodeMailerModule {}
