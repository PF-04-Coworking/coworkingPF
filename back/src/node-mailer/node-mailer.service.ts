import { Injectable } from '@nestjs/common';
import { NodeMailerRepository } from './node-mailer.repository';
import { User } from 'src/entities/Users.entity';
import { Office } from 'src/entities/Offices.entity';
import { Reservation } from 'src/entities/Reservations.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class NodeMailerService {
    constructor(private readonly nodeMailerRepository: NodeMailerRepository,
        @InjectRepository(Reservation) 
        private readonly reservationRepository: Repository<Reservation>,
    ){}

    registerEmail(contactInfo: any) {
        return this.nodeMailerRepository.registerEmail(contactInfo);
    }

    successEmail(foundOffice: Office, foundUser: User, data: any) {
        return this.nodeMailerRepository.successEmail(foundOffice, foundUser, data);
    }

    contactEmail(userNoPassword: Partial<User>) {
        return this.nodeMailerRepository.contactEmail(userNoPassword);
    }

    @Cron('0 8 * * *') // expresión manual ('0 8 * * *'), o para dos minutos para poder testear: ('*/2 * * * *')
    async sendReservationReminders() {
      console.log('Cron job ejecutado: ', new Date().toISOString());
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const startOfDay = new Date(tomorrow.setHours(0, 0, 0, 0));
      const endOfDay = new Date(tomorrow.setHours(23, 59, 59, 999));
  
      const reservations = await this.reservationRepository.find({
        where: {
          start_day: Between(startOfDay, endOfDay),
        },
        relations: ['user', 'office'],
      });
  
      for (const reservation of reservations) {
        const { user, office } = reservation;
        const startDate = reservation.start_day;
        const endDate =  reservation.end_day;
        console.log(`Enviando recordatorio a ${user.email} para la reserva en ${office.name}`);
        await this.reservationEmail(startDate , endDate, reservation);
      }
    }
  
  
      async reservationEmail(startDate: Date, endDate: Date, reservation: Partial<Reservation>) {
        return this.nodeMailerRepository.reservationEmail(startDate , endDate, reservation)
      }

}
