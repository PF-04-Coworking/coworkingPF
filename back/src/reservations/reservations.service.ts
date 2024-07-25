import { Injectable } from '@nestjs/common';
import { ReservationsRepository } from './reservations.repository';
import { AddNewReservationDto, UpdateReservationDto } from './reservations.dto';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationsRepository: ReservationsRepository,
  ) {}

  //* Rutas GET

  async getReservations() {
    return this.reservationsRepository.getReservations();
  }

  async getOfficeById(id: string) {
    return this.reservationsRepository.getOfficeById(id);
  }

  //* Rutas POST

  async addNewReservation(data: AddNewReservationDto) {
    const newReservation = this.reservationsRepository.addNewReservation(data);

    return newReservation;
  }

  //* Rutas PUT

  updateReservation(id: string, updateReservationDto: UpdateReservationDto) {
    return this.reservationsRepository.updateReservation(
      id,
      updateReservationDto,
    );
  }

  //* Rutas DELETE

  deleteReservation(id: string) {
    return this.reservationsRepository.deleteReservation(id);
  }
}
