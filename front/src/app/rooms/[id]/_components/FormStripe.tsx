import {
  CardElement,
} from "@stripe/react-stripe-js";
import { Button } from "@/components/common/Button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { IOfficeStripe } from "@/types/types";
import { DateRange } from "react-day-picker";
import { cardElementOptions, validationSchema } from "@/lib/utils/paymentUtils";
import { usePayment } from "../../hooks/usePayment";


const CheckoutForm = ({
  price,
  officeParams,
  selectedRange,
}: {
  price: number;
  officeParams: IOfficeStripe;
  selectedRange: DateRange | undefined;
}) => {

  const { handleSubmit } = usePayment();

  return (
    <Formik
      initialValues={{
        guests: 1,
      }}
      validationSchema={validationSchema(officeParams.capacity)}
      onSubmit={(values, { setSubmitting }) => {
        handleSubmit(values, price, officeParams, selectedRange);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="grid gap-4 mb-6">
            <label htmlFor="guests">Número de invitados (máximo {officeParams.capacity})</label>
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
              className="rounded-md py-3 px-3 text-sm w-full bg-inherit border focus:outline-none border-primary"
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
