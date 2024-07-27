import { Injectable } from '@nestjs/common';
import { OfficeRepository } from 'src/offices/offices.repository';

@Injectable()
export class OfficeService {
  constructor(private officeRepository: OfficeRepository) {}

  getAllOffices(page: number, limit: number) {
    return this.officeRepository.getAllOffices(page, limit);
  }

  addOffices() {
    return this.officeRepository.addOffices();
  }

  getOfficeById(id: string) {
    return this.officeRepository.getOfficeById(id);
  }
}
