import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/Users.entity';
import { Office } from './entities/Offices.entity';
import { Reservation } from './entities/Reservations.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { typeOrmConfig } from './Config/typeorm';
import { OfficeModule } from './offices/offices.module';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ReservationsModule } from './reservations/reservations.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { StripeModule } from './stripe/stripe.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig],
      envFilePath: '.development.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return configService.get('typeorm');
      },
    }),
    TypeOrmModule.forFeature([User, Office, Reservation]),
    OfficeModule,
    FileUploadModule,
    ReservationsModule,
    UserModule,
    ReservationsModule,
    FileUploadModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60m' },
    }),
    FileUploadModule,
    StripeModule, //!Pendiente aquí
    StripeModule.forRootAsync(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
