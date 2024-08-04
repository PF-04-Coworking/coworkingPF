import { ApiProperty } from '@nestjs/swagger';

export class AddNewReservationDto {
  @ApiProperty({
    description: 'Start day of the reservation',
    example: '05/08/2024',
  })
  start_day: string;

  @ApiProperty({
    description: 'End day of the reservation',
    example: '07/08/2024',
  })
  end_day: string;

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
    description: 'Updated start day of the reservation',
    required: false,
    example: '06/08/2024',
  })
  start_day?: string;

  @ApiProperty({
    description: 'Updated end day of the reservation',
    required: false,
    example: '08/08/2024',
  })
  end_day?: string;

  @ApiProperty({
    description: 'Updated number of guests for the reservation',
    required: false,
    example: 5,
  })
  guests?: number;
}
