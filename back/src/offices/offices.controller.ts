import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { OfficeService } from 'src/offices/offices.service';
import { Office } from 'src/entities/Offices.entity';

@ApiTags('Offices')
@Controller('offices')
export class OfficeController {
  constructor(private readonly officeService: OfficeService) {}

  @Get()
  @ApiOperation({ summary: 'Get all offices' })
  @ApiResponse({ status: 200, description: 'Return all offices.', type: [Office] })
  getAllOffices() {
    return this.officeService.getAllOffices();
  }

  @Get('seeder')
  @ApiOperation({ summary: 'Seed offices data' })
  @ApiResponse({ status: 200, description: 'The offices have been successfully seeded.' })
  addOffices() {
    return this.officeService.addOffices();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get office by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Office ID' })
  @ApiResponse({ status: 200, description: 'Return office by ID.', type: Office })
  getOfficeById(@Param('id') id: string) {
    return this.officeService.getOfficeById(id);
  }
}

