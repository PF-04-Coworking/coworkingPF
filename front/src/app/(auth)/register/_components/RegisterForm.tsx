import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Formik, Form } from "formik";
import validateRegister from "@/app/(auth)/helpers/validateRegister";
import { FieldValidate } from "@/components/common/FieldValidate";
import { Button } from "@/components/common/Button";
import { GoogleIcon } from "../../_components/GoogleIcon";
import { InputLabel } from "@/components/common/InputLabel";
import { apiUsers } from "@/lib/api/auth/apiUsers";
import { IRegisterData } from "@/lib/api/types";

const RegisterForm = () => {
  const router = useRouter();

  const handleSubmitRegister = async (
    formData: IRegisterData,
    { setSubmitting, resetForm }: any
  ) => {
    try {
      const response = await apiUsers.register(formData);
      console.log(response);
      toast.success("Registro exitoso");
      router.push("/login");
    } catch (error) {
      toast.error("Hubo un error al registrarte");
    } finally {
      setSubmitting(false);
    }
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
            <Button type="submit" className="w-full" variant="primary" disabled={isSubmitting}> 
              Registrarse
            </Button>
            <Button variant="outline" className="w-full">
              <GoogleIcon className="mr-2" />
              Registrarse con Google
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export { RegisterForm };
