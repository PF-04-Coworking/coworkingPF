import { Button } from "@/components/common/Button";
import { Paragraph } from "@/components/common/Paragraph";
import { Tooltip } from "@/components/common/Tooltip";
import { servicesIcons } from "@/lib/constants/servicesIcons";
import { IFullReservation } from "@/types/types";
import { DollarSignIcon, MapPinIcon, UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CardReservation = ({
  reservation,
}: {
  reservation: IFullReservation;
}) => {
  return (
    <div className="bg-secondaryDark/35 hover:bg-secondaryDark/70 backdrop-blur-lg transition-colors shadow-md text-white flex flex-col lg:flex-row rounded-tl-3xl rounded-br-3xl lg:h-96">
      <Image
        src={
          reservation.office.imgUrl
            ? reservation.office.imgUrl
            : "https://res.cloudinary.com/danpp1ys8/image/upload/v1722819564/arcbukd8qxep3aqfni71.webp"
        }
        alt="Office Image"
        className="rounded-tl-3xl w-full lg:w-1/2 object-cover"
        width={0}
        height={0}
        sizes="100vw"
      />
      <div className="p-6 lg:p-8 flex flex-col gap-6 justify-between w-full lg:w-1/2 h-full min-h-80 lg:min-h-full">
        <Paragraph variant="primary" className="font-medium">
          {reservation.office.name}
        </Paragraph>
        <div className="space-y-2">
          <Paragraph variant="primary" className="font-medium">
            <span className="text-secondary">Fecha de inicio: </span>
            {new Date(reservation.start_day).toLocaleDateString()}
          </Paragraph>
          <Paragraph variant="primary" className="font-medium">
            <span className="text-secondary">Fecha de finalización: </span>
            {new Date(reservation.start_day).toLocaleDateString()}
          </Paragraph>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <UserIcon className="text-primary flex-shrink-0" size={20} />
            <Paragraph variant="secondary">
              {reservation.guests_number} invitado
              {reservation.guests_number > 1 ? "s" : ""}
            </Paragraph>
          </div>
          <div className="flex items-center gap-4">
            <MapPinIcon className="text-primary flex-shrink-0" size={20} />
            <Paragraph variant="secondary">
              {reservation.office.description}
            </Paragraph>
          </div>
        </div>
        <div className="flex gap-4">
          {reservation.office.services.map((service, index) => (
            <div key={index} className="flex">
              <Tooltip text={servicesIcons[service].name}>
                {servicesIcons[service].icon}
              </Tooltip>
            </div>
          ))}
        </div>
        <Link href={`/rooms/${reservation.office.id}`} className="w-full">
          <Button className="w-full" variant="primary">
            Ver detalles de la oficina
          </Button>
        </Link>
      </div>
    </div>
  );
};

export { CardReservation };
