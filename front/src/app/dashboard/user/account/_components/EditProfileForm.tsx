"use client";

import React from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { InputLabel } from "@/components/common/InputLabel";
import { FieldValidate } from "@/components/common/FieldValidate";
import { Button } from "@/components/common/Button";

const EditProfileForm = () => {
  const validationSchema = Yup.object({
    name: Yup.string().required("Debes ingresar un nombre"),
    lastName: Yup.string().required("Debes ingresar un apellido"),
    phoneNumber: Yup.string()
      .required("Debes ingresar un número de teléfono")
      .matches(/^[0-9]+$/, "Número de teléfono unválido")
      .min(10, "Debes ingresar al menos 7 dígitos")
      .max(10, "No debes ingresar más de 15 dígitos")
      .required("Debes ingresar un número de teléfono"),
    country: Yup.string()
      .required("Debes ingresar un país")
      .min(2, "Debes ingresar al menos 3 caracteres")
      .max(2, "Debes ingresar al menos 3 caracteres"),
    city: Yup.string()
      .required("Debes ingresar una ciudad")
      .min(2, "Debes ingresar al menos 2 caracteres")
      .max(2, "Debes ingresar al menos 2 caracteres"),
    age: Yup.number()
      .required("Debes ingresar una edad")
      .min(18, "Debes ingresar al menos 18 años")
      .max(100, "Debes ingresar menos de 100 años"),
  });

  return (
    <Formik
      initialValues={{ name: "", lastName: "", phoneNumber: "", email: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values);
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting, dirty }) => (
        <Form>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-[700px] mx-auto">
            <div className="space-y-2">
              <InputLabel htmlFor="name">Nombre</InputLabel>
              <FieldValidate type="text" name="name" placeholder="" />
            </div>

            <div className="space-y-2">
              <InputLabel htmlFor="lastName">Apellido</InputLabel>
              <FieldValidate type="text" name="lastName" placeholder="" />
            </div>

            <div className="space-y-2">
              <InputLabel htmlFor="phoneNumber">Teléfono</InputLabel>
              <FieldValidate type="text" name="phoneNumber" placeholder="" />
            </div>

            <div className="space-y-2">
              <InputLabel htmlFor="age">Edad</InputLabel>
              <FieldValidate type="text" name="email" placeholder="" />
            </div>

            <div className="space-y-2">
              <InputLabel htmlFor="country">País</InputLabel>
              <FieldValidate type="text" name="email" placeholder="" />
            </div>

            <div className="space-y-2">
              <InputLabel htmlFor="city">Ciudad</InputLabel>
              <FieldValidate type="text" name="email" placeholder="" />
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              variant="primary"
              type="submit"
              disabled={isSubmitting || !dirty}
              className="mt-12"
            >
              Guardar cambios
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export { EditProfileForm };
