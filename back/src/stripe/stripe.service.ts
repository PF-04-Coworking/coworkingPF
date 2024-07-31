import { Inject, Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { Cart } from './cart.model';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  // constructor(@Inject('STRIPE_API_KEY') private readonly apiKey: string) {
  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SK, {
      apiVersion: '2024-06-20',
    });
  }

  async createPaymentIntent(amount: number, currency: string) {
    return await this.stripe.paymentIntents.create({
      amount,
      currency,
    });
  }
}
