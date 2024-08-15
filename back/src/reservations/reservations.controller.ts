import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ReservationsService } from './reservations.service';
import { UpdateReservationDto } from './reservations.dto';
import { Roles } from 'src/auth/guards/roles.decorator';
import { UserRole } from 'src/user/user-role.enum';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Office } from 'src/entities/Offices.entity';

@ApiTags('reservations')
@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  //* Rutas GET
  //solo admin

  @Get()
  @ApiOperation({ summary: 'Get all reservations / Admin only' })
  @ApiResponse({
    status: 200,
    description: 'List of reservations',
    type: [Office],
  })
  @ApiBearerAuth()
  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  getReservations(@Query('search') search?: string) {
    return this.reservationsService.getReservations(search);
  }

  //* Rutas PUT

  @Put('/:id')
  @ApiOperation({ summary: 'Update an existing reservation / Admin only' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID of the reservation to update',
  })
  @ApiResponse({
    status: 200,
    description: 'The updated reservation',
  })
  @ApiBearerAuth()
  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  updateReservation(
    @Body() updateReservationDto: UpdateReservationDto,
    @Param('id') id: string,
  ) {
    const updateReservation = this.reservationsService.updateReservation(
      id,
      updateReservationDto,
    );

    return updateReservation;
  }

  //* Rutas DELETE
  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a reservation by ID / Admin only' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID of the reservation to delete',
  })
  @ApiResponse({
    status: 200,
    description: 'Success message',
    type: Office,
  })
  @ApiBearerAuth()
  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  deleteReservation(@Param('id') id: string) {
    return this.reservationsService.deleteReservation(id);
  }

  // Actualiza estado 'is_active' a false y la reserva queda cancelada

  @Put('cancel/:id')
  @ApiOperation({
    summary: 'Cancel a reservation with reservation id /Admin only',
  })
  @ApiResponse({
    status: 200,
    description: 'Success message and reservation data with cancelled status',
  })
  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  cancelReservation(@Param('id') id: string) {
    return this.reservationsService.cancelReservation(id);
  }
}
