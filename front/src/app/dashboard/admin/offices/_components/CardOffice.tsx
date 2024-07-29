"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/common/Button";
import { Field, Form, Formik } from "formik";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Paragraph } from "@/components/common/Paragraph";
import { Heading } from "@/components/common/Heading";
import { InputLabel } from "@/components/common/InputLabel";

const CardOffice: React.FC<IOffice> = ({ url, nombre, direccion }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOffice, setSelectedOffice] = useState<IProps | null>(null);

  const handleAddInfo = (props: IProps) => {
    setSelectedOffice(props);
    setIsModalOpen(true);
  };

  const router = useRouter();

  const handleEditOffice = async (
    values: any,
    { setSubmitting, resetForm }: any
  ) => {
    try {
      const response = await fetch("url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        toast.success("Editado Exitosamente");
        router.push("/account/dashboard");
      } else {
        toast.error("Error");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteOffice = async (name: string | undefined) => {
    try {
      const response = await fetch("url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      if (response.ok) {
        toast.success("Eliminado Exitosamente");
        router.push("/account/dashboard");
      } else {
        toast.error("Error");
      }
    } finally {
      console.log("ok");
    }
  };

  return (
    <>
      <div className="backdrop-blur-lg bg-secondaryDark/60 rounded-md p-4 shadow-md text-white">
        <img
          src={url}
          alt="Office Image"
          className="rounded-md object-cover w-full h-80"
        />
        <div className="py-4 space-y-2">
          <Heading level="3" className="font-medium">
            {nombre}
          </Heading>
          <Paragraph variant="secondary">{direccion}</Paragraph>
          <Button
            className="w-full !mt-4"
            variant="primary"
            onClick={() =>
              handleAddInfo({ name: nombre, direccion: direccion })
            }
          >
            <span className="text-black">Editar</span>
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
                name: selectedOffice?.name,
                direccion: selectedOffice?.direccion,
                file: null,
              }}
              onSubmit={handleEditOffice}
            >
              {({ isSubmitting }: any) => (
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
                      <InputLabel htmlFor="direccion">Direccion</InputLabel>
                      <Field
                        name="direccion"
                        className="rounded-md py-2 mt-1 mb-5 text-md w-full bg-inherit text-white border focus:outline-none border-primary px-3 text-sm"
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
                        className="mt-1 mb-5 file:bg-inherit file:text-white file:border file:border-primary file:rounded-md file:p-2 text-sm file:hover:text-primary cursor-pointer file:cursor-pointer file:mr-4 w-full max-w-[350px]"
                      />
                    </div>
                  </div>

                  <DialogFooter className="flex gap-2 mt-8">
                    <Button variant="primary" className="w-full" type="submit">
                      Confirmar
                    </Button>
                    <Button
                      variant="destructive"
                      className="w-full"
                      onClick={() => handleDeleteOffice(selectedOffice?.name)}
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
