export interface IOffice {
  id: string;
  name: string;
  location: string;
  description: string;
  capacity: string;
  price: string;
  imgUrl: string;
  services: string[];
}

export interface IEditOfficeData {
  name: string;
  location: string;
  description: string;
  capacity: string;
  price: string;
  services: string[];
  file: File | undefined;
}
