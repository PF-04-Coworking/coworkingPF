import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/Users.entity';
import { Office } from './entities/Offices.entity';
import { Reservation } from './entities/Reservations.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { typeOrmConfig } from './Config/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (ConfigService: ConfigService) =>
        ConfigService.get('typeorm'),
    }),
    TypeOrmModule.forFeature([User, Office, Reservation]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
