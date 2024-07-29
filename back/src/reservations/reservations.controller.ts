import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReservationsService } from './reservations.service';
import { AddNewReservationDto, UpdateReservationDto } from './reservations.dto';
import { Roles } from 'src/auth/guards/roles.decorator';
import { UserRole } from 'src/user/user-role.enum';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@ApiTags('reservations')
@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  //* Rutas GET
  //solo admin

  @Get()
  @ApiOperation({ summary: 'Get all reservations' })
  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  getReservations() {
    return this.reservationsService.getReservations();
  }

  //* Rutas PUT

  //TODO agregar AUTH
  //! con rol de usuario
  @Put('/:id')
  @ApiOperation({ summary: 'Update an existing reservation' })
  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
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
  @ApiOperation({ summary: 'Delete a reservation by ID' })
  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  deleteReservation(@Param('id') id: string) {
    return this.reservationsService.deleteReservation(id);
  }
}
