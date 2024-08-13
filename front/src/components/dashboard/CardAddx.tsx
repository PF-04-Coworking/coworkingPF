"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/common/Dialog";
import { Field, Form, Formik } from "formik";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../common/Button";

const CardAdd = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  const handleAddOffice = async (
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
        toast.success("Agregado Exitosamente");
        router.push("/account/dashboard");
      } else {
        toast.error("Error");
      }
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="font-sans bg-background text-white border-primary ">
          <DialogHeader>
            <DialogTitle className=" justify-center flex">Añadir</DialogTitle>
            <DialogDescription className="text-secondary text-md pb-5 flex justify-center">
              Añade los siguientes datos para agregar un nuevo espacio.
            </DialogDescription>
          </DialogHeader>
          <div>
            <Formik
              initialValues={{
                name: "",
                direccion: "",
                file: null,
              }}
              onSubmit={handleAddOffice}
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
                      Añadir
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

export default CardAdd;
