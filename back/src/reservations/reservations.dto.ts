import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class AddNewReservationDto {
  @ApiProperty({
    description: 'Start day of the reservation',
    example: '05/08/2024',
  })
  @IsNotEmpty()
  @Type(() => Date)
  start_day: Date;

  @ApiProperty({
    description: 'End day of the reservation',
    example: '07/08/2024',
  })
  @IsNotEmpty()
  @Type(() => Date)
  end_day: Date;

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

  @ApiProperty({ description: 'Paid amount' })
  @IsNumber()
  @IsOptional()
  paid_amount?: number;

  @ApiProperty({ description: 'ID of the office reserved' })
  @IsString()
  office_id: string;
}

export class UpdateReservationDto {
  @ApiProperty({
    description: 'Updated start day of the reservation',
    required: false,
    example: '06/08/2024',
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  start_day: string;

  @ApiProperty({
    description: 'Updated end day of the reservation',
    required: false,
    example: '08/08/2024',
  })
  @IsOptional()
  @Type(() => Date)
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

