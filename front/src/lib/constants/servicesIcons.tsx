import {
  CircleParking,
  WifiIcon,
  CoffeeIcon,
  Dumbbell,
  Armchair,
  Mic2,
  Bus,
} from "lucide-react";

interface IServicesIcon {
  icon: React.ReactNode;
  name: string;
}

export const servicesIcons: Record<string, IServicesIcon> = {
  Internet: { icon: <WifiIcon />, name: "Internet" },
  Estacionamiento: { icon: <CircleParking />, name: "Estacionamiento" },
  Cafe: { icon: <CoffeeIcon />, name: "Cafetería" },
  Gimnasio: { icon: <Dumbbell />, name: "Gimnasio" },
  "Zona de descanso": { icon: <Armchair />, name: "Zona de descanso" },
  "Sala de conferencias": { icon: <Mic2 />, name: "Sala de conferencias" },
  "Acceso al transporte publico": {
    icon: <Bus />,
    name: "Acceso al transporte público",
  },
};
