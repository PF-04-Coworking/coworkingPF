import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/Users.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ReservationsService } from 'src/reservations/reservations.service';
import { ReservationsRepository } from 'src/reservations/reservations.repository';
import { Reservation } from 'src/entities/Reservations.entity';
import { OfficeRepository } from 'src/offices/offices.repository';
import { Office } from 'src/entities/Offices.entity';
import { AuthService } from 'src/auth/auth.service';

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
    AuthService,
  ],
})
export class UserModule {}

