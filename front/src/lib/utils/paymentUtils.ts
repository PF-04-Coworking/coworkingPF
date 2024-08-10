import * as Yup from "yup";

export const cardElementOptions = {
  style: {
    base: {
      fontSize: "16px",
      color: "#ffffff",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
    },
  },
  placeholder: "Número de tarjeta",
};

export const validationSchema = (capacity: number) => {
  return Yup.object().shape({
    guests: Yup.number()
      .min(1, `Debes elegir al menos 1 invitado`)
      .max(capacity, `El número máximo de invitados es ${capacity}`)
      .required("Debes elegir un número de invitados"),
  });
};