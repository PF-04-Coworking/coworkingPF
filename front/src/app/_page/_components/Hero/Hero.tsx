import { Heading } from "@/components/common/Heading";
import { Paragraph } from "../../../../components/common/Paragraph";
import officeImage from "@/../public/images/office-1.png";
import "./Hero.css";
import Image from "next/image";
import { Check, Clock, Lock } from "lucide-react";
import { Searchbar } from "../Searchbar/Searchbar";
import { Badge } from "../../../../components/common/Badge";

const features = [
  "+150 lugares",
  "Soporte personal",
  "86% en LATAM",
  "Atención 24 horas",
];

const badges = [
  { text: "Pago seguro", icon: <Lock size={16} /> },
  { text: "Fácil de usar", icon: <Check size={16} /> },
  { text: "Inmediato", icon: <Clock size={16} /> },
];

const Hero = () => {
  return (
    <div className="layout flex items-center pt-32 md:pt-36 pb-12 space-x-10">
      <div className="space-y-6">
        <Heading level="2" className="uppercase">
          Coworking
        </Heading>
        <Heading
          level="1"
          className="uppercase text-gradient w-min font-[Clash] font-bold tracking-[1rem]"
        >
          Relux
        </Heading>
        <Paragraph variant="primary">
          Espacios que inspiran productividad y creatividad
        </Paragraph>
        <Paragraph variant="secondary">
          Explora y reserva oficinas en tu ciudad para juntas y trabajo
          individual. Descubre espacios diseñados para inspirarte y facilitar tu
          productividad.
        </Paragraph>
        <div className="flex gap-x-4">
          {features.map((feature) => (
            <Paragraph
              variant="secondary"
              size="xs"
              key={feature}
              className="flex items-center gap-x-2"
            >
              <Check size={16} className="text-white" />
              {feature}
            </Paragraph>
          ))}
        </div>
        <div className="space-y-2">
          <Searchbar />
        </div>
      </div>
      <div className="shrink-0 relative hidden lg:block">
        <Image
          src={officeImage}
          alt="hero"
          className="size-96 h-auto rounded-tl-3xl rounded-br-3xl"
        />
        <div className="absolute top-4 right-4 flex gap-x-2">
          {badges.map((badge, index) => (
            <Badge key={index} className="shrink-0">
              <span className="text-primary">{badge.icon}</span> {badge.text}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export { Hero };
