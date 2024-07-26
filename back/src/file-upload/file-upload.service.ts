import { Injectable, NotFoundException } from '@nestjs/common';
import { FileUploadRepository } from './file-upload.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Office } from 'src/entities/Offices.entity';
import { Repository } from 'typeorm';
import { User } from 'src/entities/Users.entity';

@Injectable()
export class FileUploadService {
  constructor(
    private readonly fileUploadRepository: FileUploadRepository,
    @InjectRepository(Office)
    private readonly officeRepository: Repository<Office>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async uploadUserImage(file: Express.Multer.File, userId: string) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const response = await this.fileUploadRepository.uploadImage(file);
    if (!response.secure_url) {
      throw new NotFoundException('File not uploaded');
    }

    const updatedUser = await this.userRepository.update(userId, {
      imgUrl: response.secure_url,
    });

    return updatedUser;
  }

  async uploadOfficeImage(file: Express.Multer.File, officeId: string) {
    const office = await this.officeRepository.findOneBy({ id: officeId });
    if (!office) {
      throw new NotFoundException('Office not found');
    }
    const response = await this.fileUploadRepository.uploadImage(file);
    if (!response.secure_url) {
      throw new NotFoundException('File not uploaded');
    }

    const updatedOffice = await this.officeRepository.update(officeId, {
      imgUrl: response.secure_url,
    });

    return updatedOffice;
  }

}
