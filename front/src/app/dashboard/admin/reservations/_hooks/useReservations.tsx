import { useAuthStore } from "@/app/(auth)/stores/useAuthStore";
import { apiReservations } from "@/lib/api/reservations/apiReservations";
import { useEffect, useState } from "react";

const useReservations = () => {
  const [reservations, setReservations] = useState([]);
  const { authToken } = useAuthStore();

  useEffect(() => {
    const fetchReservations = async () => {
      if (!authToken) return;
      const response = await apiReservations.getAllReservations(authToken);
      setReservations(response.data);
    };

    fetchReservations();
  }, []);

  return { reservations };
};

export { useReservations };
