import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfficeController } from 'src/offices/offices.controller';
import { Office } from 'src/entities/Offices.entity';
import { OfficeRepository } from 'src/offices/offices.repository';
import { OfficeService } from 'src/offices/offices.service';
import { User } from 'src/entities/Users.entity';
import { JwtModule } from '@nestjs/jwt';
import { FileUploadRepository } from 'src/file-upload/file-upload.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Office, User]), JwtModule],
  controllers: [OfficeController],
  providers: [OfficeService, OfficeRepository, FileUploadRepository],
})
export class OfficeModule {}
