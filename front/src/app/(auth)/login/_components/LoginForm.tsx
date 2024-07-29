"use client";

import { Formik, Form } from "formik";
import { toast } from "react-toastify";

import validateLogin from "@/app/(auth)/helpers/validateLogin";
import { FieldValidate } from "@/components/common/FieldValidate";
import { Button } from "@/components/common/Button";
import { InputLabel } from "@/components/common/InputLabel";
import { useRouter } from "next/navigation";
import { GoogleIcon } from "../../_components/GoogleIcon";
import { apiUsers } from "@/lib/api/auth/apiUsers";
import { ILoginData } from "@/lib/api/types";

const LoginForm = () => {
  const router = useRouter();

  const handleSubmitLogin = async (
    formData: ILoginData,
    { setSubmitting, resetForm }: any
  ) => {
    try {
      const response = await apiUsers.login(formData);
      const { token, user } = response;
      localStorage.setItem(
        "userSession",
        JSON.stringify({ token: token, userData: user })
      );
      toast.success("Bienvenido");
      router.push("/");
    } catch (error) {
      toast.error("Credenciales incorrectas");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validate={validateLogin}
      onSubmit={handleSubmitLogin}
      validateOnChange={true}
      validateOnBlur={true}
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
            />
          </div>

          <div className="space-y-4 !mt-8">
            <Button type="submit" className="w-full" variant="primary">
              Iniciar Sesión
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onSubmit={isSubmitting}
            >
              <GoogleIcon className="mr-2" />
              Iniciar sesión con Google
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export { LoginForm };
