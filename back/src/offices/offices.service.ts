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

  async onModuleInit() {
    await this.addOffices();
  }

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

    return this.officeRepository.createOffice(office);
  }

  async updateOffice(
    id: string,
    office: UpdateOfficeDto,
    file: Express.Multer.File,
  ) {
    const foundOffice = await this.officeRepository.getOfficeById(id);

    if (!foundOffice) {
      throw new NotFoundException(`No office was found to update`);
    }

    console.log('FILE:', file);

    if (file) {
      const response = await this.fileUploadRepository.uploadImage(file);
      const imgUrl = response.secure_url;
      if (!imgUrl) {
        throw new NotFoundException('File not uploaded');
      }
      office['imgUrl'] = imgUrl;
    }

    await this.officeRepository.updateOffice(office, id);

    const dbOffice = await this.officeRepository.getOfficeById(id);

    return dbOffice;
  }

  deleteOffice(id: string) {
    return this.officeRepository.deleteOffice(id);
  }

  activateOffice(id: string){
    return this.officeRepository.activateOffice(id);
  }
  
  deactivateOffice(id: string){
    return this.officeRepository.deactivateOffice(id);
  }
}

