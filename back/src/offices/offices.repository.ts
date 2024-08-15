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
import { ServicesEnum } from 'src/utils/services.enum';
import { LocationEnum } from 'src/utils/location.enum';

@Injectable()
export class OfficeRepository {
  constructor(
    @InjectRepository(Office) private officeRepository: Repository<Office>,
  ) {}

  async getAllOffices(
    page: number = 1,
    limit: number = 10,
    filters: {
      services?: ServicesEnum | ServicesEnum[];
      capacity?: number;
      location?: LocationEnum;
      price?: number;
    } = {},
  ) {
    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 10;
    const skip = (pageNumber - 1) * limitNumber;
    const take = limitNumber;

    if (filters.services && typeof filters.services === 'string') {
      filters.services = [filters.services];
    }

    const queryBuilder = this.officeRepository
      .createQueryBuilder('office')
      .leftJoinAndSelect('office.reservations', 'reservation');

    if (Array.isArray(filters.services) && filters.services.length > 0) {
      filters.services.forEach((service, index) => {
        queryBuilder.andWhere(`office.services LIKE :service${index}`, {
          [`service${index}`]: `%${service}%`,
        });
      });
    }

    if (filters.capacity) {
      queryBuilder.andWhere('office.capacity >= :capacity', {
        capacity: filters.capacity,
      });
    }
    if (filters.location) {
      queryBuilder.andWhere('office.location LIKE :location', {
        location: `%${filters.location}%`,
      });
    }
    if (filters.price) {
      queryBuilder.andWhere('office.price <= :price', { price: filters.price });
    }

    const dbOffices = await queryBuilder.skip(skip).take(take).getMany();

    return dbOffices;
  }

  async addOffices() {
    try {
      for (const element of data) {
        const existingOffice = await this.officeRepository.findOne({
          where: { name: element.name, location: element.location },
        });

        if (!existingOffice) {
          const office = new Office();
          office.name = element.name;
          office.location = element.location;
          office.description = element.description;
          (office.details = element.details),
            (office.capacity = element.capacity);
          office.price = element.price;
          office.imgUrl = element.imgUrl;
          office.services = element.services;

          await this.officeRepository.save(office);
        } else {
          console.log(
            `Office ${element.name} at ${element.location} already exists.`,
          );
        }
      }
      console.log('All offices added successfully');
    } catch (error) {
      console.log('Error adding offices:', error);
    }
  }

  async getOfficeById(id: string): Promise<Office> {
    try {
      const office = await this.officeRepository.findOne({
        where: { id },
        relations: ['reservations'],
      });

      console.log('en office.repository. office:', office);
      if (!office) {
        throw new NotFoundException('Office not found');
      }

      return office;
    } catch (error) {
      console.error('Error fetching office by id:', error);
      throw new Error('Error fetching office');
    }
  }

  async createOffice(office: CreateOfficesDto) {
    const tempOffice = office;

    const foundOffice = await this.officeRepository.findOneBy({
      name: tempOffice.name,
    });

    if (foundOffice)
      return new BadRequestException(
        `Office with name ${foundOffice.name} already exist`,
      );

    const newOffice = await this.officeRepository.save(office);

    return newOffice;
  }

  async updateOffice(office: UpdateOfficeDto, id: string) {
    const foundOffice = await this.officeRepository.findOneBy({ id });

    if (!foundOffice)
      return new NotFoundException(`No office was found to update`);

    delete office['file'];

    await this.officeRepository.update(id, office);

    const dbOffice = await this.officeRepository.findOneBy({ id });

    return dbOffice;
  }

  async deleteOffice(id: string) {
    const foundOffice = await this.officeRepository.findOneBy({ id });

    if (!foundOffice)
      return new NotFoundException(`No office was found to delete`);

    await this.officeRepository.delete(id);

    return 'Office deleted successfully';
  }

  async activateOffice(id: string) {
    const foundOffice = await this.officeRepository.findOneBy({ id });

    if (!foundOffice)
      throw new NotFoundException(`Office with id '${id}' was not found`);

    if (foundOffice.is_active === true) return `Office is already active`;

    await this.officeRepository.update(id, { is_active: true });

    const dbOffice = await this.officeRepository.findOneBy({ id });

    return {
      message: 'Office set active',
      dbOffice,
    };
  }

  async deactivateOffice(id: string) {
    const foundOffice = await this.officeRepository.findOneBy({ id });

    if (!foundOffice)
      throw new NotFoundException(`Office with id '${id}' was not found`);

    if (foundOffice.is_active === false) return `Office is already inactive`;

    await this.officeRepository.update(id, { is_active: false });

    const dbOffice = await this.officeRepository.findOneBy({ id });

    return {
      message: 'Office set inactive',
      dbOffice,
    };
  }
}

