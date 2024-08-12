import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Reservation } from './Reservations.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('offices')
export class Office {
  @ApiProperty({ description: 'Office ID' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Office name' })
  @Column()
  name: string;

  @ApiProperty({ description: 'Office location' })
  @Column()
  location: string;

  @ApiProperty({ description: 'Office description' })
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty({ description: 'Office details' })
  @Column({type:'text', nullable: true})
  details: string;

  @ApiProperty({ description: 'Office capacity' })
  @Column()
  capacity: number;

  @ApiProperty({ description: 'Office stock' })
  @Column()
  stock: number;

  @ApiProperty({ description: 'Office price' })
  @Column({ nullable: true })
  price: number;

  @ApiProperty({ description: 'Office image URLs' })
  @Column({ nullable: true })
  imgUrl: string;

  @Column('simple-array', { nullable: true })
  services: string[];

  @ApiProperty({ description: 'Office reservations' })
  @OneToMany(() => Reservation, (reservation) => reservation.office)
  reservations: Reservation[];
}

