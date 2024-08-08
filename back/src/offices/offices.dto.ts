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
  IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ServicesEnum } from 'src/utils/services.enum';
import { Type } from 'class-transformer';

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
  @Type(() => Number)
  @IsNumber()
  @ApiProperty({ description: 'Office capacity' })
  capacity: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @ApiProperty({ description: 'Office price' })
  price: number;

  @IsOptional()
  @IsUrl()
  @ApiProperty({ description: 'Office image URL', required: false })
  imgUrl: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(ServicesEnum, { each: true })
  @ApiProperty({
    description: 'List of services',
    enum: ServicesEnum,
    isArray: true,
  })
  services: ServicesEnum[];
}

export class UpdateOfficeDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  @ApiProperty({ description: 'Office name', minLength: 3, maxLength: 80 })
  name: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  @ApiProperty({ description: 'Office location', minLength: 3, maxLength: 80 })
  location: string;

  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(150)
  @ApiProperty({
    description: 'Office description',
    minLength: 10,
    maxLength: 150,
  })
  description: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @ApiProperty({ description: 'Office capacity' })
  capacity: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @ApiProperty({ description: 'Office stock' })
  stock: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @ApiProperty({ description: 'Office price' })
  price: number;

  @IsOptional()
  @IsArray()
  @IsEnum(ServicesEnum, { each: true })
  @ApiProperty({
    description: 'List of services',
    enum: ServicesEnum,
    isArray: true,
    required: false,
  })
  services: ServicesEnum[];
}

