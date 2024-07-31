// src/payments/payments.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PaymentsController } from './payments.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [PaymentsController],
})
export class PaymentsModule {}
