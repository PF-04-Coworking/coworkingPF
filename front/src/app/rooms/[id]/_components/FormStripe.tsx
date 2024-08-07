import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button } from "@/components/common/Button";
import { useAuthStore } from "@/app/(auth)/stores/useAuthStore";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import axios from "axios";
import { IOfficeStripe } from "@/types/types";
import { DateRange } from "react-day-picker";
import { useEffect } from "react";
import { axiosClient } from "@/lib/api/apiConfig";

interface FormValues {
  guests: number;
}

const CheckoutForm = ({
  price,
  officeParams,
  selectedRange,
}: {
  price: number;
  officeParams: IOfficeStripe;
  selectedRange: DateRange | undefined;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const userData = useAuthStore();

  const validationSchema = Yup.object({
    guests: Yup.number().required("Introduce el número de huéspedes"),
  });

  const handleSubmit = async (values: FormValues) => {
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      return;
    }

    const result = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: {
        name: userData.userData?.name,
        email: userData.userData?.email,
        phone: userData.userData?.phone,
      },
    });

    if (result.error) {
      console.error(result.error.message);
    } else {
      console.log("Payment method created:", result.paymentMethod);
    }
  };

  const { authToken } = useAuthStore();

  const handleReservation = async (values: FormValues) => {
    if (selectedRange?.from && selectedRange?.to) {
      const startDate = selectedRange.from.toISOString().split("T")[0];
      const endDate = selectedRange.to.toISOString().split("T")[0];

      const requestData = {
        start_day: startDate,
        end_day: endDate,
        guests_number: values.guests,
        amount: price,
        office: officeParams.id,
        user: userData.userData?.id,
      };

      try {
        const reservation = await axiosClient.post(
          `/user/${userData.userData?.id}/reservations/new`,
          requestData,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (reservation.status === 201) {
          toast.success("Reserva creada exitosamente");
        } else {
          toast.error("Error al crear la reserva");
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          console.error("Error status:", error.response.status);
          console.error("Error data:", error.response.data);
          toast.error("Error al crear la reserva");
        } else {
          toast.error("Error al crear la reserva");
        }
      }

      console.log(requestData); // Ejemplo de cómo se vería el objeto
    } else {
      toast.error("Por favor selecciona un rango de fechas válido");
    }
  };

  const cardElementOptions = {
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

  return (
    <Formik
      initialValues={{
        guests: 1,
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        handleReservation(values);
        handleSubmit(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="grid gap-4 mb-6">
            <label htmlFor="guests">Número de huéspedes</label>
            <Field
              id="guests"
              name="guests"
              type="number"
              className="rounded-md py-3 px-3 mb-1 text-sm w-full bg-inherit text-white border focus:outline-none border-primary"
            />
            <ErrorMessage
              name="guests"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
          <div className="grid gap-4 mb-6">
            <label htmlFor="name">Tarjeta de crédito o débito</label>
            <CardElement
              className="rounded-md py-3 px-3 text-sm w-full bg-inherit !text-white border focus:outline-none border-primary"
              options={cardElementOptions}
            />
          </div>
          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={isSubmitting}
          >
            Confirmar pago
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default CheckoutForm;
