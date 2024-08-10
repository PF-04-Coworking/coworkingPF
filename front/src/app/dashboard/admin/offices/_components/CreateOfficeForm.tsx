"use client";
import { Button } from "@/components/common/Button";
import { DialogFooter } from "@/components/common/dialog";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { InputLabel } from "@/components/common/InputLabel";
import { apiOffices } from "@/lib/api/offices/apiOffices";
import { useOfficesStore } from "../../../../../stores/useOfficesStore";
import { IEditOfficeData } from "../../types";
import { useAuthStore } from "@/app/(auth)/stores/useAuthStore";
import { servicesOptions } from "@/lib/constants/offices-constants";
import { FieldValidate } from "@/components/common/FieldValidate";

const CreateOfficeForm = () => {
  const { addStoredOffice } = useOfficesStore();
  const { authToken } = useAuthStore();

  const handleAddOffice = async (
    values: IEditOfficeData,
    { setSubmitting, resetForm }: FormikHelpers<IEditOfficeData>
  ) => {
    if (!authToken) return;
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("location", values.location);
    formData.append("description", values.description);
    formData.append("capacity", values.capacity);
    formData.append("price", values.price);
    formData.append("services", values.services.join(","));
    // @ts-ignore
    formData.append("file", values.file);
    try {
      const promise = apiOffices.createOffice(formData, authToken);
      toast.promise(promise, {
        pending: "Agregando...",
        success: "Oficina creada exitosamente",
        error: "Error",
      });
      const officeData = await promise;
      officeData.services = officeData.services.split(",");
      addStoredOffice(officeData);
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Requerido"),
    location: Yup.string().required("Requerido"),
    description: Yup.string().required("Requerido"),
    capacity: Yup.string().required("Requerido"),
    price: Yup.string().required("Requerido"),
    services: Yup.array().required("Requerido"),
  });

  return (
    <Formik
      initialValues={{
        name: "",
        location: "",
        description: "",
        capacity: "",
        price: "",
        file: undefined,
        services: [],
      }}
      validationSchema={validationSchema}
      // @ts-ignore
      onSubmit={handleAddOffice}
    >
      {({ isSubmitting, dirty, setFieldValue }: any) => (
        <Form>
          <div className="space-y-8">
            <div className="space-y-2">
              <InputLabel htmlFor="name">Nombre</InputLabel>
              <FieldValidate
                type="text"
                name="name"
                className="rounded-md py-2 px-2 mt-1 mb-5 text-md w-full bg-inherit text-white border focus:outline-none border-primary"
              />
            </div>
            <div className="space-y-2">
              <InputLabel htmlFor="direccion">País</InputLabel>
              <FieldValidate
                type="text"
                name="location"
                className="rounded-md py-2 px-2 mt-1 mb-5 text-md w-full bg-inherit text-white border focus:outline-none border-primary pr-2"
              />
            </div>
            <div className="space-y-2">
              <InputLabel htmlFor="description">Dirección</InputLabel>
              <FieldValidate
                type="text"
                name="description"
                className="rounded-md py-2 px-2 mt-1 mb-5 text-md w-full bg-inherit text-white border focus:outline-none border-primary"
              />
            </div>
            <div className="space-y-2">
              <InputLabel htmlFor="description">Capacidad</InputLabel>
              <FieldValidate
                type="text"
                name="capacity"
                className="rounded-md py-2 px-2 mt-1 mb-5 text-md w-full bg-inherit text-white border focus:outline-none border-primary"
              />
            </div>
            <div className="space-y-2">
              <InputLabel htmlFor="description">Precio</InputLabel>
              <FieldValidate
                type="number"
                name="price"
                className="rounded-md py-2 px-2 mt-1 mb-5 text-md w-full bg-inherit text-white border focus:outline-none border-primary"
              />
            </div>
            {servicesOptions.length > 0 && (
              <div className="grid gap-2">
                {servicesOptions.map((service) => (
                  <label key={service} className="flex gap-2 items-center mb-3">
                    <Field
                      type="checkbox"
                      name="services"
                      value={service}
                      className="border-primary"
                    />
                    {service}
                  </label>
                ))}
              </div>
            )}
            <div className="space-y-2">
              <InputLabel htmlFor="file">
                Sube una foto de la oficina:
              </InputLabel>
              <Field
                id="file"
                name="file"
                type="file"
                value={undefined}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const file = event.currentTarget.files?.[0];
                  setFieldValue("file", file);
                }}
                className="mt-1 mb-5 file:bg-inherit file:text-white file:border file:border-primary file:rounded-md file:p-2 text-sm file:hover:text-primary cursor-pointer file:cursor-pointer file:mr-4 w-full max-w-[350px]"
              />
            </div>
          </div>
          <DialogFooter className="mt-8">
            <Button
              variant="primary"
              className="w-full"
              type="submit"
              disabled={isSubmitting || !dirty}
            >
              Añadir
            </Button>
          </DialogFooter>
        </Form>
      )}
    </Formik>
  );
};

export { CreateOfficeForm };
