import { Controller, Get, Param } from '@nestjs/common';
import { OfficeService } from 'src/services/offices.service';

@Controller('offices')
export class OfficeController {
  constructor(private readonly officeService: OfficeService) {}

  @Get()
  getAllOffices() {
    return this.officeService.getAllOffices();
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
