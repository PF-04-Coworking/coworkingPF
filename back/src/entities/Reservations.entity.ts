import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './Users.entity';
import { Office } from './Offices.entity';

@Entity('reservations')
export class Reservation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: Date;

  @Column()
  time: string;

  @Column({ nullable: true })
  duration: number;

  @Column('decimal', { precision: 10, scale: 2 })
  price_per_day: number;

  @Column()
  guests: number;

  @ManyToOne(() => User, (user) => user.reservations)
  user: User;

  @ManyToOne(() => Office, (office) => office.reservations)
  office: Office;
}
