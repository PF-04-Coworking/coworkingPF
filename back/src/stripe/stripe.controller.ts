import { Body, Controller, Get, Post } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { Cart } from './cart.model';

@Controller('stripe')
export class StripeController {
  constructor(private stripeService: StripeService) {}
}
