export class AddNewReservationDto {
  id: string;

  date: string;

  time: string;

  duration?: number; // Campo opcional

  price_per_day: number;

  guests: number;

  office_id: string;

  user_id: string;
}

export class UpdateReservationDto {
  date?: string;

  guests?: number;
}
