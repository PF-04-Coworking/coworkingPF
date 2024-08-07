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

  @Post('create-checkout-session')
  async createCheckoutSession(
    @Body() body: { amount: number; currency: string; officeId: string; quantity: number },
    @Res() res,
  ) {
    const { amount, currency, officeId, quantity } = body;

    try {
      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency,
              product_data: {
                name: officeId,
              },
              unit_amount: amount,
            },
            quantity,
          },
        ],
        mode: 'payment',
        success_url: 'http://localhost:3000/success', // Cambia esto por la URL de tu página de éxito
        cancel_url: 'http://localhost:3000/cancel', // Cambia esto por la URL de tu página de cancelación
      });

      return res.status(HttpStatus.OK).json({ id: session.id });
    } catch (error) {
      console.error('Error creating checkout session:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  }
}
