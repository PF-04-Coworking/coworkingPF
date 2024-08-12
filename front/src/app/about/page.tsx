import { Header } from "@/app/_page/_components/HeaderSection";
import { FooterSection } from "@/components/FooterSection";
import Image from "next/image";
import { Heading } from "@/components/common/Heading";
import { Highlight } from "@/components/common/Highlight";
import { Paragraph } from "@/components/common/Paragraph";
import { TextCard } from "./_components/TextCard";
import Link from "next/link";
import { Button } from "@/components/common/Button";

const About = () => {
  return (
    <div
      className="h-full min-h-screen bg-no-repeat bg-top bg-cover"
      style={{ backgroundImage: "url(/images/fondo-1.png)" }}
    >
      <Header />
      <div className="layout pt-32 md:pt-36 pb-12 space-y-12">
        <Heading level="2" className="text-center">
          Bienvenido a <Highlight>Relux</Highlight>
        </Heading>
        <div
          className="h-[25rem] w-full bg-cover bg-center rounded-tl-3xl rounded-br-3xl"
          style={{ backgroundImage: "url(/images/office-3.png)" }}
        ></div>
        <Paragraph variant="primary">
          En Relux hemos reinventamos el espacio de trabajo para adaptarlo a tus
          necesidades. Ofrecemos oficinas flexibles y colaborativas que impulsan
          la productividad, la creatividad y la conexión. ¡Descubre el lugar
          perfecto para tu equipo y tu negocio, en el corazón de una comunidad
          vibrante y profesional!
        </Paragraph>
        <div className="space-y-8">
          <Heading level="3">Raíces de Relux</Heading>
          <div className="space-y-8">
            <TextCard title="Por qué empezamos">
              Relux nació de la necesidad de encontrar espacios de trabajo
              flexibles y asequibles en un mundo laboral en constante cambio.
              Como profesionales que enfrentábamos la falta de opciones
              adecuadas para oficinas temporales y colaborativas, decidimos
              tomar la iniciativa y crear una solución innovadora.
            </TextCard>
            <TextCard title="Cómo empezamos" odd>
              Comenzamos con una pequeña comunidad de freelancers y startups,
              compartiendo espacios y recursos. A medida que nuestra comunidad
              crecía, nos dimos cuenta de la importancia de tener un entorno que
              fomentara la creatividad, la productividad y la colaboración.
            </TextCard>
            <TextCard title="Relux">
              Fue entonces cuando decidimos desarrollar Relux, una plataforma
              dedicada a conectar a profesionales y empresas con los mejores
              espacios de coworking y oficinas privadas.
            </TextCard>
            <TextCard title="Objetivo" odd>
              Desde el inicio hemos trabajado arduamente para ofrecer una
              experiencia de usuario excepcional y adaptada a las necesidades
              específicas de nuestros clientes. Nuestro objetivo es transformar
              la manera en que las personas trabajan, proporcionando entornos de
              trabajo dinámicos y flexibles que se ajusten a las demandas de la
              economía moderna.
            </TextCard>
          </div>
        </div>
        <div className="text-center space-y-12 !mt-24">
          <Heading level="2">Sigue con tus proyectos</Heading>
          <Paragraph variant="secondary" className="max-w-xl mx-auto">
            Sé parte de muchos equipos que realizan sus proyectos de manera
            colaborativa y productiva. ¡Con Relux, podrás encontrar espacios de
            trabajo que se ajusten a tus necesidades y que te permitan trabajar
            de manera eficiente y productiva!
          </Paragraph>
          <Link href="/rooms" className="block">
            <Button variant="primary">Buscar oficinas</Button>
          </Link>
        </div>
      </div>
      <FooterSection />
    </div>
  );
};

export default About;
