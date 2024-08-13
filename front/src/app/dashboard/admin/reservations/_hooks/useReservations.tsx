import { useAuthStore } from "@/app/(auth)/stores/useAuthStore";
import { apiReservations } from "@/lib/api/reservations/apiReservations";
import { IFullReservation } from "@/types/types";
import { useEffect, useState } from "react";
import { useReservationsStore } from "../_stores/useReservationsStore";

const useReservations = ({ searchTerm }: { searchTerm: string }) => {
  const { reservations, setReservations } = useReservationsStore();
  const { authToken } = useAuthStore();

  useEffect(() => {
    const fetchReservations = async () => {
      if (!authToken) return;
      try {
        const response = await apiReservations.getAllReservations(
          authToken,
          searchTerm
        );
        setReservations(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchReservations();
  }, [authToken, searchTerm, setReservations]);

  return { reservations };
};

export { useReservations };
