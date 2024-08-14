import { IUserData } from "@/app/dashboard/types";

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
  details: string;
  reservations: IReservation[];
}

export interface IReservation {
  id: string;
  guests_number: number;
  start_day: string;
  end_day: string;
  paid_amount: number;
}

export interface IFullReservation {
  id: string;
  guests_number: number;
  start_day: string | Date;
  end_day: string | Date;
  paid_amount: number;
  office: IOffice;
  user: IUserData;
  is_active: boolean;
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

export interface IContactData {
  name: string;
  lastname: string;
  email: string;
  phone: string;
  description: string;
}
