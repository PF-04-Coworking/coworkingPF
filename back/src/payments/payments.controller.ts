import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Controller('payments')
export class PaymentsController {
  private stripe: Stripe;

  constructor(private configService: ConfigService) {
    const stripeSecretKey = this.configService.get<string>('STRIPE_SECRET_KEY');
    if (!stripeSecretKey) {
      throw new Error('Stripe secret key not defined in configuration');
    }

    this.stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2024-06-20',
    });
  }

  @Post('create-payment-intent')
  async createPaymentIntent(
    @Body() body: { amount: number; currency: string },
    @Res() res,
  ) {
    const { amount, currency } = body;

    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount,
        currency,
        payment_method_types: ['card'],
      });

      return res.status(HttpStatus.OK).json({ 
        clientSecret: paymentIntent.client_secret 
      });
    } catch (error) {
      console.error('Error creating payment intent:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  }
}

