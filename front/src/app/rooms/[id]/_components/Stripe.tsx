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
} from "../../../../components/common/dialog";
import { Button } from "@/components/common/Button";
import { useAuthStore } from "@/app/(auth)/stores/useAuthStore";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { DateRange } from "react-day-picker";
import { selectedDates } from "./ModalCalendar";
import { IOfficeStripe } from "@/types/types";
import CheckoutForm from "./FormStripe";
import { useEffect, useState } from "react";

const stripePromise = loadStripe(
  "pk_test_51PjNriFOrepWZ951sCAoM84bnpXcImLS7UaD5bKdb3Bc5J9uTGok241gZ9Dz8VgC0DPPWsxXbkBzrqwkrrLKPjop00lN2nR2M3"
);

const Stripe = ({
  selectedRange,
  officeParams,
}: {
  selectedRange: DateRange | undefined;
  officeParams: IOfficeStripe;
}) => {
  const { authToken } = useAuthStore();
  const router = useRouter();

  const [Price, setPrice] = useState(0);

  useEffect(() => {
    const calcutePrice = () => {
      if (selectedRange && selectedRange.from && selectedRange.to) {
        setPrice(officeParams.price * 2);
      } else {
        setPrice(officeParams.price);
      }
    };

    calcutePrice();
  }, [selectedRange, officeParams]);

  const handleToken = () => {
    if (!authToken) {
      toast.error("Debes iniciar sesión para seguir con la reserva");
      router.push("/login");
    }
  };

  const selectedText = selectedDates(selectedRange);
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
