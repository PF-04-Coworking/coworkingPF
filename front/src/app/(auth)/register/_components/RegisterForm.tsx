import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Formik, Form } from "formik";
import { validateRegister } from "@/app/(auth)/helpers/validateRegister";
import { FieldValidate } from "@/components/common/FieldValidate";
import { Button } from "@/components/common/Button";
import { InputLabel } from "@/components/common/InputLabel";
import { apiAuth } from "@/lib/api/auth/apiAuth";
import { IRegisterData } from "@/lib/api/types";
import { GoogleRegisterButton } from "./GoogleRegisterButton";
import { useAuthStore } from "../../stores/useAuthStore";

const RegisterForm = () => {
  const router = useRouter();
  const { setAuthToken, setUserData } = useAuthStore();

  const handleSubmitRegister = async (
    formData: IRegisterData,
    { setSubmitting }: any
  ) => {
    const promise = apiAuth.register(formData);
    toast.promise(promise, {
      pending: "Validando...",
      success: "Registro exitoso",
      error: "Ya existe un usuario con ese correo",
    });
    const response = await promise;
    const { email } = response;
    const { token, userNoPassword } = await apiAuth.login({
      email,
      password: formData.password,
    });
    setAuthToken(token);
    setUserData(userNoPassword);
    router.push("/rooms");
    setSubmitting(false);
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
            <GoogleRegisterButton />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export { RegisterForm };
