import { BadRequestException, Injectable } from '@nestjs/common';
import { transporter } from 'src/Config/mailer';
import { Office } from 'src/entities/Offices.entity';
import { Reservation } from 'src/entities/Reservations.entity';
import { User } from 'src/entities/Users.entity';
import { contactInfoDto } from 'src/user/user.dto';

@Injectable()
export class NodeMailerRepository {
  async contactEmail(contactInfo: contactInfoDto) {
    try {
      await transporter.sendMail({
        from: '"Redux team"', // sender address
        to: contactInfo.email, // list of receivers
        subject: 'Contacto Relux', // Subject line
        html: `<b>Hola, bienvenid@ ${contactInfo.name} a Relux!</b>
        <p> Pronto un miembro de nuestro equipo se pondrá en contacto con usted. </p>
        <p> ¡Muchas Gracias por elegir Relux! </p> `, // html body
      });

      await transporter.sendMail({
        from: '"Contact Form"', // sender address
        to: process.env.NODEMAILER_EMAIL, // list of receivers
        subject: `Formulario de Contacto - ${contactInfo.name} ${contactInfo.lastname}`, // Subject line
        html: `<b>El usuario ${contactInfo.name} ${contactInfo.lastname} ha solicitado ponerse en contacto./b>
        <p> Motivo: ${contactInfo.description} </p>
        <p> Correo de contacto: ${contactInfo.email} </p>
        <p> Teléfono de contacto: ${contactInfo.phone} </p>`, // html body
      });
    } catch (error) {
      throw new BadRequestException(
        'Something went wrong. No emails were sent ',
      );
    }
  }
  async successEmail(foundOffice: Office, foundUser: User, data: any) {
    try {
      await transporter.sendMail({
        from: '"Redux team"', // sender address
        to: foundUser.email, // list of receivers
        subject: 'Reserva Exitosa', // Subject line
        html: `<b>Reserva exitosa! Gracias por elegir Redux</b>
          <p>Ubiación de su oficina: ${foundOffice.location}, ${foundOffice.description}</p>
          <p>Capacidad máxima: ${foundOffice.capacity}</p>
          <p>Fechas de reserva: desde ${data.start_day} hasta ${data.end_day} inclusive</p>
          <p>Monto total de la reserva: ${data.amount}</p>
          <p>En caso de tener dudas sobre alguna reserva, no dude en ponerse en contacto a través de nuestra página de contacto.</p>`, // html body
      });
    } catch (error) {
      throw new BadRequestException(
        'Something went wrong. No emails were sent ',
      );
    }
  }
  async reservationEmail(
    startDate: Date,
    endDate: Date,
    reservation: Partial<Reservation>,
  ) {
    try {
      await transporter.sendMail({
        from: '"Redux team"', // sender address
        to: reservation.user.email, // list of receivers
        subject: '¡Tienes una reserva próxima!', // Subject line
        html: `<b>Hola ${reservation.user.name}, queremos recordarte tu reserva próxima en las oficinas de Relux</b>
          <p>Ubiación de su oficina: ${reservation.office.location}, ${reservation.office.description}</p>
          <p>Capacidad máxima: ${reservation.office.capacity}</p>
          <p>Fechas de reserva: desde ${startDate} hasta ${endDate} inclusive</p>
          <p>¡Esperamos contar contigo!</p>`, // html body
      });
    } catch (error) {
      throw new BadRequestException(
        'Something went wrong. No emails were sent ',
      );
    }
  }
  async registerEmail(userNoPassword: Partial<User>) {
    try {
      await transporter.sendMail({
        from: '"Redux team"', // sender address
        to: userNoPassword.email, // list of receivers
        subject: 'Confirmacion de cuenta', // Subject line
        html: `<b>Hola, bienvenid@ ${userNoPassword.name} a Relux!</b>`, // html body
      });
    } catch (error) {
      throw new BadRequestException(
        'Something went wrong. No emails were sent ',
      );
    }
  }
}

