import Link from "next/link";
import { Paragraph } from "@/components/common/Paragraph";
import { Highlight } from "@/components/common/Highlight";
import { Heading } from "@/components/common/Heading";
import { LoginForm } from "./_components/LoginForm";
import { AuthLayout } from "../_components/AuthLayout";

const Login = () => {
  return (
    <AuthLayout>
      <div className="w-full max-w-96 space-y-6">
        <div className="space-y-6">
          <Heading level="2" className="!text-primary text-center">
            ¡Bienvenido de nuevo!
          </Heading>
          <Paragraph className="text-secondary text-center" variant="secondary">
            Nos alegra <Highlight>verte</Highlight> otra vez. Por favor,{" "}
            <Highlight>inicia sesión</Highlight> con tu correo electrónico y
            contraseña para
            <Highlight> continuar.</Highlight>
          </Paragraph>
        </div>
        <LoginForm />
        <Paragraph variant="secondary" size="sm" className="text-center">
          ¿No tienes cuenta? ¡Creala!{" "}
          <Link
            href="/register"
            className="underline underline-offset-2 hover:text-primary transition-colors text-white"
            prefetch={false}
          >
            Registrarse
          </Link>
        </Paragraph>
      </div>
    </AuthLayout>
  );
};

export default Login;
