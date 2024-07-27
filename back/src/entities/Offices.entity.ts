import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Reservation } from './Reservations.entity';

@Entity('offices')
export class Office {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column()
  capacity: number;

  @Column()
  stock: number;

  @Column({nullable:true})
  imgUrl: string;

  @OneToMany(() => Reservation, (reservation) => reservation.office)
  reservations: Reservation[];
}
