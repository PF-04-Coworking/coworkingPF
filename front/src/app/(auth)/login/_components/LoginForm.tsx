"use client";

import { Formik, Form } from "formik";
import { validateLogin } from "@/app/(auth)/helpers/validateLogin";
import { FieldValidate } from "@/components/common/FieldValidate";
import { Button } from "@/components/common/Button";
import { InputLabel } from "@/components/common/InputLabel";
import { ILoginData } from "@/lib/api/types";
import { GoogleLoginButton } from "./GoogleLoginButton";
import { apiAuth } from "@/lib/api/auth/apiAuth";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useAuthStore } from "../../stores/useAuthStore";

const LoginForm = () => {
  const router = useRouter();
  const { setAuthToken, setUserData } = useAuthStore();

  const handleSubmitLogin = async (
    formData: ILoginData,
    { setSubmitting }: any
  ) => {
    const promise = apiAuth.login(formData);
    toast.promise(promise, {
      pending: "Validando...",
      success: "Sesión iniciada",
      error: "Credenciales incorrectas",
    });
    const response = await promise;
    const { token, userNoPassword } = response;
    setAuthToken(token);
    setUserData(userNoPassword);
    router.push("/rooms");
    setSubmitting(false);
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
