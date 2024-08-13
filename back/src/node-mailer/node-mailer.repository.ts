import { BadRequestException, Injectable } from '@nestjs/common';
import { transporter } from 'src/Config/mailer';
import { Office } from 'src/entities/Offices.entity';
import { Reservation } from 'src/entities/Reservations.entity';
import { User } from 'src/entities/Users.entity';
import { contactInfoDto } from 'src/user/user.dto';
import { reservationEmail } from './templates/reserva';
import { contactEmail } from './templates/contactEmail';
import { registerEmail } from './templates/registerEmail';
import { notificationEmail } from './templates/notificationEmail';

@Injectable()
export class NodeMailerRepository {
  async contactEmail(contactInfo: contactInfoDto) {
    try {
      const contentEmail = contactEmail.replace('{{NAME}}', contactInfo.name);

      await transporter.sendMail({
        from: '"Relux team"', // sender address
        to: contactInfo.email, // list of receivers
        subject: 'Contacto Relux', // Subject line
        html: contentEmail, // html body
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
      function formatDate(date: Date): string {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Los meses en JavaScript son de 0 a 11
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      }

      const contentEmail = reservationEmail
        .replace('{{OFFICE}}', foundOffice.name)
        .replace('{{STARTDATE}}', formatDate(data.start_day))
        .replace('{{ENDDATE}}', formatDate(data.end_day))
        .replace('{{OFFICEDESCRIPTION}}', foundOffice.description)
        .replace('{{GUESTS}}', data.guests_number)
        .replace('{{TOTALAMOUNT}}', (data.amount / 100).toFixed(2))
        .replace('{{USEREMAIL}}', foundUser.email)
        .replace('{{DATE}}', formatDate(new Date()));

      await transporter.sendMail({
        from: '"Relux team"', // sender address
        to: foundUser.email, // list of receivers
        subject: 'Confirmación de Reserva - Relux', // Subject line
        html: contentEmail, // html body
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
    function formatDate(date: Date): string {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Los meses en JavaScript son de 0 a 11
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }

    const contentEmail = notificationEmail
      .replace('{{NAME}}', reservation.user.name)
      .replace('{{OFFICE}}', reservation.office.name)
      .replace('{{STARTDATE}}', formatDate(startDate))
      .replace('{{ENDDATE}}', formatDate(endDate));

    try {
      await transporter.sendMail({
        from: '"Relux team"', // sender address
        to: reservation.user.email, // list of receivers
        subject: '¡Tienes una reserva próxima!', // Subject line
        html: contentEmail, // html body
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
        from: '"Relux team"', // sender address
        to: userNoPassword.email, // list of receivers
        subject: 'Confirmacion de cuenta', // Subject line
        html: registerEmail, // html body
      });
    } catch (error) {
      throw new BadRequestException(
        'Something went wrong. No emails were sent ',
      );
    }
  }
}
