"use client";

import { Header } from "@/app/_page/_components/HeaderSection";
import { FooterSection } from "@/components/FooterSection";
import Image from "next/image";
import { Heading } from "@/components/common/Heading";
import { Highlight } from "@/components/common/Highlight";
import { Paragraph } from "@/components/common/Paragraph";
import Link from "next/link";
import { Button } from "@/components/common/Button";
import { TerminalIcon } from "lucide-react";
import supportImage from "@/../public/images/support.png";
import { ContactForm } from "./_components/ContactForm";

const Contact = () => {
  return (
    <div
      className="h-full min-h-screen bg-no-repeat bg-top bg-cover"
      style={{ backgroundImage: "url(/images/fondo-1.png)" }}
    >
      <Header />
      <div className="layout pt-32 md:pt-36 pb-12 flex gap-12">
        <div className="space-y-8">
          <Heading level="2">Contáctanos</Heading>
          <Paragraph variant="secondary">
            Para absolver tus dudas, puedes usar el chatbot que se encuentra en
            la parte inferior derecha de la página web. Sin embargo, si tienes
            más dudas, puedes escribirnos completando el siguiente formulario.
          </Paragraph>
          <ContactForm />
        </div>
        <Image
          src={supportImage}
          alt="Soporte"
          className="w-full lg:w-1/3 rounded-tl-3xl rounded-br-3xl hidden lg:block"
        />
      </div>
      <FooterSection />
    </div>
  );
};

export default Contact;
