import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../components/common/Dialog";
import { Button } from "@/components/common/Button";
import { DateRange } from "react-day-picker";
import { IOfficeStripe } from "@/types/types";
import CheckoutForm from "./FormStripe";
import useStripeLogic from "../../hooks/useStripeLogic";

const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC;

if (!stripePublicKey) {
  throw new Error("Stripe public key no encontrado");
}

const stripePromise = loadStripe(stripePublicKey);

const Stripe = ({
  selectedRange,
  officeParams,
}: {
  selectedRange: DateRange | undefined;
  officeParams: IOfficeStripe;
}) => {
  const { Price, selectedText, handleToken } = useStripeLogic(
    selectedRange,
    officeParams
  );

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="primary"
            className="w-full"
            onClick={handleToken}
            disabled={!selectedRange}
          >
            Confirmar reserva
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[525px] bg-background border border-primary text-white">
          <DialogHeader>
            <DialogTitle className="text-primary text-xl text-center">
              Confirma tu reserva
            </DialogTitle>
            <DialogDescription className="text-white text-center">
              Llena y confirma cuantas personas asistirán, completa el
              formulario de pago para poder confirmar tu reserva.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex justify-between">
              <p>{selectedText}</p>
              <p className="text-primary font-semibold">
                Precio total: USD ${Price}
              </p>
            </div>
            <Elements stripe={stripePromise}>
              <CheckoutForm
                price={Price}
                officeParams={officeParams}
                selectedRange={selectedRange}
              />
            </Elements>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default Stripe;
