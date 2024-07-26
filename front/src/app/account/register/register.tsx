"use client";
//hoja de validaciones y formik
import validateRegister from "@/helpers/validateRegister";
import { Formik, Form } from "formik";
//next hooks
import Link from "next/link";
import { useRouter } from "next/navigation";
//notificaciones
import { toast } from "react-toastify";
//props del SVG
import type { SVGProps } from "react";
//components
import FieldValidate from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Paragraph } from "@/components/ui/paragraph";
import { Highlight } from "@/components/ui/highlight";
//icons
import { ChevronLeft, QuoteIcon, Star } from "lucide-react";
//images
import memoji from "../../../../public/memoji.png";
import fondo from "../../../../public/Fondo.png";
import Image from "next/image";



const Register = () => {
  const router = useRouter();

  const handleSubmitRegister = async (
    values: any,
    { setSubmitting, resetForm }: any
  ) => {
    try {
      const response = await fetch("url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        toast.success("Registro Exitoso");
        router.push("/account/login");
      } else {
        toast.error("Error");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          phone: "",
          lastname: "",
        }}
        validate={validateRegister}
        onSubmit={handleSubmitRegister}
        validateOnChange={true}
        validateOnBlur={true}
      >
        {({ isSubmitting }: any) => (
          <Form>
            <div className="w-auto absolute top-60 left-20 bg-cover z-[-1]">
              <Image src={fondo} alt="background" />
            </div>
            <div className="grid w-full grid-cols-1 lg:grid-cols-custom h-auto bg-cover">
              <div className="py-12 px-4 md:px-6 lg:py-0 text-white">
                <div className="mt-10 absolute">
                  <button className=" rounded-[100%] bg-[#5c3e1954]">
                    <Link href="/">
                      <ChevronLeft className="text-primary lg:w-14 lg:h-14 w-10 h-10" />
                    </Link>
                  </button>
                </div>

                <div className="flex w-full h-full items-center">
                  <div className="mx-auto w-full max-w-[400px] space-y-6">
                    <div className="space-y-2 text-center">
                      <h2 className="text-4xl font-bold text-primary mb-5">
                        ¡Registrate!
                      </h2>
                      <Paragraph
                        className="text-secondary"
                        size="lg"
                        variant="secondary"
                      >
                        Estamos <Highlight>emocionados</Highlight> de que te
                        unas a nuestra comunidad. ¡Gracias por{" "}
                        <Highlight>elegirnos</Highlight> y ser parte de{" "}
                        <Highlight>nuestra</Highlight> comunidad!
                      </Paragraph>
                    </div>

                    <div className="space-y-1">
                      <div className="space-y-1 ">
                        <div className="flex items-center gap-[9.5rem]">
                          <label htmlFor="phone">Nombre</label>
                          <label htmlFor="lastname">Apellido</label>
                        </div>
                        <div className="flex gap-5">
                          <div>
                            <FieldValidate
                              name="name"
                              type="name"
                              placeholder="Nombre"
                            />
                          </div>
                          <div>
                            <FieldValidate
                              name="lastname"
                              type="text"
                              placeholder="Apellido"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label htmlFor="email">Email</label>
                        <FieldValidate
                          name="email"
                          type="email"
                          placeholder="Email Adress"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <label htmlFor="password">Contraseña</label>
                        </div>
                        <FieldValidate
                          name="password"
                          type="password"
                          placeholder="Contraseña"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <label htmlFor="phone">Número de Teléfono</label>
                        </div>
                        <FieldValidate
                          name="phone"
                          type="numvber"
                          placeholder="+22 123-123..."
                        />
                      </div>

                      <div className="pt-4 space-y-4">
                        <Button
                          type="submit"
                          className="w-full"
                          variant="primary"
                        >
                          Registrarse
                        </Button>
                        <Button variant="outline" className="w-full ">
                          <DeviconGoogle className="mr-2" />
                          Registrarse con Google
                        </Button>
                      </div>
                    </div>

                    <p className="text-center text-sm text-muted-foreground text-secondary">
                      ¿Ya tienes una cuenta?{" "}
                      <Link
                        href="/account/login"
                        className="font-medium underline underline-offset-4 hover:text-primary duration-300 text-white"
                        prefetch={false}
                      >
                        Iniciar sesión
                      </Link>
                    </p>
                  </div>
                </div>
              </div>

              <div className="hidden lg:flex h-screen justify-center items-center">
                <div className="w-[75%] max-h-[90%] rounded-3xl bg-gradient-to-t from-[#EB9A32] via-[#D7892D] to-[#BF7928] px-4 py-10 text-white sm:px-10 md:m-6 md:mr-8">
                  <p className="mb-20 font-bold tracking-wider">RELUX</p>
                  <p className="mb-4 text-4xl font-bold md:leading-snug italic">
                    ¡Empieza tu camino con nostros aquí! <br />
                    <br />
                    <QuoteIcon className=" fill-white size-14" />
                  </p>
                  <p className="mb-28 leading-relaxed text-gray-200 font-semibold text-xl">
                    "Descubre un mundo de oportunidades a tu alcance. Ingresa a
                    tu cuenta o regístrate y comienza tu viaje con nosotros.
                    ¡Estamos emocionados de tenerte a bordo y ver todo lo que
                    puedes lograr!"
                  </p>

                  <div className="bg-white rounded-2xl px-4 py-8 text-black">
                    <p className="mb-2 text-xl font-bold">
                      ¡Opiniones de nuestros clientes!
                    </p>
                    <p className="mb-3 mt-3 text-black italic">
                      <QuoteIcon className="fill-primary size-5" />
                      Buscaba un lugar tranquilo para trabajar en mis proyectos
                      y los espacios de Relux superaron mis expectativas. La
                      conexión a internet es excelente, y el ambiente es
                      motivador.
                    </p>
                    <div className="">
                      <div className="flex items-center">
                        <Image
                          className="h-10 w-10 rounded-full object-cover"
                          src={memoji}
                          alt="Carlos"
                        />
                        <p className="ml-4 w-56 flex ">
                          <strong className="font-medium w-40">
                            Carlos Ramírez
                          </strong>

                          <Star className="fill-yellow-300 text-yellow-300" />
                          <Star className="fill-yellow-300 text-yellow-300" />
                          <Star className="fill-yellow-300 text-yellow-300" />
                          <Star className="fill-yellow-300 text-yellow-300" />
                          <Star className="fill-yellow-300 text-yellow-300" />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Register;

export function DeviconGoogle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={21}
      height={21}
      viewBox="0 0 128 128"
      {...props}
    >
      <path
        fill="#fff"
        d="M44.59 4.21a63.28 63.28 0 0 0 4.33 120.9a67.6 67.6 0 0 0 32.36.35a57.13 57.13 0 0 0 25.9-13.46a57.44 57.44 0 0 0 16-26.26a74.3 74.3 0 0 0 1.61-33.58H65.27v24.69h34.47a29.72 29.72 0 0 1-12.66 19.52a36.2 36.2 0 0 1-13.93 5.5a41.3 41.3 0 0 1-15.1 0A37.2 37.2 0 0 1 44 95.74a39.3 39.3 0 0 1-14.5-19.42a38.3 38.3 0 0 1 0-24.63a39.25 39.25 0 0 1 9.18-14.91A37.17 37.17 0 0 1 76.13 27a34.3 34.3 0 0 1 13.64 8q5.83-5.8 11.64-11.63c2-2.09 4.18-4.08 6.15-6.22A61.2 61.2 0 0 0 87.2 4.59a64 64 0 0 0-42.61-.38"
      ></path>
      <path
        fill="#e33629"
        d="M44.59 4.21a64 64 0 0 1 42.61.37a61.2 61.2 0 0 1 20.35 12.62c-2 2.14-4.11 4.14-6.15 6.22Q95.58 29.23 89.77 35a34.3 34.3 0 0 0-13.64-8a37.17 37.17 0 0 0-37.46 9.74a39.25 39.25 0 0 0-9.18 14.91L8.76 35.6A63.53 63.53 0 0 1 44.59 4.21"
      ></path>
      <path
        fill="#f8bd00"
        d="M3.26 51.5a63 63 0 0 1 5.5-15.9l20.73 16.09a38.3 38.3 0 0 0 0 24.63q-10.36 8-20.73 16.08a63.33 63.33 0 0 1-5.5-40.9"
      ></path>
      <path
        fill="#587dbd"
        d="M65.27 52.15h59.52a74.3 74.3 0 0 1-1.61 33.58a57.44 57.44 0 0 1-16 26.26c-6.69-5.22-13.41-10.4-20.1-15.62a29.72 29.72 0 0 0 12.66-19.54H65.27c-.01-8.22 0-16.45 0-24.68"
      ></path>
      <path
        fill="#319f43"
        d="M8.75 92.4q10.37-8 20.73-16.08A39.3 39.3 0 0 0 44 95.74a37.2 37.2 0 0 0 14.08 6.08a41.3 41.3 0 0 0 15.1 0a36.2 36.2 0 0 0 13.93-5.5c6.69 5.22 13.41 10.4 20.1 15.62a57.13 57.13 0 0 1-25.9 13.47a67.6 67.6 0 0 1-32.36-.35a63 63 0 0 1-23-11.59A63.7 63.7 0 0 1 8.75 92.4"
      ></path>
    </svg>
  );
}
