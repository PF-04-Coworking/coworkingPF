import { apiOffices } from "@/lib/api/offices/apiOffices";
import { useEffect, useState } from "react";
import { useOfficesStore } from "../../_stores/useOfficesStore";

const useOffices = () => {
  const { offices, setStoredOffices } = useOfficesStore();

  useEffect(() => {
    const fetchOffices = async () => {
      try {
        const data = await apiOffices.getOffices();
        setStoredOffices(data);
      } catch (error) {
        console.log(error);
        setStoredOffices([]);
      }
    };
    fetchOffices();
  }, []);

  return { offices };
};

export default useOffices;
