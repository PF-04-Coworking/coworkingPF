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
      location?: string;
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

    const dbOffices = await queryBuilder.getMany();

    const mapServiceToEnum = (service: string): ServicesEnum | null => {
      const formattedService = service.toUpperCase().replace(/ /g, '_');
      return (
        ServicesEnum[formattedService as keyof typeof ServicesEnum] || null
      );
    };

    const mockOffices = data.map((office) => {
      return {
        ...office,
        services: office.services.map((service) => mapServiceToEnum(service)),
      };
    });

    const filteredMockOffices = mockOffices.filter((office) => {
      const servicesMatch =
        !filters.services ||
        (Array.isArray(office.services) &&
          (filters.services as ServicesEnum[]).every((service) =>
            office.services.includes(service),
          ));
      const capacityMatch =
        !filters.capacity || office.capacity >= filters.capacity;
      const locationMatch =
        !filters.location || office.location.includes(filters.location);
      const priceMatch = !filters.price || office.price <= filters.price;
      return servicesMatch && capacityMatch && locationMatch && priceMatch;
    });

    const allOffices = [...filteredMockOffices, ...dbOffices];
    const paginatedOffices = allOffices.slice(skip, skip + take);

    return paginatedOffices;
  }

  async addOffices() {
    try {
      console.log('Starting seeding...');
      for (const element of data) {
        const existingOffice = await this.officeRepository.findOne({
          where: { name: element.name, location: element.location },
        });
  
        if (!existingOffice) {
          const office = new Office();
          office.name = element.name;
          office.location = element.location;
          office.description = element.description;
          office.capacity = element.capacity;
          office.stock = element.stock;
          office.price = element.price;
          office.imgUrl = element.imgUrl;
          office.services = element.services;
  
          await this.officeRepository.save(office);
          console.log('Office added successfully');
        } else {
          console.log(`Office ${element.name} at ${element.location} already exists.`);
        }
      }
      console.log('All offices added successfully');
    } catch (error) {
      console.log('Error adding offices:', error);
    }
  }
  

  async getOfficeById(id: string) {
    const office = await this.officeRepository.findOneBy({ id });
    if (!office) throw new Error('Office not found');
    return office;
  }

  async createOffice(office: CreateOfficesDto) {
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

  async deleteOffice(id: string) {
    const foundOffice = await this.officeRepository.findOneBy({ id });

    if (!foundOffice)
      return new NotFoundException(`No office was found to delete`);

    await this.officeRepository.delete(id);

    return 'Office deleted successfully';
  }
}
