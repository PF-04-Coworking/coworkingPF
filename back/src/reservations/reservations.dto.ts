import { ApiProperty } from '@nestjs/swagger';

export class AddNewReservationDto {
  @ApiProperty({ description: 'ID of the reservation' })
  id: string;

  @ApiProperty({
    description: 'Date of the reservation',
    example: '2024-07-24',
  })
  date: string;

  @ApiProperty({ description: 'Time of the reservation', example: '14:00' })
  time: string;

  @ApiProperty({
    description: 'Duration of the reservation in hours',
    required: false,
  })
  duration?: number; // Campo opcional

  @ApiProperty({
    description: 'Price per day of the reservation',
    example: 100,
  })
  price_per_day: number;

  @ApiProperty({
    description: 'Number of guests for the reservation',
    example: 4,
  })
  guests: number;

  @ApiProperty({ description: 'ID of the office reserved' })
  office_id: string;

  @ApiProperty({ description: 'ID of the user who made the reservation' })
  user_id: string;
}

export class UpdateReservationDto {
  @ApiProperty({
    description: 'Updated date of the reservation',
    required: false,
    example: '2024-07-25',
  })
  date?: string;

  @ApiProperty({
    description: 'Updated number of guests for the reservation',
    required: false,
    example: 5,
  })
  guests?: number;
}
