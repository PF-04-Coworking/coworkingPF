import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Office } from 'src/entities/Offices.entity';
import * as data from '../utils/data.json';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOfficesDto, UpdateOfficeDto } from './offices.dto';

@Injectable()
export class OfficeRepository {
  constructor(
    @InjectRepository(Office) private officeRepository: Repository<Office>,
  ) {}

  async getAllOffices(page: number, limit: number) {
    let offices = await this.officeRepository.find({
      relations: {
        reservations: true,
      },
    });
    const start = (page - 1) * limit;
    const end = page * limit;
    offices = offices.slice(start, end);
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
      office.price = element.price;

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

  async addNewOffice(office: CreateOfficesDto) {
    const tempOffice = office;

    const foundOffice = await this.officeRepository.findOneBy({
      location: tempOffice.location,
    });

    if (foundOffice)
      return new BadRequestException(
        `Office with name ${foundOffice.name} and location ${foundOffice.location} already exist`,
      );

    const newOffice = await this.officeRepository.save(office);

    const dbOffcie = await this.officeRepository.findOneBy({
      id: newOffice.id,
    });

    return dbOffcie;
  }

  async updateOffice(office: UpdateOfficeDto, id: string) {
    const foundOffice = await this.officeRepository.findOneBy({ id });

    if (!foundOffice)
      return new NotFoundException(`No office was found to update`);

    await this.officeRepository.update(id, office);

    const dbOffice = await this.officeRepository.findOneBy({ id });

    return dbOffice;
  }
}

