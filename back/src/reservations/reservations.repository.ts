import { BadRequestException, Injectable } from '@nestjs/common';
import { AddNewReservationDto } from './reservations.dto';

const mockReservations = [
  {
    id: '1',
    date: '2024-08-01',
    time: '09:00',
    priceDay: 100,
    guests: 3,
    office_id: '1',
    user_id: '101',
  },
  {
    id: '2',
    date: '2024-08-02',
    time: '10:00',
    priceDay: 150,
    guests: 5,
    office_id: '2',
    user_id: '102',
  },
  {
    id: '3',
    date: '2024-08-03',
    time: '11:00',
    priceDay: 80,
    guests: 2,
    office_id: '3',
    user_id: '103',
  },
  {
    id: '4',
    date: '2024-08-04',
    time: '12:00',
    priceDay: 200,
    guests: 10,
    office_id: '4',
    user_id: '104',
  },
  {
    id: '5',
    date: '2024-08-05',
    time: '13:00',
    priceDay: 120,
    guests: 4,
    office_id: '5',
    user_id: '105',
  },
];

@Injectable()
export class ReservationsRepository {
  //* Rutas GET

  async getReservations() {
    return mockReservations;
  }

  async getOfficeById(id: string) {
    // Usa el método find para buscar la oficina por id
    const office = mockReservations.find((office) => office.id === id);
    if (!office) throw new BadRequestException('Oficina no existe');

    return office;
  }

  //* Rutas POST

  async addNewReservation(data: AddNewReservationDto) {
    const newReservation = mockReservations.push(data);

    return mockReservations;
  }
}
