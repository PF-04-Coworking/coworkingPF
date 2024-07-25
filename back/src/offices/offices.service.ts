import { Injectable } from '@nestjs/common';
import { OfficeRepository } from 'src/repositories/offices.repository';

@Injectable()
export class OfficeService {
  constructor(private officeRepository: OfficeRepository) {}

  getAllOffices() {
    return this.officeRepository.getAllOffices();
  }

  addOffices() {
    return this.officeRepository.addOffices();
  }

  getOfficeById(id: string) {
    return this.officeRepository.getOfficeById(id);
  }
}
