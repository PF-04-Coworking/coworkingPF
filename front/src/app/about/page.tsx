import { Header } from "@/app/_page/_components/HeaderSection";
import { FooterSection } from "@/components/FooterSection";
import { Heading } from "@/components/common/Heading";
import { Highlight } from "@/components/common/Highlight";
import { Paragraph } from "@/components/common/Paragraph";
import { TextCard } from "./_components/TextCard";

const members = [
  {
    name: "Bardo Untiveros",
    role: "Frontend",
    image: "/images/bardo-untiveros.png",
  },
  {
    name: "Angel Vázquez",
    role: "Frontend",
    image: "/images/Angel.jpg",
  },
  {
    name: "Felipe Cabana",
    role: "Backend",
    image: "/images/felipe-cabana.png",
  },
  {
    name: "Lola Campos",
    role: "Backend",
    image: "/images/lola-campos.png",
  },
  {
    name: "Mateo Tello",
    role: "Backend",
    image: "/images/mateo-tello.png",
  },
  {
    name: "Renata Montoya",
    role: "Backend",
    image: "/images/renata-montoya.png",
  },
];

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
          <Heading level="2">Nuestro equipo de desarrollo</Heading>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {members.map((member, index) => (
              <div
                key={index}
                className="border-2 border-primary rounded-lg p-6 text-white flex flex-col items-center justify-center gap-6"
              >
                <div
                  className="bg-cover bg-center rounded-full size-32"
                  style={{
                    backgroundImage: `url(${member.image})`,
                  }}
                ></div>
                <div className="space-y-2">
                  <Paragraph variant="primary" className="font-semibold">
                    {member.name}
                  </Paragraph>
                  <Paragraph variant="primary" className="!text-primary">
                    {member.role}
                  </Paragraph>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <FooterSection />
    </div>
  );
};

export default About;
