import { Card } from "@/components/common/Card";
import { CustomLink } from "@/components/common/CustomLink";
import { Heading } from "@/components/common/Heading";
import { Highlight } from "@/components/common/Highlight";
import { Paragraph } from "@/components/common/Paragraph";
import {
  BriefcaseBusiness,
  Building,
  CircleDollarSign,
  MapPin,
  MoveRight,
  PackagePlus,
  Share,
} from "lucide-react";

const features = [
  {
    icon: <MapPin size={20} />,
    title: "Ubicaciones convenientes",
    description:
      "Ofrecemos espacios de coworking en ubicaciones estratégicas en LATAM, cercanas a centros de negocios, transporte público y áreas comerciales.",
  },
  {
    icon: <Building size={20} />,
    title: "Flexibilidad y variedad",
    description:
      "Disponemos de una amplia variedad de oficinas y salas de reuniones que se adaptan a todas las necesidades, ya sea para reuniones rápidas, jornadas de trabajo individuales o colaboraciones en equipo.",
  },
  {
    icon: <BriefcaseBusiness size={20} />,
    title: "Ambiente profesional",
    description:
      "Nuestros espacios están diseñados para proporcionar un entorno profesional con todas las comodidades necesarias, incluyendo internet de alta velocidad.",
  },
  {
    icon: <PackagePlus size={20} />,
    title: "Oficinas",
    description:
      "Además del espacio de trabajo, ofrecemos servicios adicionales como recepción, soporte técnico, catering para eventos, entre otras.",
  },
  {
    icon: <CircleDollarSign size={20} />,
    title: "Precios competitivos",
    description:
      "Ofrecemos tarifas competitivas con opciones de pago flexibles, sin cargos ocultos. Los clientes pueden elegir planes adaptándose a sus necesidades específicas y presupuesto.",
  },
  {
    icon: <Share size={20} />,
    title: "Comunidad y networking",
    description:
      "Formar parte de nuestros espacios de coworking brinda la oportunidad de conectar con otros profesionales, emprendedores y empresas.",
  },
];

const Features = () => {
  return (
    <div className="layout space-y-12 py-12">
      <div className="space-y-12 text-center">
        <Heading level="2" className="font-medium">
          ¿Por qué escoger <Highlight>Relux</Highlight>?
        </Heading>
        <Paragraph variant="secondary" className="max-w-lg mx-auto">
          Descubre las ventajas únicas que ofrecemos y entiende por qué nuestros
          espacios de coworking son la mejor opción para tu productividad y
          crecimiento profesional.
        </Paragraph>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8">
        {features.map((feature, index) => (
          <Card
            key={index}
            variant={index % 2 === 0 ? "1" : "2"}
            className="space-y- space-y-4"
          >
            <div
              className={`flex items-center gap-x-3 ${
                index % 2 === 0 ? "text-black" : "text-white"
              }`}
            >
              {feature.icon}
              {feature.title}
            </div>
            <Paragraph
              variant="primary"
              size="sm"
              className={index % 2 !== 0 ? "!text-secondary" : ""}
            >
              {feature.description}
            </Paragraph>
            <CustomLink
              href="#"
              className={`flex items-center gap-x-3 ${
                index % 2 !== 0 ? "text-white" : "!text-black"
              }`}
            >
              <Paragraph
                variant="primary"
                className={index % 2 !== 0 ? "text-white" : "!text-black"}
              >
                Descubrir más
              </Paragraph>
              <MoveRight size={20} />
            </CustomLink>
          </Card>
        ))}
      </div>
    </div>
  );
};

export { Features };
