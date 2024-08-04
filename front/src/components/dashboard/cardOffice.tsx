import Link from "next/link";
import { Button } from "../common/Button";
import {
  CircleParking,
  UserIcon,
  WifiIcon,
  CoffeeIcon,
  Dumbbell,
  Armchair,
  Mic2,
  Bus,
} from "lucide-react";

type Amenity = Record<string, React.ReactNode>;

export const amenityIcons: Amenity = {
  Internet: <WifiIcon />,
  Estacionamiento: <CircleParking />,
  Cafe: <CoffeeIcon />,
  Gimnasio: <Dumbbell />,
  "Zona de descanso": <Armchair />,
  "Sala de conferencias": <Mic2 />,
  "Acceso a transporte publico": <Bus />,
};

const CardOffice: React.FC<IOffice1> = ({
  imgUrl,
  name,
  description,
  capacity,
  price,
  services,
  location,
  id,
}) => {
  return (
    <>
      <div className=" bg-secondaryDark rounded-md p-4 shadow-md text-white">
        <img
          src={imgUrl}
          alt="Office Image"
          className="object-cover rounded-md w-full  h-auto 2xl:h-[60%]"
        />

        <div className="p-4 space-y-2">
          <div className="flex justify-between">
            <h3 className="text-lg font-medium">{name}</h3>

            <div className="flex items-center space-x-2">
              <p>{capacity}</p>
              <UserIcon className="text-primary" size={20} />
            </div>
          </div>
          <p className="italic">{description}</p>
          <p className="font-semibold">
            Costo por dia: <span className="text-primary">${price}</span>
          </p>
          <div className="flex gap-2">
            {services.map((service, index) => (
              <div key={index} className="flex">
                {amenityIcons[service] || service}
              </div>
            ))}
          </div>
          <Button className="w-full" variant="primary">
            <Link href={`/rooms/${id}`} className="w-full">
              <span className="text-black">Ver Detalles</span>
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default CardOffice;
