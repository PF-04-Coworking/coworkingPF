export interface IFilters {
  services: string[];
  location: string[];
}

export interface ILocation {
  lat: number;
  lng: number;
}

export interface LeafletMapComponentProps {
  location: string;
}
