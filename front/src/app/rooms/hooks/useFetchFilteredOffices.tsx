import { useEffect } from "react";
import { useOfficesRoomsStore } from "../_store/useStoreFilterOffice";
import { apiOffices } from "@/lib/api/offices/apiOffices";

export const useFetchFilteredOffices = (
  filters: any,
  page: number = 1,
  limit: number = 100
) => {
  const { setStoredOffices } = useOfficesRoomsStore();

  useEffect(() => {
    const fetchFilteredOffices = async () => {
      try {
        const response = await apiOffices.getOffices({
          services: filters.services,
          location: filters.location,
        });
        setStoredOffices(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFilteredOffices();
  }, [filters, setStoredOffices]);
};
