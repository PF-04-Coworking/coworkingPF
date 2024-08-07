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
import { transporter } from 'src/Config/mailer';

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
      start_day: new Date(data.start_day),
      end_day: new Date(data.end_day),
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

    try {
      await transporter.sendMail({
        from: '"Redux team"', // sender address
        to: foundUser.email, // list of receivers
        subject: 'Reserva Exitosa', // Subject line
        html: `<b>Reserva exitosa! Gracias por elegir Redux</b>
        <p>Ubiación de su oficina: ${foundOffice.location}, ${foundOffice.description}</p>
        <p>Capacidad máxima: ${foundOffice.capacity}</p>
        <p>Fechas de reserva: desde ${data.start_day} hasta ${data.end_day} inclusive</p>
        <p>Monto total de la reserva: ${foundOffice.price}</p>
        <p>En caso de tener dudas sobre alguna reserva, no dude en ponerse en contacto a través de nuestra página de contacto.</p>`, // html body
      });
    } catch (error) {
      throw new BadRequestException(
        'Something went wrong. No emails were sent ',
      );
    }

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
