import { Injectable } from '@nestjs/common';
import { ReservationsRepository } from './reservations.repository';
import { AddNewReservationDto } from './reservations.dto';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly ReservationsRepository: ReservationsRepository,
  ) {}

  //* Rutas GET

  async getReservations() {
    return this.ReservationsRepository.getReservations();
  }

  async getOfficeById(id: string) {
    return this.ReservationsRepository.getOfficeById(id);
  }

  //* Rutas POST

  async addNewReservation(data: AddNewReservationDto) {
    const newReservation = this.ReservationsRepository.addNewReservation(data);

    return newReservation;
  }
}
