import { Module } from '@nestjs/common';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import { ReservationsRepository } from './reservations.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from 'src/entities/Reservations.entity';
import { ConfigModule } from '@nestjs/config';
import { UserRepository } from 'src/user/user.repository';
import { UserService } from 'src/user/user.service';
import { User } from 'src/entities/Users.entity';
import { Office } from 'src/entities/Offices.entity';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reservation, User, Office]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [ReservationsController],
  providers: [
    ReservationsService,
    ReservationsRepository,
    UserRepository,
    AuthService,
  ],
})
export class ReservationsModule {}

