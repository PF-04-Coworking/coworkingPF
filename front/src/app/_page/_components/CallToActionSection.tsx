import { Heading } from "@/components/common/Heading";
import { Highlight } from "@/components/common/Highlight";
import { Paragraph } from "@/components/common/Paragraph";

const CallToAction = () => {
  return (
    <div className="layout text-center space-y-12 py-12">
      <Heading level="2">
        Cómodo. <Highlight>Profesional</Highlight>. Económico.
      </Heading>
      <Paragraph variant="secondary" className="max-w-xl mx-auto">
        Somos un equipo diverso y apasionado que se encarga de diseñar y
        ejecutar tu visión. Nos mantenemos ágiles y disfrutamos creando un gran
        trabajo. ¡Gracias por confiar en nosotros y permitirnos ser parte de tu
        éxito!
      </Paragraph>
    </div>
  );
};

export { CallToAction };
