import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/Users.entity';
import { Office } from './entities/Offices.entity';
import { Reservation } from './entities/Reservations.entity';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { UserRepository } from './user/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User, Office, Reservation]), UserModule],
  controllers: [AppController, UserController],
  providers: [AppService, UserService, UserRepository],
})
export class AppModule {}
