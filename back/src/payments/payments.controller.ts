// payments.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @Post('create-payment-intent')
  async createPaymentIntent(@Body() createPaymentIntentDto: { amount: number; currency: string }) {
    return this.paymentsService.createPaymentIntent(createPaymentIntentDto.amount, createPaymentIntentDto.currency);
  }
}
