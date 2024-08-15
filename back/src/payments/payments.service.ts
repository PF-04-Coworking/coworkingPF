import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-06-20',
    }); 
  }

  async createPaymentIntent(amount: number, currency: string) {
    try {
      return await this.stripe.paymentIntents.create({
        amount: amount*100,
        currency,
        payment_method_types: ['card'], // Añade los métodos de pago que quieres aceptar
      });
    } catch (error) {
      // Manejo de errores más específico puede ser añadido aquí
      console.error('Error creating payment intent:', error);
      throw new Error('Unable to create payment intent');
    }
  }
}


