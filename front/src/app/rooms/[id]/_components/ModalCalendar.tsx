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
import { IOfficeStripe } from "@/types/types";
import { es } from "date-fns/locale";

export const selectedDates = (selectedRange: DateRange | undefined): string => {
  if (!selectedRange || !selectedRange.from) {
    return "Por favor, selecciona un día.";
  }
  const { from, to } = selectedRange;
  if (from && !to) {
    return `Fecha: ${from.toLocaleDateString()}`;
  }
  if (from && to) {
    return `Fechas: ${from.toLocaleDateString()} - ${to.toLocaleDateString()}`;
  }
  return "Por favor, selecciona un día.";
};

const ModalCalendar = ( { officeParams }: { officeParams: IOfficeStripe }) => {
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(
    undefined
  );
  const defaultClassNames = getDefaultClassNames();
  const selectedText = selectedDates(selectedRange);

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
          <SheetDescription className="text-white pb-10 text-center">
            Ten en cuenta que solo podrás reservar 2 días seguidos como maximo.
            Si deseas reservar más días debarás hacerlo en otra reserva.
          </SheetDescription>
        </SheetHeader>

        <DayPicker
          mode="range"
          locale={es}
          min={1}
          max={1}
          selected={selectedRange}
          onSelect={setSelectedRange}
          disabled={{ before: new Date() }}
          footer={
            <p className="text-center mt-10 border-primary border p-1 rounded-md">
              {selectedText}
            </p>
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
            <Stripe selectedRange={selectedRange} officeParams={officeParams} />
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default ModalCalendar;
