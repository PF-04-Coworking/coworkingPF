/* eslint-disable prettier/prettier */
import { DynamicModule, Module } from '@nestjs/common';
import { StripeController } from './stripe.controller';
import { StripeService } from './stripe.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PaymentsController } from '../payments/payments.controller';

@Module({
  // controllers: [StripeController, PaymentsController],
  controllers: [PaymentsController],
  providers: [StripeService],
})
export class StripeModule {}

