"use client";

import { Formik, Form } from "formik";
import { validateLogin } from "@/app/(auth)/helpers/validateLogin";
import { FieldValidate } from "@/components/common/FieldValidate";
import { Button } from "@/components/common/Button";
import { InputLabel } from "@/components/common/InputLabel";
import { ILoginData } from "@/lib/api/types";
import { GoogleLoginButton } from "./GoogleLoginButton";

const LoginForm = () => {
  const handleSubmitLogin = async (
    formData: ILoginData,
    { setSubmitting }: any
  ) => {
    console.log("Logueando...");
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validate={validateLogin}
      onSubmit={handleSubmitLogin}
    >
      {({ isSubmitting }: any) => (
        <Form className="space-y-4">
          <div className="space-y-2">
            <InputLabel htmlFor="email">Correo electrónico</InputLabel>
            <FieldValidate
              name="email"
              type="email"
              placeholder="Correo electrónico"
            />
          </div>

          <div className="space-y-2">
            <InputLabel htmlFor="password">Contraseña</InputLabel>
            <FieldValidate
              name="password"
              type="password"
              placeholder="Contraseña"
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-4 !mt-8">
            <Button type="submit" className="w-full" variant="primary">
              Iniciar Sesión
            </Button>
            <GoogleLoginButton />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export { LoginForm };
