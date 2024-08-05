import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { AddNewReservationDto, UpdateReservationDto } from './reservations.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from 'src/entities/Reservations.entity';
import { Repository } from 'typeorm';
import { User } from 'src/entities/Users.entity';
import { Office } from 'src/entities/Offices.entity';

@Injectable()
export class ReservationsRepository {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Office) // Inyectar el repositorio de Office
    private readonly officeRepository: Repository<Office>,
  ) {}

  // Rutas GET
  async getReservations() {
    return this.reservationRepository.find();
  }

  async getReservationsByUserId(id: string) {
    const reservationsByUserId = await this.reservationRepository.find({
      where: { user: { id } },
      relations: ['user', 'office'], // Incluye relaciones si es necesario
    });

    if (!reservationsByUserId.length) {
      throw new BadRequestException('Usuario no tiene reservaciones');
    }

    return reservationsByUserId;
  }

  // Rutas POST

  async addNewReservation(id: string, data: AddNewReservationDto) {
    const foundUser = await this.userRepository.findOne({
      where: { id: id },
    });

    if (!foundUser) {
      throw new NotFoundException(`Usuario con id ${id} no fue encontrado`);
    }

    const foundOffice = await this.officeRepository.findOne({
      where: { id: data.office_id },
    });

    if (!foundOffice) {
      throw new NotFoundException(
        `Oficina con id ${data.office_id} no fue encontrada`,
      );
    }

    const newReservation = this.reservationRepository.create({
      start_day: data.start_day,
      end_day: data.end_day,
      guests_number: data.guests_number,
      paid_amount: data.paid_amount,
      user: foundUser,
      office: foundOffice,
    });

    await this.reservationRepository.save(newReservation);

    const response = {
      message: 'Reserva realizada con éxito',
      info: {
        usuario: `${foundUser.name} ${foundUser.lastname}`,
        role: foundUser.role,
        office: foundOffice.name,
        location: foundOffice.location,
        description: foundOffice.description,
        capacity: foundOffice.capacity,
      },
    };

    return response;
  }

  // Rutas PUT
  async updateReservation(
    id: string,
    updateReservationDto: UpdateReservationDto,
  ) {
    const updateReservation = await this.reservationRepository.findOne({
      where: { id },
    });

    if (!updateReservation) {
      throw new BadRequestException('Reservación no encontrada');
    }

    // Actualizar los campos de la reserva con los datos de updateReservationDto
    Object.assign(updateReservation, updateReservationDto);

    // Guardar la reserva actualizada
    await this.reservationRepository.save(updateReservation);

    return updateReservation;
  }

  // Rutas DELETE
  async deleteReservation(id: string) {
    if (!id) {
      throw new BadRequestException('ID de reservación es requerido');
    }

    let deleteReservation: Reservation;
    try {
      deleteReservation = await this.reservationRepository.findOne({
        where: { id },
      });

      if (!deleteReservation) {
        throw new BadRequestException('Reservación no encontrada');
      }

      // Eliminar la reserva
      await this.reservationRepository.remove(deleteReservation);
    } catch (error) {
      throw new BadRequestException(
        `Error al eliminar la reservación: ${error.message}`,
      );
    }

    return {
      message: 'Reservación eliminada con éxito',
      deletedReservation: deleteReservation,
    };
  }
}

