import { Body, Controller, Get, Post } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { Cart } from './cart.model';

@Controller('stripe')
export class StripeController {
  constructor(private stripeService: StripeService) {}

  @Get('products')
  async getProducts() {
    return await this.stripeService.getProducts();
  }

  @Get('customers')
  async getCustomers() {
    return await this.stripeService.getCustomers(); //!Ojo aquí
  }

  @Post()
  checkout(@Body() body: { cart: Cart }) {
    try {
      return this.stripeService.checkout(body.cart);
    } catch (error) {
      return error;
    }
  }
}
