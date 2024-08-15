import Link from "next/link";
import { Button } from "../common/Button";
import { UserIcon, MapPinIcon, DollarSignIcon } from "lucide-react";
import { IOffice } from "@/app/dashboard/admin/types";
import Image from "next/image";
import { Paragraph } from "../common/Paragraph";
import { servicesIcons } from "@/lib/constants/servicesIcons";
import { Tooltip } from "../common/Tooltip";

const CardOffice = ({
  id,
  imgUrl,
  name,
  description,
  capacity,
  price,
  services,
  location,
}: IOffice) => {
  return (
    <div className="bg-secondaryDark/35 hover:bg-secondaryDark/70 backdrop-blur-lg transition-colors shadow-md text-white flex flex-col lg:flex-row rounded-tl-3xl rounded-br-3xl lg:h-96">
      <Image
        src={
          imgUrl
            ? imgUrl
            : "https://res.cloudinary.com/danpp1ys8/image/upload/v1722819564/arcbukd8qxep3aqfni71.webp"
        }
        alt="Office Image"
        className="rounded-tl-3xl w-full lg:w-7/12 object-cover"
        width={0}
        height={0}
        sizes="100vw"
      />
      <div className="p-6 lg:p-8 flex flex-col gap-6 justify-between w-full lg:w-5/12 h-full min-h-80 lg:min-h-full">
        <Paragraph variant="primary" className="font-medium">
          {name}
        </Paragraph>
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <UserIcon className="text-primary flex-shrink-0" size={20} />
            <Paragraph variant="secondary">{capacity} personas máx.</Paragraph>
          </div>
          <div className="flex items-center gap-4">
            <MapPinIcon className="text-primary flex-shrink-0" size={20} />
            <Paragraph
              variant="secondary"
              className={`${description.length > 100 ? "truncate" : ""}`}
            >
              {description}
            </Paragraph>
          </div>
          <div className="flex items-center gap-4">
            <DollarSignIcon className="text-primary flex-shrink-0" size={20} />
            <Paragraph variant="secondary">{price} / día</Paragraph>
          </div>
        </div>
        <div className="flex gap-4">
          {services.map((service, index) => (
            <div key={index} className="flex">
              <Tooltip text={servicesIcons[service]?.name}>
                {servicesIcons[service]?.icon}
              </Tooltip>
            </div>
          ))}
        </div>
        <Link href={`/rooms/${id}`} className="w-full">
          <Button className="w-full" variant="primary">
            Ver Detalles
          </Button>
        </Link>
      </div>
    </div>
  );
};

export { CardOffice };
