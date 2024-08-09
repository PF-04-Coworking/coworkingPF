import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return 'Acá va el index';
  }

  @Get()
  success() {
    return {
      message: 'Transaccion exitosa',
    };
  }
}
