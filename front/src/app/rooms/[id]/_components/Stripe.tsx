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
} from "../../../../components/common/Dialogx";
import { Button } from "@/components/common/Button";
import { DateRange } from "react-day-picker";
import { IOfficeStripe } from "@/types/types";
import CheckoutForm from "./FormStripe";
import useStripeLogic from "../../hooks/useStripeLogic";
import { Heading } from "@/components/common/Heading";
import { Paragraph } from "@/components/common/Paragraph";

const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC;

if (!stripePublicKey) {
  throw new Error("Stripe public key no encontrado");
}

const stripePromise = loadStripe(stripePublicKey);

const Stripe = ({
  selectedRange,
  officeParams,
  children,
}: {
  selectedRange: DateRange | undefined;
  officeParams: IOfficeStripe;
  children: React.ReactNode;
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
            {children}
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-background border-secondaryDark text-white space-y-8">
          <DialogHeader>
            <DialogTitle className="text-primary text-xl">
              <Heading level="3">Confirma tu reserva</Heading>
            </DialogTitle>
            <DialogDescription className="text-white">
              <Paragraph variant="secondary">
                Llena y confirma cuantas personas asistirán, completa el
                formulario de pago para poder confirmar tu reserva.
              </Paragraph>
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-between">
            <Paragraph variant="primary">{selectedText}</Paragraph>
            <Paragraph
              variant="primary"
              className="!text-primary font-semibold"
            >
              Precio total: USD ${Price}
            </Paragraph>
          </div>
          <Elements stripe={stripePromise}>
            <CheckoutForm
              price={Price}
              officeParams={officeParams}
              selectedRange={selectedRange}
            />
          </Elements>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default Stripe;
