import { Button } from "@/components/common/Button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../../../components/common/Sheet";
import { DayPicker, DateRange, getDefaultClassNames } from "react-day-picker";
import "react-day-picker/style.css";
import { useState } from "react";
import Stripe from "./Stripe";

const ModalCalendar = () => {
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(
    undefined
  );

  const defaultClassNames = getDefaultClassNames();

  let footerText = "Por favor, selecciona un día.";
  if (selectedRange) {
    if (selectedRange.from && !selectedRange.to) {
      footerText = `Fecha: ${selectedRange.from.toLocaleDateString()}`;
    } else if (selectedRange.from && selectedRange.to) {
      footerText = `Fechas: ${selectedRange.from.toLocaleDateString()} - ${selectedRange.to.toLocaleDateString()}`;
    }
  }
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="primary">Reservar ahora</Button>
      </SheetTrigger>
      <SheetContent className="bg-background border-primary text-white pt-20">
        <SheetHeader>
          <SheetTitle className="text-primary text-xl text-center">
            Selecciona los días de tu reserva
          </SheetTitle>
          <SheetDescription className="text-white text-lg pb-20 text-center">
            Ten en cuenta que podrás reservar 3 días seguidos como maximo, si no
            lo deseas puedes seleccionar solo un día.
          </SheetDescription>
        </SheetHeader>

        <DayPicker
          mode="range"
          min={1}
          max={2}
          selected={selectedRange}
          onSelect={setSelectedRange}
          disabled={{ before: new Date() }}
          footer={
            <p className="text-center mt-10 border-primary border p-1 rounded-md">{footerText}</p>
          }
          classNames={{
            today: `border-amber-500`, // Add a border to today's date
            selected: `bg-primary text-white rounded-3xl`, // Highlight the selected day
            chevron: `${defaultClassNames.chevron} !fill-amber-500`, // Change the color of the chevron
            disabled: `bg-secondaryDark text-secondary`,
            month_caption: `text-center mb-5`,
            range_start: `rounded-tr-none rounded-br-none`,
            range_end: `rounded-tl-none rounded-bl-none`,
            range_middle: ` rounded-none`,
          }}
        />

        <SheetFooter className="mt-20">
          <SheetClose asChild>
            <Stripe/>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default ModalCalendar;
