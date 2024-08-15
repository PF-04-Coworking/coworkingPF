import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import Stripe from 'stripe';

@ApiTags('payments')
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
  @ApiOperation({ summary: 'Create a new payment intent' })
  @ApiBody({
    description: 'Payment details',
    schema: {
      type: 'object',
      properties: {
        amount: { type: 'number', description: 'Payment amount in cents' },
        currency: { type: 'string', description: 'Currency code (e.g., usd)' },
        payment_method: {
          type: 'string',
          description: 'Stripe payment method ID',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Payment intent successfully created',
    schema: {
      type: 'object',
      properties: {
        clientSecret: {
          type: 'string',
          description: 'Client secret for the payment intent',
        },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    schema: {
      type: 'object',
      properties: {
        error: { type: 'string', description: 'Error message' },
      },
    },
  })
  async createPaymentIntent(
    @Body() body: { amount: number; currency: string; payment_method: string },
    @Res() res,
  ) {
    const { amount, currency, payment_method } = body;

    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount,
        currency,
        payment_method,
        confirm: true,
        automatic_payment_methods: {
          enabled: true,
          allow_redirects: 'never',
        },
      });

      return res.status(HttpStatus.OK).json({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {
      console.error('Error creating payment intent:', error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  }
}
