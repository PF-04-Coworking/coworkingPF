import { Controller } from '@nestjs/common';
import { NodeMailerService } from './node-mailer.service';
import { User } from 'src/entities/Users.entity';
import { Office } from 'src/entities/Offices.entity';
import { Reservation } from 'src/entities/Reservations.entity';
import { contactInfoDto } from 'src/user/user.dto';

@Controller('node-mailer')
export class NodeMailerController {
  constructor(private readonly nodeMailerService: NodeMailerService) {}

  registerEmail(userNoPassword: Partial<User>) {
    return this.nodeMailerService.registerEmail(userNoPassword);
  }

  contactEmail(contactInfo: contactInfoDto) {
    return this.nodeMailerService.contactEmail(contactInfo);
  }

  successEmail(foundOffice: Office, foundUser: User, data: any) {
    return this.nodeMailerService.successEmail(foundOffice, foundUser, data);
  }

  reservationEmail(
    startDate: Date,
    endDate: Date,
    reservation: Partial<Reservation>,
  ) {
    return this.nodeMailerService.reservationEmail(
      startDate,
      endDate,
      reservation,
    );
  }
}
