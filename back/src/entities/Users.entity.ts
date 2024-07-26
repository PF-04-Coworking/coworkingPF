import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm'
import { Reservation } from './Reservations.entity';
import { UserRole } from './user-role.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
  
  @Column()
  lastname: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  phone: number;

  @Column()
  country: string;

  @Column()
  city: string;

  @Column()
  age: number;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @OneToMany(() => Reservation, reservation => reservation.user)
  reservations: Reservation[];
}


