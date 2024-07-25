import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/Users.entity';
import { Office } from './entities/Offices.entity';
import { Reservation } from './entities/Reservations.entity';
import { ReservationsModule } from './reservations/reservations.module';

@Module({
  // imports: [TypeOrmModule.forFeature([User, Office, Reservation])],
  imports: [ReservationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
