import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { AddNewReservationDto, UpdateReservationDto } from './reservations.dto';
import { UserRepository } from 'src/user/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from 'src/entities/Reservations.entity';
import { Repository } from 'typeorm';
import { User } from 'src/entities/Users.entity';
import { Office } from 'src/entities/Offices.entity'; // Importar la entidad Office

const mockReservations = [
  // Mock data aquí
];

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
    const reservationsByUserId = mockReservations.filter(
      (reservation) => reservation.user_id === id,
    );
    if (!reservationsByUserId)
      throw new BadRequestException('Usuario no tiene reservaciones');

    return reservationsByUserId;
  }

  // Rutas POST
  async addNewReservation(data: AddNewReservationDto) {
    const foundUser = await this.userRepository.findOne({
      where: { id: data.user_id },
    });

    if (!foundUser) {
      throw new NotFoundException(
        `Usuario con id ${data.user_id} no fue encontrado`,
      );
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
      date: new Date(data.date), // Asegúrate de convertir a Date si es necesario
      time: data.time,
      duration: data.duration,
      price_per_day: data.price_per_day,
      guests: data.guests,
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
  updateReservation(id: string, updateReservationDto: UpdateReservationDto) {
    const updateReservation = mockReservations.find(
      (reservation) => reservation.id === id,
    );

    if (!updateReservation)
      throw new BadRequestException('Reservación no encontrada');

    // TODO: Actualizar reservation

    return updateReservation;
  }

  // Rutas DELETE
  deleteReservation(id) {
    const deleteReservation = mockReservations.find(
      (reservation) => reservation.id === id,
    );
    if (!deleteReservation)
      throw new BadRequestException('Reservación no encontrada');

    // TODO: Actualizar reservation

    return deleteReservation;
  }
}
