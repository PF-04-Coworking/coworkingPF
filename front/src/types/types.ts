interface IProps {
    name: string;
    direccion: string;
  }

  interface IOffice1 {
    imgUrl: string;
    name: string;
    description: string;
    capacity: number;
    price: number;
    services: string[];
    location: string;
    id: number;
  }
  

  interface ILocation {
    lat: number;
    lng: number;
  }
  
  interface LeafletMapComponentProps {
    location: string;
  }