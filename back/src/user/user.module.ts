import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/Users.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { ConfigModule} from '@nestjs/config';
import { ReservationsService } from 'src/reservations/reservations.service';
import { ReservationsRepository } from 'src/reservations/reservations.repository';
import { Reservation } from 'src/entities/Reservations.entity';
import { Office } from 'src/entities/Offices.entity';
import { PaymentsService } from 'src/payments/payments.service';
import { AuthService } from 'src/auth/auth.service';
import { NodeMailerRepository } from 'src/node-mailer/node-mailer.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Reservation, Office]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    ReservationsService,
    ReservationsRepository,
    PaymentsService, 
    AuthService,
    NodeMailerRepository
  ],
})
export class UserModule {}