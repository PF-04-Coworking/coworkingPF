import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../components/common/dialog";
import { Button } from "@/components/common/Button";
const stripePromise = loadStripe(
  "pk_test_51PjNriFOrepWZ951sCAoM84bnpXcImLS7UaD5bKdb3Bc5J9uTGok241gZ9Dz8VgC0DPPWsxXbkBzrqwkrrLKPjop00lN2nR2M3"
);

const CheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      //Stripe.js aún no se ha cargado.
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      // Card element no encontrado.
      return;
    }

    const result = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (result.error) {
      // Handle error.
      console.error(result.error.message);
    } else {
      // Handle success.
      console.log("Payment method created:", result.paymentMethod);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement />

        <Button type="submit" variant="primary">
          Pagar
        </Button>
      </form>
    </>
  );
};

const Stripe = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="primary">Confirmar reserva</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirma tu reserva</DialogTitle>
            <DialogDescription>
              Realiza el pago completo para poder confirmar tu reserva.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Elements stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default Stripe;
