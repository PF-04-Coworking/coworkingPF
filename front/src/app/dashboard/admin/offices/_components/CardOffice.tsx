"use client";

import { useState } from "react";
import { Button } from "@/components/common/Button";
import { Paragraph } from "@/components/common/Paragraph";
import "react-toastify/dist/ReactToastify.css";
import { IOffice } from "../../types";
import Image from "next/image";
import { EditOfficeModal } from "./modals/EditOfficeModal";
import { DollarSignIcon, MapPinIcon, UserIcon } from "lucide-react";
import { Tooltip } from "@/components/common/Tooltip";
import { servicesIcons } from "@/lib/constants/servicesIcons";

const CardOffice = ({
  id,
  name,
  location,
  description,
  capacity,
  price,
  imgUrl,
  services,
}: IOffice) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOffice, setSelectedOffice] = useState<IOffice>({
    id,
    name,
    location,
    description,
    capacity,
    price,
    imgUrl,
    services,
  });

  const handleAddInfo = ({
    id,
    name,
    location,
    description,
    capacity,
    price,
    services,
  }: IOffice) => {
    setSelectedOffice({
      id,
      name,
      location,
      description,
      capacity,
      price,
      imgUrl,
      services,
    });
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="backdrop-blur-lg bg-secondaryDark/30 hover:bg-secondaryDark/60 transition-colors rounded-t-md shadow-md text-white h-[50rem]">
        <Image
          src={
            imgUrl
              ? imgUrl
              : "https://res.cloudinary.com/danpp1ys8/image/upload/v1722819564/arcbukd8qxep3aqfni71.webp"
          }
          alt="Office Image"
          className="rounded-t-md object-cover w-full h-1/2"
          width={0}
          height={0}
          sizes="100vw"
        />
        <div className="p-6 lg:p-8 flex flex-col gap-6 justify-between w-full h-1/2">
          <Paragraph variant="primary" className="font-medium">
            {name}
          </Paragraph>
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <UserIcon className="text-primary flex-shrink-0" size={20} />
              <Paragraph variant="secondary">
                {capacity} personas máx.
              </Paragraph>
            </div>
            <div className="flex items-center gap-4">
              <MapPinIcon className="text-primary flex-shrink-0" size={20} />
              <Paragraph variant="secondary">{description}</Paragraph>
            </div>
            <div className="flex items-center gap-4">
              <DollarSignIcon
                className="text-primary flex-shrink-0"
                size={20}
              />
              <Paragraph variant="secondary">{price} / día</Paragraph>
            </div>
          </div>
          <div className="flex gap-4">
            {services.map((service, index) => (
              <div key={index} className="flex">
                <Tooltip text={servicesIcons[service].name}>
                  {servicesIcons[service].icon}
                </Tooltip>
              </div>
            ))}
          </div>
          <Button
            className="w-full !mt-4"
            variant="primary"
            onClick={() =>
              handleAddInfo({
                id,
                name,
                location,
                description,
                capacity,
                price,
                imgUrl,
                services,
              })
            }
          >
            Editar
          </Button>
        </div>
      </div>
      <EditOfficeModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        selectedOffice={selectedOffice}
      />
    </>
  );
};

export { CardOffice };
