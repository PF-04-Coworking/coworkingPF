import { Heading } from "@/components/ui/heading";
import { Highlight } from "../../../components/ui/highlight";
import { Logo } from "../../../components/ui/logo";
import { Paragraph } from "../../../components/ui/paragraph";
import Image from "next/image";
import officeImage from "@/../public/images/office-2.png";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { UsersRound } from "lucide-react";

const badges = [
  {
    description: "Para equipos pequeños",
    capacity: "2-8 personas",
  },
  {
    description: "Para equipos medianos",
    capacity: "20-80 personas",
  },
  {
    description: "Para equipos grandes",
    capacity: "100-200 personas",
  },
];

const Description = () => {
  return (
    <div className="layout py-12">
      <div className="bg-white rounded-3xl p-12">
        <div className="flex items-center gap-x-4">
          <Logo />
          <Paragraph variant="secondary">
            Cualquier tamaño, <Highlight>en cualquier lugar.</Highlight>
          </Paragraph>
        </div>
        <div className="flex items-center flex-col lg:flex-row gap-x-36 gap-y-36 mt-12">
          <div className="space-y-8">
            <Heading level="2" className="font-medium !text-black">
              Tenemos oficinas para <Highlight>cualquier tamaño</Highlight> de
              equipo.
            </Heading>
            <Paragraph variant="secondary">
              No importa cuantas personas ocupes acomodar, nosotros tenemos esas
              oficinas que son perfectas para cualquier tamaño de equipo, que
              van desde 2 hasta 200 personas, o más.
            </Paragraph>
            <Button variant="primary">Explora oficinas</Button>
          </div>
          <div className="shrink-0 relative">
            <Image
              src={officeImage}
              alt="hero"
              className="size-96 h-auto rounded-tr-3xl rounded-bl-3xl"
            />
            <div className="space-y-4 absolute -top-24 lg:top-auto left-1/2 -translate-x-1/2 lg:bg-transparent bg-white bg-opacity-75 p-2 rounded-lg lg:left-0 lg:bottom-14 ">
              {badges.map((badge, index) => (
                <div className="flex items-center gap-x-4" key={index}>
                  <Badge className="w-48">
                    <span className="text-black bg-white rounded-full p-1">
                      <UsersRound size={16} />
                    </span>
                    <div className="flex flex-col gap-y-0.5">
                      <span>{badge.description}</span>
                      <span className="text-secondary">{badge.capacity}</span>
                    </div>
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Description };
