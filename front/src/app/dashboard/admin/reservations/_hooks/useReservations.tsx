import { useAuthStore } from "@/app/(auth)/stores/useAuthStore";
import { apiReservations } from "@/lib/api/reservations/apiReservations";
import { useEffect, useState } from "react";

const useReservations = () => {
  const [reservations, setReservations] = useState([]);
  const { authToken } = useAuthStore();

  useEffect(() => {
    const fetchReservations = async () => {
      if (!authToken) return;
      try {
        const response = await apiReservations.getAllReservations(authToken);
        console.log(response);
        setReservations(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchReservations();
  }, [authToken]);

  return { reservations };
};

export { useReservations };
