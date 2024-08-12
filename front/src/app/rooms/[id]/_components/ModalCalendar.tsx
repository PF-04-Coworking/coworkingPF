"use client";

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
import {
  selectedDates,
  convertToYMD,
  getDisabledDays,
} from "@/lib/utils/dateUtils";
import { Heading } from "@/components/common/Heading";
import { Paragraph } from "@/components/common/Paragraph";

const ModalCalendar = ({ officeParams }: { officeParams: IOfficeStripe }) => {
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(
    undefined
  );
  const reservations = officeParams.reservations;
  const disabledDays: DateRange[] = getDisabledDays(reservations);

  const normalizedDisabledDays = disabledDays.map(({ from, to }) => ({
    from: from ? convertToYMD(from) : undefined,
    to: to ? convertToYMD(to) : undefined,
  }));

  const today = new Date();
  const disabledDaysConfig = [
    ...normalizedDisabledDays,
    { before: convertToYMD(today) },
  ];

  const defaultClassNames = getDefaultClassNames();
  const selectedText = selectedDates(selectedRange);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="primary" className="w-full lg:w-auto">
          Reservar oficina | US$ {officeParams.price} por día
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-background border-background text-white px-8 pt-16 w-min">
        <SheetHeader>
          <SheetTitle>
            <Heading level="3">Selecciona los días de tu reserva</Heading>
          </SheetTitle>
          <SheetDescription className="text-white pb-10">
            <Paragraph variant="secondary">
              Ten en cuenta que solo podrás reservar 2 días seguidos como
              maximo. Si deseas reservar más días debarás hacerlo en otra
              reserva.
            </Paragraph>
          </SheetDescription>
        </SheetHeader>

        <DayPicker
          mode="range"
          locale={es}
          min={1}
          max={1}
          selected={selectedRange}
          onSelect={setSelectedRange}
          disabled={disabledDaysConfig}
          classNames={{
            today: `border-amber-500`,
            selected: `bg-primary text-white rounded-full`,
            chevron: `${defaultClassNames.chevron} !fill-amber-500`,
            disabled: `bg-secondaryDark/30 text-secondary`,
            range_start: `rounded-tr-none rounded-br-none`,
            range_end: `rounded-tl-none rounded-bl-none`,
            range_middle: ` rounded-none`,
          }}
        />

        <SheetFooter className="mt-12">
          <SheetClose asChild>
            <Stripe selectedRange={selectedRange} officeParams={officeParams}>
              {selectedText}
            </Stripe>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default ModalCalendar;
