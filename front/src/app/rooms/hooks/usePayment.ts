import { useStripe, useElements } from "@stripe/react-stripe-js";
import {toast} from "react-toastify";
import { FormValues, IOfficeStripe } from "@/types/types";
import { DateRange } from "react-day-picker";
import { axiosClient } from "@/lib/api/apiConfig";
import { useAuthStore } from "@/app/(auth)/stores/useAuthStore";
import { CardElement } from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";


export const usePayment = () => {
    const router = useRouter();
    const stripe = useStripe();
    const elements = useElements();
    const { authToken, userData } = useAuthStore();
  
    const handleSubmit = async (
      values: FormValues,
      price: number,
      officeParams: IOfficeStripe,
      selectedRange: DateRange | undefined
    ) => {
      if (!stripe || !elements) return;
  
      const cardElement = elements.getElement(CardElement);
  
      if (!cardElement) return;
  
      const processPayment = async () => {
        const result = await stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
          billing_details: {
            name: userData?.name,
            email: userData?.email,
            phone: userData?.phone,
          },
        });
  
        if (result.error) {
          throw new Error("Error creando el método de pago");
        }
  
        const priceInCents = price * 100;
  
        const paymentIntentResponse = await axiosClient.post(
          "/payments/create-payment-intent",
          {
            amount: priceInCents,
            payment_method: result.paymentMethod?.id,
            currency: "usd",
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );
  
        const { clientSecret } = paymentIntentResponse.data;
  
        const confirmResult = await stripe.confirmCardPayment(clientSecret);
  
        if (confirmResult.error) {
          throw new Error("Error confirmando el pago");
        } else if (confirmResult.paymentIntent?.status === "succeeded") {
          await handleReservation(values, priceInCents, officeParams, selectedRange);
        } else {
          throw new Error("El pago no se completó");
        }
      };
  
      toast.promise(
        processPayment(),
        {
          pending: 'Procesando el pago...',
          success: '¡Pago realizado y reserva creada!',
          error: 'Error en el proceso de pago',
        }
      );
    };
  
    const handleReservation = async (
      values: FormValues,
      price: number,
      officeParams: IOfficeStripe,
      selectedRange: DateRange | undefined
    ) => {
      if (selectedRange?.from) {
        const startDate = selectedRange.from.toISOString().split("T")[0];
        const endDate = selectedRange.to
          ? selectedRange.to.toISOString().split("T")[0]
          : startDate;
  
        const requestData = {
          start_day: startDate,
          end_day: endDate,
          guests_number: values.guests,
          amount: price,
          office_id: officeParams.id,
          user: userData?.id,
        };
  
        const reservation = await axiosClient.post(
          `/user/${userData?.id}/reservations/new`,
          requestData,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );
  
        if (reservation.status === 201) {
        //   router.push("/reservaions")
        } else {
          throw new Error('Error al crear la reserva'); 
        }
      }
    };
  
    return { handleSubmit };
  };