"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/common/dialog";
import { Button } from "@/components/common/Button";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Paragraph } from "@/components/common/Paragraph";
import { Heading } from "@/components/common/Heading";
import { InputLabel } from "@/components/common/InputLabel";
import { apiOffices } from "@/lib/api/offices/apiOffices";
import "react-toastify/dist/ReactToastify.css";
import { useOfficesStore } from "../../_stores/useOfficesStore";

interface IProps {
  id: string;
  name: string;
  location: string;
  imgUrl?: string;
}

const CardOffice = ({ id, name, location, imgUrl }: IProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOffice, setSelectedOffice] = useState<IProps>({
    id,
    name,
    location,
  });
  const { updateStoredOffice, removeStoredOffice } = useOfficesStore();

  const handleAddInfo = ({ id, name, location, imgUrl }: IProps) => {
    setSelectedOffice({ id, name, location });
    setIsModalOpen(true);
  };

  const handleEditOffice = async (
    values: IProps,
    { setSubmitting, resetForm }: FormikHelpers<IProps>
  ) => {
    try {
      if (!selectedOffice) return;
      const officeId = selectedOffice.id;
      const promise = apiOffices.updateOffice(officeId, values);
      toast.promise(promise, {
        pending: "Actualizando...",
        success: "Actualizado exitosamente",
        error: "Error",
      });
      updateStoredOffice(officeId, values);
      resetForm({ values });
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteOffice = async ({ id }: { id: string }) => {
    try {
      const promise = apiOffices.deleteOffice(id);
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

  return (
    <>
      <div className="backdrop-blur-lg bg-secondaryDark/60 rounded-md p-4 shadow-md text-white">
        <img
          src={imgUrl}
          alt="Office Image"
          className="rounded-md object-cover w-full h-80"
        />
        <div className="py-4 space-y-2">
          <Heading level="3" className="font-medium">
            {name}
          </Heading>
          <Paragraph variant="secondary">{location}</Paragraph>
          <Button
            className="w-full !mt-4"
            variant="primary"
            onClick={() => handleAddInfo({ id, name, location, imgUrl })}
          >
            Editar
          </Button>
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="font-sans bg-background text-white border-secondaryDark">
          <DialogHeader>
            <DialogTitle>Editar</DialogTitle>
            <DialogDescription className="text-secondary text-md pb-5">
              Modifica los siguientes datos para editar el espacio.
            </DialogDescription>
          </DialogHeader>
          <div>
            <Formik
              initialValues={{
                id: selectedOffice.id,
                name: selectedOffice.name,
                location: selectedOffice.location,
                // file: null,
              }}
              onSubmit={handleEditOffice}
            >
              {({ isSubmitting, dirty }: any) => (
                <Form>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <InputLabel htmlFor="name">Nombre</InputLabel>
                      <Field
                        name="name"
                        className="rounded-md py-2 mt-1 mb-5 text-md w-full bg-inherit text-white border focus:outline-none px-3 border-primary text-sm"
                      />
                    </div>
                    <div className="grid gap-2">
                      <InputLabel htmlFor="location">Direccion</InputLabel>
                      <Field
                        name="location"
                        className="rounded-md py-2 mt-1 mb-5 text-md w-full bg-inherit text-white border focus:outline-none border-primary px-3 text-sm"
                      />
                    </div>
                    {/* 
                    <div className="space-y-2">
                      <InputLabel htmlFor="file">
                        Sube un archivo multimedia:
                      </InputLabel>
                      <Field
                        id="file"
                        name="file"
                        type="file"
                        className="mt-1 mb-5 file:bg-inherit file:text-white file:border file:border-primary file:rounded-md file:p-2 text-sm file:hover:text-primary cursor-pointer file:cursor-pointer file:mr-4 w-full max-w-[350px]"
                      />
                    </div> */}
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
                      variant="destructive"
                      className="w-full"
                      onClick={() => handleDeleteOffice({ id })}
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
    </>
  );
};

export { CardOffice };
