import { IUserData } from "@/app/dashboard/types";

export interface IPaginationObject {
  page: number;
  limit: number;
}

export interface ILocation {
  lat: number;
  lng: number;
}

export interface IFullReservation {
  id: string;
  guests_number: number;
  start_day: Date;
  end_day: Date;
  paid_amount: number;
  office: IOffice;
  user: IUserData;
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

export interface IReservation {
  id: string;
  guests_number: number;
  start_day: string;
  end_day: string;
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
