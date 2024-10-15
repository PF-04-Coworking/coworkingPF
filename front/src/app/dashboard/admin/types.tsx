export interface IOffice {
  id: string;
  name: string;
  location: string;
  description: string;
  details: string;
  capacity: string;
  price: string;
  imgUrl: string;
  services: string[];
  is_active: boolean;
}

export interface IEditOfficeData {
  name: string;
  location: string;
  description: string;
  details: string;
  capacity: string;
  price: string;
  services: string[];
  file: File | undefined;
}
