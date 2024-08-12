import { useAuthStore } from "@/app/(auth)/stores/useAuthStore";
import { apiReservations } from "@/lib/api/reservations/apiReservations";
import { IFullReservation } from "@/types/types";
import { useEffect, useState } from "react";

const useReservations = ({ searchTerm }: { searchTerm: string }) => {
  const [reservations, setReservations] = useState<IFullReservation[]>([]);
  const { authToken } = useAuthStore();

  useEffect(() => {
    const fetchReservations = async () => {
      if (!authToken) return;
      try {
        const response = await apiReservations.getAllReservations(
          authToken,
          searchTerm
        );
        console.log(response);
        setReservations(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchReservations();
  }, [authToken, searchTerm]);

  return { reservations };
};

export { useReservations };
