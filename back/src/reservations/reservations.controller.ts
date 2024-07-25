import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { AddNewReservationDto } from './reservations.dto';

@Controller('Reservations')
export class ReservationsController {
  constructor(private readonly ReservationsService: ReservationsService) {}

  @Get()
  getReservations() {
    return this.ReservationsService.getReservations();
  }

  @Get('/:id')
  getOfficeById(@Param('id') id: string) {
    return this.ReservationsService.getOfficeById(id);
  }

  //TODO getOfficeByLocation

  //TODO agregar AUTH
  //! Solo con rol de Admin
  @Post()
  addNewReservation(@Body() data: AddNewReservationDto) {
    const newReservation = this.ReservationsService.addNewReservation(data);

    return newReservation;
  }
}
