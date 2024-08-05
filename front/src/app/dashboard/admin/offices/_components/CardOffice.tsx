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
import { Paragraph } from "@/components/common/Paragraph";
import { Heading } from "@/components/common/Heading";
import { InputLabel } from "@/components/common/InputLabel";
import { apiOffices } from "@/lib/api/offices/apiOffices";
import { useOfficesStore } from "../../_stores/useOfficesStore";
import "react-toastify/dist/ReactToastify.css";
import { IEditOfficeData, IOffice } from "../../types";
import { servicesOptions } from "@/lib/constants/offices-constants";
import { useAuthStore } from "@/app/(auth)/stores/useAuthStore";
import Image from "next/image";

const CardOffice = ({
  id,
  name,
  location,
  description,
  capacity,
  price,
  imgUrl,
  services,
}: IOffice) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOffice, setSelectedOffice] = useState<IOffice>({
    id,
    name,
    location,
    description,
    capacity,
    price,
    imgUrl,
    services,
  });
  const { updateStoredOffice, removeStoredOffice } = useOfficesStore();
  const { authToken } = useAuthStore();

  const handleAddInfo = ({
    id,
    name,
    location,
    description,
    capacity,
    price,
    services,
  }: IOffice) => {
    setSelectedOffice({
      id,
      name,
      location,
      description,
      capacity,
      price,
      imgUrl,
      services,
    });
    setIsModalOpen(true);
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
      formData.append("services", values.services.join(","));
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

  return (
    <>
      <div className="backdrop-blur-lg bg-secondaryDark/60 rounded-md p-4 shadow-md text-white">
        <Image
          src={
            imgUrl
              ? imgUrl
              : "https://res.cloudinary.com/danpp1ys8/image/upload/v1722819564/arcbukd8qxep3aqfni71.webp"
          }
          alt="Office Image"
          className="rounded-md object-cover w-full h-80"
          width={0}
          height={0}
          sizes="100vw"
        />
        <div className="py-4 space-y-2">
          <Heading level="3" className="font-medium">
            {name}
          </Heading>
          <Paragraph variant="secondary">{location}</Paragraph>
          <Paragraph variant="secondary">{description}</Paragraph>
          <Paragraph variant="secondary">Precio por día: {price}</Paragraph>
          <Paragraph variant="secondary">Capacidad: {capacity}</Paragraph>
          <Button
            className="w-full !mt-4"
            variant="primary"
            onClick={() =>
              handleAddInfo({
                id,
                name,
                location,
                description,
                capacity,
                price,
                imgUrl,
                services,
              })
            }
          >
            Editar
          </Button>
        </div>
      </div>

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
              // @ts-ignore
              onSubmit={handleEditOffice}
            >
              {({ isSubmitting, dirty, setFieldValue }: any) => (
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
                      <InputLabel htmlFor="location">País</InputLabel>
                      <Field
                        name="location"
                        className="rounded-md py-2 mt-1 mb-5 text-md w-full bg-inherit text-white border focus:outline-none border-primary px-3 text-sm"
                      />
                    </div>
                    <div className="grid gap-2">
                      <InputLabel htmlFor="description">Direccion</InputLabel>
                      <Field
                        name="description"
                        className="rounded-md py-2 mt-1 mb-5 text-md w-full bg-inherit text-white border focus:outline-none border-primary px-3 text-sm"
                      />
                    </div>
                    <div className="grid gap-2">
                      <InputLabel htmlFor="capacity">
                        Capacidad de espacio:
                      </InputLabel>
                      <Field
                        name="capacity"
                        className="rounded-md py-2 mt-1 mb-5 text-md w-full bg-inherit text-white border focus:outline-none border-primary px-3 text-sm"
                      />
                    </div>
                    <div className="grid gap-2">
                      <InputLabel htmlFor="price">Precio de venta:</InputLabel>
                      <Field
                        name="price"
                        className="rounded-md py-2 mt-1 mb-5 text-md w-full bg-inherit text-white border focus:outline-none border-primary px-3 text-sm"
                      />
                    </div>
                    {servicesOptions.length > 0 && (
                      <div className="grid gap-2">
                        {servicesOptions.map((service) => (
                          <label
                            key={service}
                            className="flex gap-2 items-center mb-3"
                          >
                            <Field
                              type="checkbox"
                              name="services"
                              value={service}
                            />
                            {service}
                          </label>
                        ))}
                      </div>
                    )}
                    <div className="space-y-2">
                      <InputLabel htmlFor="file">
                        Imagen de la oficina:
                      </InputLabel>
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
                        className="mt-1 mb-5 file:bg-inherit file:text-white file:border file:border-primary file:rounded-md file:p-2 text-sm file:hover:text-primary cursor-pointer file:cursor-pointer file:mr-4 w-full max-w-[350px]"
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
