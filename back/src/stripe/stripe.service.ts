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

  checkout(cart: Cart) {
    const totalPrice = cart.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0,
    );
    return this.stripe.paymentIntents.create({
      amount: +totalPrice.toFixed(2) * 100, //cents
      currency: 'usd', // set currency
      payment_method_types: ['card'],
    });
  }

  async getProducts(): Promise<Stripe.Product[]> {
    const products = await this.stripe.products.list();
    return products.data;
  }

  async getCustomers() {
    const customers = await this.stripe.customers.list({});
    return customers.data;
  }
}
