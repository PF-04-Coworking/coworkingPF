import { ApiProperty, PickType } from '@nestjs/swagger';
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
import { UserRole } from 'src/entities/user-role.enum';

export class CreateUserDto {
  @IsOptional()
  @IsUUID()
  @ApiProperty({ description: 'User ID', example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  @ApiProperty({ description: 'User first name', example: 'John', minLength: 3, maxLength: 80 })
  name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(80)
  @ApiProperty({ description: 'User last name', example: 'Doe', minLength: 3, maxLength: 80 })
  lastname: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  @ApiProperty({ description: 'User email', example: 'john.doe@example.com', minLength: 3, maxLength: 50 })
  email: string;

  @IsStrongPassword()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(15)
  @ApiProperty({
    description: 'User password. Must be at least 8 characters long and 15 max. Must have 1 uppercase letter, one number and one special character (?!@#$)',
    example: 'Password1!',
    minLength: 8,
    maxLength: 15
  })
  password: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'User phone number', example: 1234567890 })
  phone: number;

  @IsOptional()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @ApiProperty({ description: 'User country', example: 'USA', minLength: 4, maxLength: 20 })
  country: string;

  @IsOptional()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @ApiProperty({ description: 'User city', example: 'New York', minLength: 4, maxLength: 20 })
  city: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ description: 'User age', example: 30 })
  age: number;

  @IsOptional()
  //@ApiProperty({ description: 'User role', enum: UserRole, example: UserRole.ADMIN })
  role: UserRole;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  @ApiProperty({ description: 'Updated user first name', example: 'John', minLength: 3, maxLength: 80 })
  name: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  @ApiProperty({ description: 'Updated user last name', example: 'Doe', minLength: 3, maxLength: 80 })
  lastname: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(15)
  @IsStrongPassword()
  @ApiProperty({
    description: 'Updated user password. Must be at least 8 characters long and 15 max. Must have 1 uppercase letter, one number and one special character (?!@#$)',
    example: 'NewPass2!',
    minLength: 8,
    maxLength: 15
  })
  password: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ description: 'Updated user phone number', example: 1234567890 })
  phone: number;

  @IsOptional()
  @MinLength(4)
  @MaxLength(20)
  @ApiProperty({ description: 'Updated user country', example: 'USA', minLength: 4, maxLength: 20 })
  country: string;

  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  @ApiProperty({ description: 'Updated user city', example: 'New York', minLength: 5, maxLength: 20 })
  city: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ description: 'Updated user age', example: 30 })
  age: number;
}

export class LoginUserDto extends PickType(CreateUserDto, [
  'email',
  'password',
]) {}
