import { Controller, Get } from '@nestjs/common';

@Controller('offices')
export class OfficesController {
  constructor() {}

  @Get()
  getAllOffices() {}

  @Get('seeder')
  addOffices() {}

  @Get(':id')
  getOfficeById() {}
}
