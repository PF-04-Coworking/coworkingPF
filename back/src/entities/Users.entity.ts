import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Reservation } from './Reservations.entity';
import { UserRole } from '../user/user-role.enum';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @ApiProperty({ description: 'User ID' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'User name' })
  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @ApiProperty({ description: 'User lastname' })
  @Column({ type: 'varchar', length: 50, nullable: false })
  lastname: string;

  @ApiProperty({ description: 'User email' })
  @Column({ unique: true, nullable: false })
  email: string;

  @ApiProperty({ description: 'User password' })
  @Column({ type: 'varchar', length: 128, nullable: true })
  password: string;

  @ApiProperty({ description: 'User phone' })
  @Column({ type: 'varchar', nullable: true })
  phone: string;

  @ApiProperty({ description: 'User country' })
  @Column({ type: 'varchar', length: 50, nullable: true })
  country: string;

  @ApiProperty({ description: 'User city' })
  @Column({ type: 'varchar', length: 50, nullable: true })
  city: string;

  @ApiProperty({ description: 'User age' })
  @Column({ type: 'int', nullable: true })
  age: number;

  @ApiProperty({ description: 'User role' })
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @ApiProperty({ description: 'User image' })
  @Column({
    type: 'text',
    nullable: true,
    default: 'https://i.postimg.cc/yxJm8gJT/default-User.png',
  })
  imgUrl: string;

  @ApiProperty({ description: 'User reservations' })
  @OneToMany(() => Reservation, (reservation) => reservation.user)
  reservations: Reservation[];
}
