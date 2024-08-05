import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddNewReservationDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Reservation description' })
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'Amount to be charged' })
  amount: number;

  // Otros campos necesarios para la reserva
}
