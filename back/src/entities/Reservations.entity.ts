import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './Users.entity';
import { Office } from './Offices.entity';
import { ApiProperty, ApiResponse } from '@nestjs/swagger';

@Entity('reservations')
export class Reservation {
  @ApiProperty({ description: 'Reservation ID' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Reservation date' })
  @Column()
  date: Date;

  @ApiProperty({ description: 'Reservation time' })
  @Column()
  time: string;

  @ApiProperty({ description: 'Reservation duration' })
  @Column({ nullable: true })
  duration: number;

  @ApiProperty({ description: 'Reservation price' })
  @Column('decimal', { precision: 10, scale: 2 })
  price_per_day: number;

  @ApiProperty({ description: 'Reservation guests' })
  @Column()
  guests: number;

  @ApiProperty({ description: 'Reservation user' })
  @ManyToOne(() => User, (user) => user.reservations)
  user: User;

  @ApiProperty({ description: 'Reservation office' })
  @ManyToOne(() => Office, (office) => office.reservations)
  office: Office;
}
