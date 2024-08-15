// utils para el componente de calendario
import { DateRange } from "react-day-picker";

// devuelve el texto de las fechas seleccionadas

export const selectedDates = (selectedRange: DateRange | undefined): string => {
  if (!selectedRange || !selectedRange.from) {
    return "Por favor, selecciona un día.";
  }
  const { from, to } = selectedRange;
  if (from && !to) {
    return `Reservar ${from.toLocaleDateString()}`;
  }
  if (from && to) {
    return `Reservar ${from.toLocaleDateString()} - ${to.toLocaleDateString()}`;
  }
  return "Por favor, selecciona un día.";
};

// cambia la fecha a una fecha con formato YMD (año, mes, día)

export const convertToYMD = (date: Date) => {
  return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
};

// convierte las fechas de reservas a objetos Date

export const getDisabledDays = (
  reservations: { start_day: string; end_day: string }[]
) => {
  return reservations.map((reservation) => ({
    from: new Date(reservation.start_day),
    to: new Date(reservation.end_day),
  }));
};

const utcDateFormatter = (utcDate: string | Date): string => {
  const date = new Date(utcDate);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const stringToDate = (date: string | Date): Date => {
  if (typeof date === "string") {
    const [day, month, year] = date.split("/").map(Number);
    return new Date(year, month - 1, day);
  } else {
    return date;
  }
};

export { utcDateFormatter, stringToDate };
