import { Controller, Get, Param, Query } from '@nestjs/common';
import { OfficeService } from 'src/offices/offices.service';

@Controller('offices')
export class OfficeController {
  constructor(private readonly officeService: OfficeService) {}

  @Get()
  getAllOffices(@Query('page') page: number, @Query('limit') limit: number) {
    return this.officeService.getAllOffices(Number(page), Number(limit));
  }

  @Get('seeder')
  addOffices() {
    return this.officeService.addOffices();
  }

  @Get(':id')
  getOfficeById(@Param('id') id: string) {
    return this.officeService.getOfficeById(id);
  }
}
