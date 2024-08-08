import { Injectable } from '@nestjs/common';
import { ReservationsRepository } from './reservations.repository';
import { AddNewReservationDto, UpdateReservationDto } from './reservations.dto';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationsRepository: ReservationsRepository,
  ) {}

  //* Rutas GET

  async getReservations(search?: string) {
    return this.reservationsRepository.getReservations(search);
  }

  async getReservationsByUserId(id: string) {
    return this.reservationsRepository.getReservationsByUserId(id);
  }

  //* Rutas POST

  async addNewReservation(paramId: string, data: AddNewReservationDto) {
    const newReservation = await this.reservationsRepository.addNewReservation(
      paramId,
      data,
    );
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
