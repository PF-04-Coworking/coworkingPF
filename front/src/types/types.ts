export interface IPaginationObject {
  page: number;
  limit: number;
}

export interface ILocation {
  lat: number;
  lng: number;
}

export interface ILeafletMapComponentProps {
  location: string;
}

export interface IOffice {
  id: string;
  imgUrl: string;
  name: string;
  description: string;
  capacity: number;
  price: number;
  services: string[];
  location: string;
  reservations: IReservation[];
}


interface IReservation {
  id: string;
  start_day: string;
  end_day: string;
  guests_number: number;
  paid_amount: number;
}
export interface IOfficeStripe {
    id: string;
    imgUrl: string;
    price: number;
    reservations: IReservation[];
    capacity: number;
}


export interface FormValues {
  guests: number;
}
