"use client";

import Link from "next/link";
import { Paragraph } from "@/components/common/Paragraph";
import { Highlight } from "@/components/common/Highlight";
import { AuthLayout } from "../_components/AuthLayout";
import { Heading } from "@/components/common/Heading";
import { RegisterForm } from "./_components/RegisterForm";

const Register = () => {
  return (
    <AuthLayout>
      <div className="w-full max-w-96 space-y-6">
        <div className="space-y-6">
          <Heading level="2" className="!text-primary text-center">
            ¡Regístrate!
          </Heading>
          <Paragraph className="text-secondary text-center" variant="secondary">
            Estamos <Highlight>emocionados</Highlight> de que te unas a nuestra
            comunidad. ¡Gracias por <Highlight>elegirnos</Highlight> y ser parte
            de <Highlight>nuestra</Highlight> comunidad!
          </Paragraph>
        </div>
        <RegisterForm />
        <Paragraph variant="secondary" size="sm" className="text-center">
          ¿Ya tienes una cuenta?{" "}
          <Link
            href="/login"
            className="underline underline-offset-2 hover:text-primary transition-colors text-white"
            prefetch={false}
          >
            Iniciar sesión
          </Link>
        </Paragraph>
      </div>
    </AuthLayout>
  );
};

export default Register;
