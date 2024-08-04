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

  async getReservationsByUserId(id: string) {
    return this.reservationsRepository.getReservationsByUserId(id);
  }

  //* Rutas POST

  async addNewReservation(paramId: string, data: AddNewReservationDto) {
    const { start_day, end_day, guests, office_id } = data;

    // El método del repositorio espera un objeto con estos campos
    const newReservation = await this.reservationsRepository.addNewReservation(
      paramId,
      {
        start_day,
        end_day,
        guests,
        office_id,
        user_id: paramId, // Usamos paramId como user_id ya que el controlador valida que sean iguales
      },
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
