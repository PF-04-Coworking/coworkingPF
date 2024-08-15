import { useEffect, useRef } from "react";
import { apiOffices } from "@/lib/api/offices/apiOffices";
import { useOfficesStore } from "../stores/useOfficesStore";
import { IPaginationObject } from "@/types/types";
import { IFilters } from "@/app/rooms/types";

const useOffices = ({
  page,
  limit,
  services,
  location,
}: IPaginationObject & IFilters) => {
  const { offices, setStoredOffices } = useOfficesStore();

  console.log("OFFICES", offices);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiOffices.getOffices({
          page,
          limit,
          services,
          location,
        });
        setStoredOffices(response.data);
      } catch (error) {
        setStoredOffices([]);
        console.error(error);
      }
    };

    fetchData();
  }, [page, limit, services, location, setStoredOffices]);

  return { offices };
};

export { useOffices };
