import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/Users.entity';
import { Office } from './entities/Offices.entity';
import { Reservation } from './entities/Reservations.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Office, Reservation])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
