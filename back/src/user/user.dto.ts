import { PickType } from '@nestjs/swagger';
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
  id: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(80)
  lastname: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  email: string;

  @IsStrongPassword()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(15)
  password: string;

  @IsNotEmpty()
  @IsNumber()
  phone: number;

  @IsOptional()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  country: string;

  @IsOptional()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  city: string;

  @IsOptional()
  @IsNumber()
  age: number;

  @IsOptional()
  role: UserRole;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  name: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  lastname: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(15)
  @IsStrongPassword()
  // @ApiProperty({
  //   description:
  //     'Updated user password. Must be at least 8 characters long and 15 max. Must have 1 uppercase letter, one number and one special character (?!@#$)',
  //   example: 'NewPass2!',
  // })
  password: string;

  @IsOptional()
  @IsNumber()
  phone: number;

  @IsOptional()
  @MinLength(4)
  @MaxLength(20)
  country: string;

  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  city: string;

  @IsOptional()
  @IsNumber()
  age: number;
}

export class LoginUserDto extends PickType(CreateUserDto, [
  'email',
  'password',
]) {}
