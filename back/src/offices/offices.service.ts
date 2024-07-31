import { Injectable, NotFoundException } from '@nestjs/common';
import { OfficeRepository } from 'src/offices/offices.repository';
import { CreateOfficesDto, UpdateOfficeDto } from './offices.dto';
import { FileUploadRepository } from 'src/file-upload/file-upload.repository';

@Injectable()
export class OfficeService {
  constructor(
    private officeRepository: OfficeRepository,
    private fileUploadRepository: FileUploadRepository,
  ) {}

  getAllOffices(page: number, limit: number, filters: any) {
    return this.officeRepository.getAllOffices(page, limit, filters);
  }

  addOffices() {
    return this.officeRepository.addOffices();
  }

  getOfficeById(id: string) {
    return this.officeRepository.getOfficeById(id);
  }

  async createOffice(office: CreateOfficesDto, file: Express.Multer.File) {
    if (file) {
      const response = await this.fileUploadRepository.uploadImage(file);
      const imgUrl = response.secure_url;
      if (!imgUrl) {
        throw new NotFoundException('File not uploaded');
      }
      office.imgUrl = imgUrl;
    }

    // Temporalmente
    office.stock = 100;
    office.capacity = 20;
    office.price = 100;

    return this.officeRepository.createOffice(office);
  }

  updateOffice(office: UpdateOfficeDto, id: string) {
    return this.officeRepository.updateOffice(office, id);
  }

  deleteOffice(id: string) {
    return this.officeRepository.deleteOffice(id);
  }
}

