import { create } from "zustand";
import { IFullReservation } from "@/types/types";

interface IReservationsStore {
  reservations: IFullReservation[];
  setReservations: (reservations: IFullReservation[]) => void;
  updateReservation: (
    id: string,
    updatedValues: Partial<IFullReservation>
  ) => void;
}

const useReservationsStore = create<IReservationsStore>((set) => ({
  reservations: [],
  setReservations: (reservations: IFullReservation[]) => set({ reservations }),
  updateReservation: (id: string, updatedValues: Partial<IFullReservation>) =>
    set((state) => {
      const updatedReservations = state.reservations.map((reservation) =>
        reservation.id === id
          ? { ...reservation, ...updatedValues }
          : reservation
      );
      return { reservations: updatedReservations };
    }),
}));

export { useReservationsStore };
