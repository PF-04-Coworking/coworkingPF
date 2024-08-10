// utils para el componente de calendario
import { DateRange } from "react-day-picker";

// devuelve el texto de las fechas seleccionadas

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

// cambia la fecha a una fecha con formato YMD (año, mes, día)

export const convertToYMD = (date: Date) => {
  return new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate()
  );
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