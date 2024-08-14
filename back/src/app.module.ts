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
import { PaymentsModule } from './payments/payments.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NodeMailerModule } from './node-mailer/node-mailer.module';
import { NodeMailerController } from './node-mailer/node-mailer.controller';
import { NodeMailerService } from './node-mailer/node-mailer.service';
import { NodeMailerRepository } from './node-mailer/node-mailer.repository';
import { ScheduleModule } from '@nestjs/schedule';

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
    ScheduleModule.forRoot(),
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
    // StripeModule, //!Pendiente aquí
    PaymentsModule,
    NodeMailerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly appService: AppService) {}

  configureSwagger(app) {
    const config = new DocumentBuilder()
      .setTitle('API')
      .setDescription('API description')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }
}
