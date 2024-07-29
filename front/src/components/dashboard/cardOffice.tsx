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
import Image from "next/image";
import { Field, Form, Formik } from "formik";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Button } from "../common/Button";

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
      <div className=" bg-secondaryDark rounded-md p-4 shadow-md mb-4 text-white">
        <img
          src={url}
          alt="Office Image"
          className="rounded-md object-cover w-full"
        />
        <div className="p-4 space-y-2">
          <h3 className="text-lg font-medium">{nombre}</h3>
          <p className="text-muted-foreground italic">{direccion}</p>
          <Button
            className="w-full"
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
        <DialogContent className="font-sans bg-background text-white border-primary ">
          <DialogHeader>
            <DialogTitle className=" justify-center flex">Editar</DialogTitle>
            <DialogDescription className="text-secondary text-md pb-5 flex justify-center">
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
                      <label htmlFor="name">Nombre</label>
                      <Field
                        name="name"
                        className="rounded-[10px] h-[60px] py-2 mt-1 mb-5 text-md w-full bg-inherit text-white border focus:outline-none pl-5 border-primary"
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="direccion">Direccion</label>
                      <Field
                        name="direccion"
                        className="rounded-[10px] h-[60px] py-2 mt-1 mb-5 text-md w-full bg-inherit text-white border focus:outline-none pl-5 border-primary pr-2"
                      />
                    </div>

                    <div className="grid gap-2">
                      <label htmlFor="file">Sube un archivo multimedia:</label>
                      <Field
                        id="file"
                        name="file"
                        type="file"
                        className="h-[60px] py-2 mt-1 mb-5 file:bg-inherit file:text-white file:border  file:border-primary file:rounded-[10px] file:p-2"
                      />
                    </div>
                  </div>

                  <DialogFooter className="flex gap-2">
                    <Button variant="primary" className="w-full" type="submit">
                      Confirmar
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full !bg-red-500 border-none hover:text-white hover:bg-red-950 duration-300"
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

export default CardOffice;
