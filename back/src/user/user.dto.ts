import { PickType, ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserRole } from './user-role.enum';

export class CreateUserDto {
  @IsOptional()
  @IsUUID()
  @ApiProperty({ description: 'User ID', required: false })
  id: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  @ApiProperty({ description: 'User name', minLength: 3, maxLength: 80 })
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(80)
  @ApiProperty({ description: 'User lastname', minLength: 3, maxLength: 80 })
  lastname: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  @ApiProperty({ description: 'User email', minLength: 3, maxLength: 50 })
  email: string;

  @IsStrongPassword()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(15)
  @ApiProperty({
    description: 'User password',
    minLength: 8,
    maxLength: 15,
    example: 'NewPass2!',
  })
  password: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'User phone number' })
  phone: number;

  @IsOptional()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @ApiProperty({
    description: 'User country',
    minLength: 4,
    maxLength: 20,
    required: false,
  })
  country: string;

  @IsOptional()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @ApiProperty({
    description: 'User city',
    minLength: 4,
    maxLength: 20,
    required: false,
  })
  city: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ description: 'User age', required: false })
  age: number;

  @IsOptional()
  @ApiProperty({ description: 'User role', enum: UserRole, required: false })
  role: UserRole;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  @ApiProperty({
    description: 'User name',
    minLength: 3,
    maxLength: 80,
    required: false,
  })
  name: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  @ApiProperty({
    description: 'User lastname',
    minLength: 3,
    maxLength: 80,
    required: false,
  })
  lastname: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(15)
  @IsStrongPassword()
  @ApiProperty({
    description:
      'Updated user password. Must be at least 8 characters long and 15 max. Must have 1 uppercase letter, one number and one special character (?!@#$)',
    example: 'NewPass2!',
    required: false,
  })
  password: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ description: 'User phone number', required: false })
  phone: number;

  @IsOptional()
  @MinLength(4)
  @MaxLength(20)
  @ApiProperty({
    description: 'User country',
    minLength: 4,
    maxLength: 20,
    required: false,
  })
  country: string;

  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  @ApiProperty({
    description: 'User city',
    minLength: 5,
    maxLength: 20,
    required: false,
  })
  city: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ description: 'User age', required: false })
  age: number;
}

export class LoginUserDto extends PickType(CreateUserDto, [
  'email',
  'password',
]) {
  @ApiProperty({ description: 'User email', minLength: 3, maxLength: 50 })
  email: string;

  @ApiProperty({
    description: 'User password',
    minLength: 8,
    maxLength: 15,
    example: 'NewPass2!',
  })
  password: string;
}
