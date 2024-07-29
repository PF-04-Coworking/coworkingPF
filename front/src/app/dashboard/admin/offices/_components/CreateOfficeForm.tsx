"use client";
import { Button } from "@/components/common/Button";
import { DialogFooter } from "@/components/common/dialog";
import { Field, Form, Formik } from "formik";
import { toast } from "react-toastify";
import { InputLabel } from "@/components/common/InputLabel";
import { apiOffices } from "@/lib/api/offices/apiOffices";
import { useOfficesStore } from "../../_stores/useOfficesStore";

const CreateOfficeForm = () => {
  const { addStoredOffice } = useOfficesStore();

  const handleAddOffice = async (
    values: any,
    { setSubmitting, resetForm }: any
  ) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("location", values.location);
    formData.append("file", values.file);
    try {
      const promise = apiOffices.createOffice(formData);
      toast.promise(promise, {
        pending: "Agregando...",
        success: "Oficina creada exitosamente",
        error: "Error",
      });
      const officeData = await promise;
      addStoredOffice(officeData);
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        name: "",
        location: "",
        file: null,
      }}
      onSubmit={handleAddOffice}
    >
      {({ isSubmitting, dirty, setFieldValue }: any) => (
        <Form>
          <div className="space-y-8">
            <div className="space-y-2">
              <InputLabel htmlFor="name">Nombre</InputLabel>
              <Field
                name="name"
                className="rounded-md py-2 px-2 mt-1 mb-5 text-md w-full bg-inherit text-white border focus:outline-none border-primary"
              />
            </div>
            <div className="space-y-2">
              <InputLabel htmlFor="direccion">Direccion</InputLabel>
              <Field
                name="location"
                className="rounded-md py-2 px-2 mt-1 mb-5 text-md w-full bg-inherit text-white border focus:outline-none border-primary pr-2"
              />
            </div>

            <div className="space-y-2">
              <InputLabel htmlFor="file">
                Sube un archivo multimedia:
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
