export interface IPaginationObject {
  page: number;
  limit: number;
}
interface ILocation {
  lat: number;
  lng: number;
}

interface LeafletMapComponentProps {
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
