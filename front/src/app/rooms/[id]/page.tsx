"use client";

import { Header } from "@/app/_page/_components/HeaderSection";
import LeafletMapComponent from "./_components/MapsLeaflet";
import { Highlight } from "@/components/common/Highlight";
import ModalCalendar from "./_components/ModalCalendar";
import Image from "next/image";
import { useFetchOfficeById } from "../hooks/useFetchOfficeById";
import { servicesIcons } from "@/lib/constants/servicesIcons";
import { Heading } from "@/components/common/Heading";
import { Paragraph } from "@/components/common/Paragraph";
import { FooterSection } from "@/components/FooterSection";

const OfficeById = ({ params }: { params: { id: string } }) => {
  const { office } = useFetchOfficeById({ params });

  return (
    <div
      className="h-full min-h-screen bg-no-repeat bg-top bg-cover bg-fixed"
      style={{ backgroundImage: "url(/images/fondo-1.png)" }}
    >
      <Header />
      {office ? (
        <div className="layout text-white h-screen pt-32 pb-8">
          <div className="flex flex-col gap-12">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
              <div className="space-y-2">
                <Heading level="2" className="text-primary">
                  {office.name}
                </Heading>
                <Paragraph variant="secondary" size="sm">
                  {office.description}
                </Paragraph>
              </div>
              <ModalCalendar
                officeParams={{
                  id: office.id,
                  price: office.price,
                  imgUrl: office.imgUrl,
                  reservations: office.reservations,
                  capacity: office.capacity,
                }}
              />
            </div>
            <div className="h-[40rem]">
              <Image
                src={office.imgUrl}
                alt="oficina"
                width={0}
                height={0}
                sizes="100vw"
                className="h-full w-full rounded-tl-3xl rounded-br-3xl object-cover"
              />
            </div>
            <div className="border-2 border-primary rounded-md p-4 space-y-4">
              <Paragraph variant="primary">Nota</Paragraph>
              <Paragraph variant="secondary">
                Las recepción de los clientes en las oficinas será a partir de
                las <span className="text-white">09:00 a.m.</span> Por favor,
                asistir a partir de esa hora para la entrega de la oficina.
              </Paragraph>
            </div>
            <div className="flex flex-col lg:flex-row gap-12 justify-between">
              <div className="space-y-4">
                <Paragraph variant="primary">Acerca de la oficina</Paragraph>
                <Paragraph variant="secondary">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Repudiandae asperiores mollitia at ut laborum eius adipisci,
                  voluptatem, ducimus pariatur saepe officia eum! Inventore
                  natus minus accusantium. Rerum a vel aliquam.
                </Paragraph>
                <div className="!mt-6">
                  <ModalCalendar
                    officeParams={{
                      id: office.id,
                      price: office.price,
                      imgUrl: office.imgUrl,
                      reservations: office.reservations,
                      capacity: office.capacity,
                    }}
                  />
                </div>
              </div>
              <div className="space-y-4 min-w-52">
                <Paragraph variant="primary">Servicios / comodidades</Paragraph>
                <div className="space-y-4">
                  {office.services.map((service, index) => (
                    <div key={index} className="flex">
                      {servicesIcons[service]?.icon}
                      <Paragraph variant="primary" className="ml-2">
                        {service}
                      </Paragraph>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-full h-[40rem] block">
              <LeafletMapComponent location={office.description} />
            </div>
          </div>
          <FooterSection />
        </div>
      ) : (
        <div className="text-red-500">No se encontró la oficina</div>
      )}
    </div>
  );
};

export default OfficeById;
