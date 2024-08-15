"use client";

import React from "react";
import { Formik, Form, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { InputLabel } from "@/components/common/InputLabel";
import { FieldValidate } from "@/components/common/FieldValidate";
import { Button } from "@/components/common/Button";
import { useAuthStore } from "@/app/(auth)/stores/useAuthStore";
import { apiUsers } from "@/lib/api/users/apiUsers";
import { toast } from "react-toastify";

const EditProfileForm = () => {
  const { authToken, userData, setUserData } = useAuthStore();

  const validationSchema = Yup.object({
    name: Yup.string().required("Debes ingresar un nombre"),
    lastname: Yup.string().required("Debes ingresar un apellido"),
    phone: Yup.string()
      .required("Debes ingresar un número de teléfono")
      .matches(/^(\+?\d{1,3}-?)\s*\d{6,14}\s*$/, {
        message: "Número de telefono debe ser de formato: +51 943944312",
      }),
    country: Yup.string()
      .required("Debes ingresar un país")
      .min(2, "Debes ingresar al menos 3 caracteres"),
    city: Yup.string()
      .required("Debes ingresar una ciudad")
      .min(2, "Debes ingresar al menos 2 caracteres"),
    age: Yup.number()
      .required("Debes ingresar una edad")
      .min(18, "Debes ingresar al menos 18 años")
      .max(100, "Debes ingresar menos de 100 años"),
  });

  const handleSubmit = async (
    values: any,
    { setSubmitting, resetForm }: any
  ) => {
    if (!userData || !authToken) return;
    const promise = apiUsers.updateUser(userData.id, values, authToken);
    toast.promise(promise, {
      pending: "Actualizando...",
      success: "Datos actualizados",
      error: "Datos incorrectos",
    });
    const newUserData = await promise;
    setUserData(newUserData);
    setSubmitting(false);
    resetForm({ values });
  };

  if (!userData) return null;

  return (
    <Formik
      initialValues={{
        name: userData.name || "",
        lastname: userData.lastname || "",
        phone: userData.phone || "",
        email: userData.email || "",
        age: userData.age || "",
        country: userData.country || "",
        city: userData.city || "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, dirty }) => (
        <Form>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-[700px] mx-auto">
            <div className="space-y-2">
              <InputLabel htmlFor="name">Nombre</InputLabel>
              <FieldValidate type="text" name="name" placeholder="" />
            </div>

            <div className="space-y-2">
              <InputLabel htmlFor="lastname">Apellido</InputLabel>
              <FieldValidate type="text" name="lastname" placeholder="" />
            </div>

            <div className="space-y-2">
              <InputLabel htmlFor="phone">Teléfono</InputLabel>
              <FieldValidate type="text" name="phone" placeholder="" />
            </div>

            <div className="space-y-2">
              <InputLabel htmlFor="age">Edad</InputLabel>
              <FieldValidate type="number" name="age" placeholder="" />
            </div>

            <div className="space-y-2">
              <InputLabel htmlFor="country">País</InputLabel>
              <FieldValidate type="text" name="country" placeholder="" />
            </div>

            <div className="space-y-2">
              <InputLabel htmlFor="city">Ciudad</InputLabel>
              <FieldValidate type="text" name="city" placeholder="" />
            </div>
          </div>

          <div className="flex justify-center mt-16">
            <Button
              variant="primary"
              type="submit"
              disabled={isSubmitting || !dirty}
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
