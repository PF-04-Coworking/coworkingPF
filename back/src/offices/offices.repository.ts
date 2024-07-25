import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Office } from 'src/entities/Offices.entity';
import * as data from '../utils/data.json';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OfficeRepository {
  constructor(
    @InjectRepository(Office) private officeRepository: Repository<Office>,
  ) {}

  async getAllOffices() {
    const offices = await this.officeRepository.find({
      relations: {
        reservations: true,
      },
    });
    return offices;
  }

  async addOffices() {
    data?.map(async (element) => {
      const office = new Office();
      office.name = element.name;
      office.location = element.location;
      office.description = element.description;
      office.capacity = element.capacity;
      office.stock = element.stock;

      await this.officeRepository
        .createQueryBuilder()
        .insert()
        .into(Office)
        .values(office)
        .execute();
    });
    return 'Offices added successfully';
  }

  async getOfficeById(id: string) {
    const office = await this.officeRepository.findOneBy({ id });
    if (!office) throw new Error('Office not found');
    return office;
  }
}
