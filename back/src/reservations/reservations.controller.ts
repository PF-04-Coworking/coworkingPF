import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { AddNewReservationDto, UpdateReservationDto } from './reservations.dto';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  //* Rutas GET
  //solo admin

  @Get()
  // @Roles(Role.Admin)
  // @UseGuards(AuthGuard, RolesGuard)
  getReservations() {
    return this.reservationsService.getReservations();
  }

  //* ruta para que un user loggeado vea sus reservaciones
  // @Roles(Role.User)
  // @UseGuards(AuthGuard, RolesGuard)
  @Get('/user/:id/reservations')
  getReservationsByUserId(@Param('id') id: string) {
    return this.reservationsService.getReservationsByUserId(id);
  }

  //TODO getOfficeByLocation

  //* Rutas POST

  //TODO agregar AUTH
  //! Solo con rol de Admin
  @Post()
  addNewReservation(@Body() data: AddNewReservationDto) {
    const newReservation = this.reservationsService.addNewReservation(data);

    return newReservation;
  }

  //* Rutas PUT

  //TODO agregar AUTH
  //! con rol de usuario
  @Put('/:id')
  updateReservation(
    @Body() updateReservationDto: UpdateReservationDto,
    @Param('id') id: string,
  ) {
    if (
      !updateReservationDto ||
      Object.keys(updateReservationDto).length === 0
    ) {
      throw new BadRequestException('Datos de actualización incompletos');
    }
    const updateReservation = this.reservationsService.updateReservation(
      id,
      updateReservationDto,
    );

    return updateReservation;
  }

  //* Rutas DELETE
  @Delete('/:id')
  deleteReservation(@Param('id') id: string) {
    return this.reservationsService.deleteReservation(id);
  }
}
