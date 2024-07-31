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
import { mockServices } from 'src/utils/services.mock';

@Injectable()
export class OfficeRepository {
  constructor(
    @InjectRepository(Office) private officeRepository: Repository<Office>,
  ) {}

  async getAllOffices(
    page: number = 1,
    limit: number = 10,
    filters: {
      services?: string | string[];
      capacity?: number;
      location?: string;
      price?: number;
    } = {}
  ) {
    // Asegurarse de que `page` y `limit` sean números válidos
    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 10;
  
    // Definir los valores de `skip` y `take` para la paginación
    const skip = (pageNumber - 1) * limitNumber;
    const take = limitNumber;
  
    // Si `filters.services` es una cadena, convertirla en un array
    if (filters.services && typeof filters.services === 'string') {
      filters.services = [filters.services];
    }
  
    // Consultar oficinas desde la base de datos
    const queryBuilder = this.officeRepository.createQueryBuilder('office')
      .leftJoinAndSelect('office.reservations', 'reservation');
  
    // Aplicar filtros
    if (Array.isArray(filters.services) && filters.services.length > 0) {
      filters.services.forEach((service, index) => {
        queryBuilder.andWhere(`office.services LIKE :service${index}`, { [`service${index}`]: `%${service}%` });
      });
    }
  
    if (filters.capacity) {
      queryBuilder.andWhere('office.capacity >= :capacity', { capacity: filters.capacity });
    }
    if (filters.location) {
      queryBuilder.andWhere('office.location LIKE :location', { location: `%${filters.location}%` });
    }
    if (filters.price) {
      queryBuilder.andWhere('office.price <= :price', { price: filters.price });
    }
  
    const dbOffices = await queryBuilder.getMany();
  
    // Cargar datos mock
    const mockOffices = data; // Asumiendo que `data` es el array de oficinas mock
  
    // Aplicar filtros manualmente sobre las oficinas mockeadas
    const filteredMockOffices = mockOffices.filter(office => {
      const servicesMatch = !filters.services || (Array.isArray(office.services) && (filters.services as string[]).every(service => office.services.includes(service)));
      const capacityMatch = !filters.capacity || office.capacity >= filters.capacity;
      const locationMatch = !filters.location || office.location.includes(filters.location);
      const priceMatch = !filters.price || office.price <= filters.price;
      return servicesMatch && capacityMatch && locationMatch && priceMatch;
    });
  
    // Combinar datos mock y datos de la base de datos
    const allOffices = [...filteredMockOffices, ...dbOffices];
  
    // Aplicar paginación sobre el conjunto combinado
    const paginatedOffices = allOffices.slice(skip, skip + take);
  
    return paginatedOffices;
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
      office.imgUrl = element.imgUrl;
      office.services = element.services;

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

