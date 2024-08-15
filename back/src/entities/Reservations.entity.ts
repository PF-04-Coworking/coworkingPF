import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './Users.entity';
import { Office } from './Offices.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('reservations')
export class Reservation {
  @ApiProperty({ description: 'Reservation ID' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Reservation start date' })
  @Column()
  start_day: Date;

  @ApiProperty({ description: 'Reservation end date' })
  @Column()
  end_day: Date;

  @ApiProperty({ description: 'Number of guests for the reservation' })
  @Column()
  guests_number: number;

  @ApiProperty({ description: 'Paid amount' })
  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  paid_amount: number;

  @ApiProperty({ description: 'Reservation status' })
  @Column({default: true})
  is_active: boolean;

  @ApiProperty({ description: 'ID of the reserved office' })
  @ManyToOne(() => Office, (office) => office.reservations)
  office: Office;

  @ApiProperty({ description: 'ID of the user who made the reservation' })
  @ManyToOne(() => User, (user) => user.reservations)
  user: User;
}