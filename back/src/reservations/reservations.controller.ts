import {
  BadRequestException,
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

  //TODO agregar AUTH
  //! con rol de admin
  @Put('/:id')
  @ApiOperation({ summary: 'Update an existing reservation / Admin only' })
  @ApiResponse({
    status: 200,
    description: 'The reservation updated',
    type: [Office],
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
  @ApiResponse({
    status: 200,
    description: 'Succes message ',
    type: Office,
  })
  @ApiBearerAuth()
  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  deleteReservation(@Param('id') id: string) {
    return this.reservationsService.deleteReservation(id);
  }
}

