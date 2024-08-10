// hooks/useStripeLogic.ts
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DateRange } from "react-day-picker";
import { useAuthStore } from "@/app/(auth)/stores/useAuthStore"; 
import { IOfficeStripe } from "@/types/types";
import { toast } from "react-toastify";
import { selectedDates } from "@/lib/utils/dateUtils"; 

const useStripeLogic = (selectedRange: DateRange | undefined, officeParams: IOfficeStripe) => {
  const { authToken } = useAuthStore();
  const router = useRouter();
  const [Price, setPrice] = useState(0);
  const selectedText = selectedDates(selectedRange);

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

  return {
    Price,
    selectedText,
    handleToken,
  };
};

export default useStripeLogic;