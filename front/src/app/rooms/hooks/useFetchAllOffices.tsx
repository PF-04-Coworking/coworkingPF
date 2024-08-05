import { useEffect } from "react";
import { useOfficesRoomsStore } from "../_store/useStoreFilterOffice";
import { apiOffices } from "@/lib/api/offices/apiOffices";

const useFetchAllOffices = () => {
  const { setStoredOffices } = useOfficesRoomsStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiOffices.getOffices();
        console.log("response officessss", response);
        setStoredOffices(response);
      } catch (error) {
        setStoredOffices([]);
        console.error(error);
      }
    };

    fetchData();
  }, [setStoredOffices]);
};

export { useFetchAllOffices };
