import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOfficesDto {
  @IsOptional()
  @IsUUID()
  @ApiProperty({ description: 'Office ID', required: false })
  id: string;
 
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  @ApiProperty({ description: 'Office name', minLength: 3, maxLength: 80 })
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(80)
  @ApiProperty({ description: 'Office location', minLength: 3, maxLength: 80 })
  location: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(150)
  @ApiProperty({
    description: 'Office description',
    minLength: 10,
    maxLength: 150,
  })
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'Office capacity' })
  capacity: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'Office stock' })
  stock: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'Office price' })
  price: number;

  @IsOptional()
  @IsUrl()
  @ApiProperty({ description: 'Office image URL' })
  imgUrl: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @ApiProperty({ description: 'List of services', type: [String] })
  services: string[];
}

export class UpdateOfficeDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  @ApiProperty({ description: 'Office name', minLength: 3, maxLength: 80 })
  name: string;

  @IsOptional()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(80)
  @ApiProperty({ description: 'Office location', minLength: 3, maxLength: 80 })
  location: string;

  @IsOptional()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(150)
  @ApiProperty({
    description: 'Office description',
    minLength: 10,
    maxLength: 150,
  })
  description: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ description: 'Office capacity' })
  capacity: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ description: 'Office stock' })
  stock: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ description: 'Office price' })
  price: number;

  @IsOptional()
  @IsUrl()
  @ApiProperty({ description: 'Office image URL', required: false })
  imgUrl: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ApiProperty({ description: 'List of services', type: [String], required: false })
  services: string[];
}
