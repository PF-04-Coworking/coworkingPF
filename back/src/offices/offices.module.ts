import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfficeController } from 'src/offices/offices.controller';
import { Office } from 'src/entities/Offices.entity';
import { OfficeRepository } from 'src/repositories/offices.repository';
import { OfficeService } from 'src/offices/offices.service';

@Module({
  imports: [TypeOrmModule.forFeature([Office])],
  controllers: [OfficeController],
  providers: [OfficeService, OfficeRepository],
})
export class OfficeModule {}
