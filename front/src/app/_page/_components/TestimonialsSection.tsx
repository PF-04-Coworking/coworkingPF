import { Card } from "@/components/common/Card";
import { Heading } from "@/components/common/Heading";
import { Highlight } from "@/components/common/Highlight";
import { Paragraph } from "@/components/common/Paragraph";
import { Quote, QuoteIcon, Star, StarIcon } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "Carlos Ramírez",
    image: "/face-1.png",
    position: "Desarrollador de software",
    description:
      "Buscaba un lugar tranquilo para trabajar en mis proyectos y los espacios de Relux superaron mis expectativas. La conexión a internet es excelente, y el ambiente es motivador.",
  },
  {
    name: "María Gómez",
    image: "/face-2.png",
    position: "CEO de Tech Innovators",
    description:
      "Como líder de una startup, necesitaba un espacio flexible que se adaptara a las necesidades cambiantes de mi equipo. Los lugares de Relux fueron perfectos para abarcar mis requerimientos.",
  },
  {
    name: "Juan Pérez",
    image: "/face-3.png",
    position: "Freelancer de marketing digital",
    description:
      "Los espacios de coworking han revolucionado mi forma de trabajar. Encontré un ambiente profesional y lleno de recursos que me ayudaron a ser más productivo y a conectar con otros profesionales.",
  },
];

const Testimonials = () => {
  return (
    <div className="layout space-y-12 py-12">
      <div className="space-y-12 text-center">
        <Heading level="2" className="font-medium">
          No confíes en nosotros, <Highlight>confía en su voz</Highlight>
        </Heading>
        <Paragraph variant="secondary" className="max-w-xl mx-auto">
          Escucha a nuestros clientes satisfechos y descubre cómo nuestros
          coworking mejoran su forma de trabajar. Sus testimonios demuestran
          nuestra calidad. ¡Inspírate!
        </Paragraph>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-32 pt-24">
        {testimonials.map((testimonial, testimonialIndex) => (
          <Card
            key={testimonialIndex}
            variant={testimonialIndex % 2 === 0 ? "2" : "1"}
            className="space-y-4 relative pt-20"
          >
            <Image
              src={testimonial.image}
              width={144}
              height={144}
              alt="testimonial"
              className={`rounded-full absolute -top-20 left-1/2 -translate-x-1/2 border-2 p-4 ${
                testimonialIndex % 2 === 0 ? "border-primary" : "border-white"
              }`}
            />
            <div
              className={`space-y-4 text-center ${
                testimonialIndex % 2 === 0 ? "text-white" : "text-black"
              }`}
            >
              <div className="flex justify-center">
                {Array.from({ length: 5 }, (_, index) => (
                  <StarIcon key={index} size={24} fill="currentColor" />
                ))}
              </div>
              <Heading
                level="3"
                className={testimonialIndex % 2 === 0 ? "" : "!text-black"}
              >
                {testimonial.name}
              </Heading>
              <Paragraph
                variant="secondary"
                size="sm"
                className={testimonialIndex % 2 === 0 ? "" : "!text-white"}
              >
                {testimonial.position}
              </Paragraph>
              <QuoteIcon size={32} fill="currentColor" className="mx-auto" />
              <Paragraph
                variant="secondary"
                size="sm"
                className={`italic ${
                  testimonialIndex % 2 === 0 ? "" : "text-white"
                }`}
              >
                {testimonial.description}
              </Paragraph>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export { Testimonials };
