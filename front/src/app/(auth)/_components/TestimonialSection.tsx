import { QuoteIcon, Star } from "lucide-react";
import faceImage from "@/../public/images/face-1.png";
import Image from "next/image";
import { Paragraph } from "@/components/common/Paragraph";
import { Heading } from "@/components/common/Heading";
import { TextLogo } from "@/components/common/TextLogo";

const Testimonial = () => {
  return (
    <div className="hidden lg:flex h-screen justify-center items-center">
      <div className="rounded-xl bg-gradient-to-t from-primary  to-primaryDark p-8 text-white space-y-8">
        <TextLogo variant="white" />
        <Heading level="2" className="font-semibold">
          ¡Empieza tu camino con nostros aquí!
        </Heading>
        <QuoteIcon className=" fill-white size-14" />
        <Paragraph variant="primary" className="italic">
          Descubre un mundo de oportunidades a tu alcance. Ingresa a tu cuenta o
          regístrate y comienza tu viaje con nosotros. ¡Estamos emocionados de
          tenerte a bordo y ver todo lo que puedes lograr!
        </Paragraph>

        <div className="bg-white rounded-xl p-8 text-black space-y-4">
          <Heading level="3" className="!text-black font-semibold">
            ¡Opiniones de nuestros clientes!
          </Heading>
          <QuoteIcon
            className="fill-primary size-5 text-primary"
            stroke="currentColor"
          />
          <Paragraph variant="secondary">
            Buscaba un lugar tranquilo para trabajar en mis proyectos y los
            espacios de Relux superaron mis expectativas. La conexión a internet
            es excelente, y el ambiente es motivador.
          </Paragraph>
          <div className="flex items-center gap-x-4">
            <Image
              className="h-10 w-10 rounded-full object-cover"
              src={faceImage}
              alt="Carlos"
            />
            <Paragraph variant="secondary" size="sm" className="!text-black">
              <strong className="font-medium w-40">Carlos Ramírez</strong>
            </Paragraph>
            <div className="flex">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className="fill-yellow-300 text-yellow-300"
                  stroke="currentColor"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Testimonial };
