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
  capacity: string;
  price: number;
  services: string[];
  location: string;
}

export interface IOfficeStripe {
  
    id: string;
    imgUrl: string;
    price: number;

}