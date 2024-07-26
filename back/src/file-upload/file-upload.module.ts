import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Office } from 'src/entities/Offices.entity';
import { User } from 'src/entities/Users.entity';
import { FileUploadController } from './file-upload.controller';
import { FileUploadService } from './file-upload.service';
import { FileUploadRepository } from './file-upload.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User, Office])],
  controllers: [FileUploadController],
  providers: [FileUploadService, FileUploadRepository],
})
export class FileUploadModule {}
