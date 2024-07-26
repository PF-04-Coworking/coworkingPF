import { ApiProperty } from "@nestjs/swagger";

export class AddNewReservationDto {

  @ApiProperty({ description: 'Id de la reservacion' })
  id: string;

  @ApiProperty({ description: 'Fecha de la reservacion' })
  date: string;

  @ApiProperty({ description: 'Hora de la reservacion' })
  time: string;

  @ApiProperty({ description: 'Precio por dia de la reservacion' })
  priceDay: number;

  @ApiProperty({ description: 'Numero de invitados de la reservacion' })
  guests: number;

  office_id: string;

  user_id: string;
}

export class UpdateReservationDto {

  @ApiProperty({ description: 'Fecha de la reservacion' })
  date?: string;

  @ApiProperty({ description: 'numero de invitados de la reservacion' })
  guests?: number;
}
