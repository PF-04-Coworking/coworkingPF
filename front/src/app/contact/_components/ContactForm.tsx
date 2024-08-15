import { Button } from "@/components/common/Button";
import { FieldValidate } from "@/components/common/FieldValidate";
import { InputLabel } from "@/components/common/InputLabel";
import { apiUsers } from "@/lib/api/users/apiUsers";
import { Form, Formik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

const ContactForm = () => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Debes ingresar un nombre"),
    lastname: Yup.string().required("Debes ingresar un apellido"),
    email: Yup.string().required("Debes ingresar un email"),
    phone: Yup.string()
      .required("Debes ingresar un número de teléfono")
      .matches(/^\+[0-9]{1,3}[-]?[0-9]{3}[-]?[0-9]{3}-?[0-9]{4}$/, {
        message: "Número de telefono debe ser de formato: +51943944312",
      }),
    description: Yup.string()
      .required("Debes ingresar una descripción")
      .min(10, "Debes ingresar una descripción mayor a 10 caracteres"),
  });

  const handleSubmit = async (
    values: any,
    { setSubmitting, resetForm }: any
  ) => {
    const promise = apiUsers.contactMessage(values);
    toast.promise(promise, {
      pending: "Enviando...",
      success: "¡Gracias por tu mensaje! Te contáctaremos en breve.",
      error: "Ha ocurrido un error al enviar tu mensaje",
    });
    setSubmitting(false);
    resetForm();
  };

  return (
    <Formik
      initialValues={{
        name: "",
        lastname: "",
        email: "",
        phone: "",
        description: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, dirty, isValid }) => (
        <Form className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <InputLabel htmlFor="name">Nombre</InputLabel>
            <FieldValidate type="text" name="name" placeholder="Nombre" />
          </div>
          <div className="space-y-2">
            <InputLabel htmlFor="lastname">Apellido</InputLabel>
            <FieldValidate type="text" name="lastname" placeholder="Apellido" />
          </div>
          <div className="space-y-2">
            <InputLabel htmlFor="email">Correo electrónico</InputLabel>
            <FieldValidate
              type="text"
              name="email"
              placeholder="correo@mail.com"
            />
          </div>
          <div className="space-y-2">
            <InputLabel htmlFor="phone">Teléfono</InputLabel>
            <FieldValidate
              type="text"
              name="phone"
              placeholder="+51999999999"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <InputLabel htmlFor="description">Mensaje</InputLabel>
            <FieldValidate
              as="textarea"
              type="text"
              name="description"
              placeholder="Escribe aquí tu mensaje"
            />
          </div>
          <div>
            <Button
              variant="primary"
              type="submit"
              disabled={isSubmitting || !dirty || !isValid}
            >
              Guardar cambios
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export { ContactForm };
