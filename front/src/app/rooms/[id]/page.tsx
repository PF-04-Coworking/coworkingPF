"use client";
import { LocateIcon } from "lucide-react";
import { Header } from "@/app/_page/_components/HeaderSection";
import LeafletMapComponent from "./_components/MapsLeaflet";
import { Highlight } from "@/components/common/Highlight";
import ModalCalendar from "./_components/ModalCalendar";
import Image from "next/image";
import { useFetchOfficeById } from "../hooks/useFetchOfficeById";
import { servicesIcons } from "@/lib/constants/servicesIcons";

const OfficeById = ({ params }: { params: { id: string } }) => {
  const { office } = useFetchOfficeById({ params });

  return (
    <>
      <Header />
      {office ? (
        <div className="text-white h-screen pt-[10vh] font-sans">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
            <div className="grid gap-4 md:gap-10 items-start">
              <div>
                <h1 className="font-bold text-3xl text-primary ">
                  {office.name}
                </h1>
                <div className="flex items-center text-sm gap-3">
                  <LocateIcon className="w-4 h-4" />
                  <span className="italic">{office.description}</span>
                </div>
              </div>
              <div className="grid gap-4 text-sm leading-loose">
                <div className="">
                  <h3 className=" text-primary font-semibold text-lg mb-2">
                    Estos son los servicios adicionales que ofrece esta oficina:
                  </h3>
                  {office.services.map((service, index) => (
                    <div key={index} className="flex">
                      <div className="">{servicesIcons[service].icon}</div>
                      <p className="ml-2 italic text-[1rem]">{service}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-4 border border-primary rounded-b-[2rem]">
                  <h2 className="font-bold text-xl mb-2 text-center text-primary">
                    IMPORTANTE{" "}
                  </h2>
                  <p>
                    Al momento de reservar cualquier oficina, tenga en cuenta
                    que solo podrá rentarla por un día entero. No hay sistemas
                    de horarios o medios días, solo días completos. El precio
                    mostrado es por el día entero.
                  </p>
                  <p className="mt-2">
                    Para reservar el día, deberá realizar el pago completo desde
                    nuestra web. Cualquier inconveniente o duda, por favor
                    comuníquese a nuestro correo
                    <Highlight> grupo04henry@gmail.com</Highlight> o llame al
                    número
                    <Highlight> +52 4778810196</Highlight>.
                  </p>
                </div>
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
            <div className="h-full relative">
              <img
                src={office.imgUrl}
                alt="oficina"
                className="object-cover h-full rounded-tr-[5rem] rounded-bl-[5rem]"
              />
              <div className=" border border-primary shadow-md shadow-black rounded-3xl p-4 top-2 left-2 absolute flex justify-center items-center bg-primary">
                <p className="font-bold">USD: ${office.price}</p>
              </div>
            </div>
          </div>

          <div className="w-full flex items-center h-[40%] justify-center px-4">
            <LeafletMapComponent location={office.description} />
          </div>
        </div>
      ) : (
        <div className="text-red-500">No se encontró la oficina</div>
      )}
    </>
  );
};

export default OfficeById;
