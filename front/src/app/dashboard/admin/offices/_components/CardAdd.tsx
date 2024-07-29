"use client";
import { Button } from "@/components/common/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/common/dialog";
import { Field, Form, Formik } from "formik";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { InputLabel } from "@/components/common/InputLabel";

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
      <Button
        variant="primary"
        className="ml-4"
        onClick={() => setIsModalOpen(true)}
      >
        Agregar oficina
      </Button>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="font-sans bg-background text-white border-secondaryDark">
          <DialogHeader>
            <DialogTitle>Añadir</DialogTitle>
            <DialogDescription className="text-secondary text-md pb-5">
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
                  <div className="space-y-8">
                    <div className="space-y-2">
                      <InputLabel htmlFor="name">Nombre</InputLabel>
                      <Field
                        name="name"
                        className="rounded-md py-2 mt-1 mb-5 text-md w-full bg-inherit text-white border focus:outline-none pl-5 border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <InputLabel htmlFor="direccion">Direccion</InputLabel>
                      <Field
                        name="direccion"
                        className="rounded-md py-2 mt-1 mb-5 text-md w-full bg-inherit text-white border focus:outline-none pl-5 border-primary pr-2"
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

                  <DialogFooter className="mt-8">
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

export { CardAdd };
