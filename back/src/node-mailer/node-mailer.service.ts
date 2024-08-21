import { Injectable } from '@nestjs/common';
import { NodeMailerRepository } from './node-mailer.repository';
import { User } from 'src/entities/Users.entity';
import { Office } from 'src/entities/Offices.entity';
import { Reservation } from 'src/entities/Reservations.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import { contactInfoDto } from 'src/user/user.dto';

@Injectable()
export class NodeMailerService {
    constructor(private readonly nodeMailerRepository: NodeMailerRepository,
        @InjectRepository(Reservation) 
        private readonly reservationRepository: Repository<Reservation>,
    ){}

    registerEmail(userNoPassword: Partial<User>) {
        return this.nodeMailerRepository.registerEmail(userNoPassword);
    }

    successEmail(foundOffice: Office, foundUser: User, data: any) {
        return this.nodeMailerRepository.successEmail(foundOffice, foundUser, data);
    }

    contactEmail(contactInfo: contactInfoDto) {
        return this.nodeMailerRepository.contactEmail(contactInfo);
    }

    @Cron('* 13 * * *') 
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
