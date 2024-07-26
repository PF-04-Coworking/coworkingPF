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
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { ReservationsService } from './reservations.service';
import { AddNewReservationDto, UpdateReservationDto } from './reservations.dto';
import { Reservation } from 'src/entities/Reservations.entity';

@ApiTags('Reservations')
@Controller('Reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  //* Rutas GET

  @Get()
  @ApiOperation({ summary: 'Get all reservations' })
  @ApiResponse({ status: 200, description: 'Return all reservations.', type: [Reservation] })
  getReservations() {
    return this.reservationsService.getReservations();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get reservation by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Reservation ID' })
  @ApiResponse({ status: 200, description: 'Return reservation by ID.', type: Reservation })
  getOfficeById(@Param('id') id: string) {
    return this.reservationsService.getOfficeById(id);
  }

  //* Rutas POST

  //TODO agregar AUTH
  //! Solo con rol de Admin
  @Post()
  @ApiOperation({ summary: 'Add a new reservation' })
  @ApiBody({ type: AddNewReservationDto })
  @ApiResponse({ status: 201, description: 'The reservation has been successfully created.', type: Reservation })
  addNewReservation(@Body() data: AddNewReservationDto) {
    const newReservation = this.reservationsService.addNewReservation(data);

    return newReservation;
  }

  //* Rutas PUT

  //TODO agregar AUTH
  //! con rol de usuario
  @Put('/:id')
  @ApiOperation({ summary: 'Update an existing reservation' })
  @ApiParam({ name: 'id', type: String, description: 'Reservation ID' })
  @ApiBody({ type: UpdateReservationDto })
  @ApiResponse({ status: 200, description: 'The reservation has been successfully updated.', type: Reservation })
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
  @ApiOperation({ summary: 'Delete a reservation' })
  @ApiParam({ name: 'id', type: String, description: 'Reservation ID' })
  @ApiResponse({ status: 200, description: 'The reservation has been successfully deleted.' })
  deleteReservation(@Param('id') id: string) {
    return this.reservationsService.deleteReservation(id);
  }
}

