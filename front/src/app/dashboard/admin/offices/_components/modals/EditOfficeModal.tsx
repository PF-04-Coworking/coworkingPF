import { Button } from "@/components/common/Button";
import { InputLabel } from "@/components/common/InputLabel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/common/dialog";
import { Checkbox } from "@/components/common/Checkbox";
import { Field, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { servicesOptions } from "@/lib/constants/servicesOptions";
import { IEditOfficeData, IOffice } from "../../../types";
import { useAuthStore } from "@/app/(auth)/stores/useAuthStore";
import { useOfficesStore } from "../../../../../../stores/useOfficesStore";
import { apiOffices } from "@/lib/api/offices/apiOffices";
import { toast } from "react-toastify";
import { FieldValidate } from "@/components/common/FieldValidate";

interface IProps {
  selectedOffice: IOffice;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditOfficeModal = ({
  selectedOffice,
  isModalOpen,
  setIsModalOpen,
}: IProps) => {
  const { updateStoredOffice, removeStoredOffice } = useOfficesStore();
  const { authToken } = useAuthStore();

  const handleDeleteOffice = async ({ id }: { id: string }) => {
    try {
      if (!authToken) return;
      const promise = apiOffices.deleteOffice(id, authToken);
      toast.promise(promise, {
        pending: "Eliminando...",
        success: "Oficina eliminada exitosamente",
        error: "Error",
      });
      await promise;
      removeStoredOffice(id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditOffice = async (
    values: IEditOfficeData,
    { setSubmitting, resetForm }: FormikHelpers<IEditOfficeData>
  ) => {
    try {
      if (!selectedOffice || !authToken) return;
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("location", values.location);
      formData.append("description", values.description);
      formData.append("capacity", values.capacity);
      formData.append("price", values.price);
      values.services.forEach((service) =>
        formData.append("services", service)
      );
      // @ts-ignore
      formData.append("file", values.file);
      console.log("authToken", authToken);
      const promise = apiOffices.updateOffice(
        selectedOffice.id,
        formData,
        authToken
      );
      toast.promise(promise, {
        pending: "Actualizando...",
        success: "Actualizado exitosamente",
        error: "Error",
      });
      const newOffice = await promise;
      updateStoredOffice(selectedOffice.id, newOffice);
      resetForm({ values });
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Debes ingresar un nombre"),
    location: Yup.string()
      .required("Debes ingresar una ciudad")
      .min(2, "Debes ingresar al menos 2 caracteres"),
    description: Yup.string()
      .required("Debes ingresar una descripción")
      .min(2, "Debes ingresar al menos 2 caracteres"),
    capacity: Yup.number()
      .required("Debes ingresar un número máximo de invitados")
      .min(1, "Debes ingresar al menos 1 espacio"),
    price: Yup.number()
      .required("Debes ingresar un precio")
      .min(1, "Debes ingresar al menos 1 euro"),
  });

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="font-sans bg-background text-white border-secondaryDark max-h-[90%] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar</DialogTitle>
          <DialogDescription className="text-secondary text-md pb-5">
            Modifica los siguientes datos para editar el espacio.
          </DialogDescription>
        </DialogHeader>
        <div>
          <Formik
            initialValues={{
              name: selectedOffice.name,
              description: selectedOffice.description,
              location: selectedOffice.location,
              capacity: selectedOffice.capacity,
              price: selectedOffice.price,
              file: undefined,
              services: selectedOffice.services,
            }}
            validationSchema={validationSchema}
            // @ts-ignore
            onSubmit={handleEditOffice}
          >
            {({ isSubmitting, dirty, setFieldValue }: any) => (
              <Form>
                <div className="grid gap-8">
                  <div className="grid gap-2">
                    <InputLabel htmlFor="name">Nombre</InputLabel>
                    <FieldValidate
                      type="text"
                      name="name"
                      className="rounded-md py-3 mt-1 text-md w-full bg-inherit text-white border focus:outline-none px-3 border-primary text-sm"
                    />
                  </div>
                  <div className="grid gap-2">
                    <InputLabel htmlFor="location">País</InputLabel>
                    <FieldValidate
                      type="text"
                      name="location"
                      className="rounded-md py-3 mt-1 text-md w-full bg-inherit text-white border focus:outline-none border-primary px-3 text-sm"
                    />
                  </div>
                  <div className="grid gap-2">
                    <InputLabel htmlFor="description">Dirección</InputLabel>
                    <FieldValidate
                      type="text"
                      name="description"
                      className="rounded-md py-3 mt-1 text-md w-full bg-inherit text-white border focus:outline-none border-primary px-3 text-sm"
                    />
                  </div>
                  <div className="grid gap-2">
                    <InputLabel htmlFor="capacity">
                      Número máximo de invitados
                    </InputLabel>
                    <FieldValidate
                      type="number"
                      name="capacity"
                      className="rounded-md py-3 mt-1 text-md w-full bg-inherit text-white border focus:outline-none border-primary px-3 text-sm"
                    />
                  </div>
                  <div className="grid gap-2">
                    <InputLabel htmlFor="price">
                      Precio de alquiler por día
                    </InputLabel>
                    <FieldValidate
                      type="number"
                      name="price"
                      className="rounded-md py-3 mt-1 text-md w-full bg-inherit text-white border focus:outline-none border-primary px-3 text-sm"
                    />
                  </div>
                  {servicesOptions.length > 0 && (
                    <div className="grid gap-2">
                      {servicesOptions.map((service) => (
                        <label
                          key={service}
                          className="flex gap-x-4 items-center"
                        >
                          <Checkbox
                            name="services"
                            value={service}
                            className="border-primary"
                          />
                          {service}
                        </label>
                      ))}
                    </div>
                  )}
                  <div className="space-y-3">
                    <InputLabel htmlFor="file">¿Nueva imagen?</InputLabel>
                    <Field
                      id="file"
                      name="file"
                      type="file"
                      value={undefined}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        const file = event.currentTarget.files?.[0];
                        setFieldValue("file", file);
                      }}
                      className="mt-1 file:bg-inherit file:text-white file:border file:border-primary file:rounded-md file:p-2 text-sm file:hover:text-primary cursor-pointer file:cursor-pointer file:mr-4 w-full max-w-[350px]"
                    />
                  </div>
                </div>

                <DialogFooter className="flex gap-2 mt-8">
                  <Button
                    variant="primary"
                    className="w-full"
                    type="submit"
                    disabled={isSubmitting || !dirty}
                  >
                    Confirmar
                  </Button>
                  <Button
                    type="button"
                    variant="destructive"
                    className="w-full"
                    onClick={() =>
                      handleDeleteOffice({ id: selectedOffice.id })
                    }
                  >
                    Eliminar
                  </Button>
                </DialogFooter>
              </Form>
            )}
          </Formik>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { EditOfficeModal };
