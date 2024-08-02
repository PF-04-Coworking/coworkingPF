import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Formik, Form } from "formik";
import { validateRegister } from "@/app/(auth)/helpers/validateRegister";
import { FieldValidate } from "@/components/common/FieldValidate";
import { Button } from "@/components/common/Button";
import { GoogleIcon } from "../../_components/GoogleIcon";
import { InputLabel } from "@/components/common/InputLabel";
import { apiUsers } from "@/lib/api/auth/apiUsers";
import { IRegisterData } from "@/lib/api/types";
import { GoogleLogin } from "@react-oauth/google";
import { useEffect } from "react";
import "../_components/Google.css";

const RegisterForm = () => {
  const router = useRouter();

  const handleSubmitRegister = async (
    formData: IRegisterData,
    { setSubmitting }: any
  ) => {
    const promise = apiUsers.register(formData);
    toast.promise(promise, {
      pending: "Validando...",
      success: "Registro exitoso",
      error: "Ya existe un usuario con ese correo",
    });
    await promise;
    toast.success("Registro exitoso");
    router.push("/login"); // TODO: Redirect to user dashboard
    setSubmitting(false);
  };

  const handleGoogleRegister = (response: any) => {
    console.log(response);
  };

  return (
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
    >
      {({ isSubmitting }: any) => (
        <Form className="space-y-4">
          <div className="space-y-2">
            <div className="flex gap-5">
              <div className="space-y-2">
                <InputLabel htmlFor="phone">Nombre</InputLabel>
                <FieldValidate name="name" type="name" placeholder="Nombre" />
              </div>
              <div className="space-y-2">
                <InputLabel htmlFor="lastname">Apellido</InputLabel>
                <FieldValidate
                  name="lastname"
                  type="text"
                  placeholder="Apellido"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <InputLabel htmlFor="email">Email</InputLabel>
            <FieldValidate
              name="email"
              type="email"
              placeholder="Email Adress"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <InputLabel htmlFor="password">Contraseña</InputLabel>
            </div>
            <FieldValidate
              name="password"
              type="password"
              placeholder="Contraseña"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <InputLabel htmlFor="phone">Número de Teléfono</InputLabel>
            </div>
            <FieldValidate
              name="phone"
              type="tel"
              placeholder="+22 123-123..."
            />
          </div>

          <div className="pt-4 space-y-4">
            <Button
              type="submit"
              className="w-full"
              variant="primary"
              disabled={isSubmitting}
            >
              Registrarse
            </Button>
            <GoogleLogin
              onSuccess={handleGoogleRegister}
              logo_alignment="center"
              text="signup_with"
              // width={363}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export { RegisterForm };
