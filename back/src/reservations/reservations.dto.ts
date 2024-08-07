import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class AddNewReservationDto {
  @ApiProperty({
    description: 'Start day of the reservation',
    example: '05/08/2024',
  })
  @IsDate() 
  @IsNotEmpty()
  start_day: string; //cambie el formato de fecha porque  no me dejaba hacer peticiones en thunderClient(renata)

  @ApiProperty({
    description: 'End day of the reservation',
    example: '07/08/2024',
  })
  @IsDate()
  @IsNotEmpty()
  end_day: string;

  @ApiProperty({
    description: 'Amount per day of the reservation',
    example: 100,
  })
  @IsNotEmpty() //añadi esto para que me dejara hacer peticiones a thunder
  amount: number;

  @ApiProperty({
    description: 'Number of guests for the reservation',
    example: 4,
  })
  @IsNumber()
  @IsNotEmpty()
  guests_number: number;

  @ApiProperty({ description: 'Paid amount', nullable: true })
  @IsNumber()
  //@IsEmpty()  comente esto porque me daba error
  paid_amount?: number;

  @ApiProperty({ description: 'ID of the office reserved' })
  @IsUUID('4')
  office_id: string;
}

export class UpdateReservationDto {
  @ApiProperty({
    description: 'Updated start day of the reservation',
    required: false,
    example: '06/08/2024',
  })
  @IsOptional()
  @IsDate()
  @IsNotEmpty()
  start_day: string;

  @ApiProperty({
    description: 'Updated end day of the reservation',
    required: false,
    example: '08/08/2024',
  })
  @IsOptional()
  @IsDate()
  @IsNotEmpty()
  end_day: string;

  @ApiProperty({
    description: 'Updated number of guests for the reservation',
    required: false,
    example: 5,
  })
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  guests_number: number;
}
