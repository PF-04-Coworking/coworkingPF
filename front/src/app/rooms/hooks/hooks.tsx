import { useEffect } from "react";
import axios from "axios";
import useOfficesRoomsStore from "../_store/storeFilterOffice";

//build para pasar correctamente los query params
const buildURLWithParams = (baseURL: string, params: any, extraParams: any) => {
  const url = new URL(baseURL);
  const combinedParams = { ...params, ...extraParams };

  Object.keys(combinedParams).forEach((key) => {
    if (Array.isArray(combinedParams[key])) {
      combinedParams[key].forEach((value) =>
        url.searchParams.append(key, value)
      );
    } else {
      url.searchParams.append(key, combinedParams[key]);
    }
  });
  return url.toString();
};

//fetch para filtrar los oficinas por query params
export const useFetchFilteredOffices = (
  filters: any,
  page: number = 1,
  limit: number = 100
) => {
  const { setStoredOffices } = useOfficesRoomsStore();

  useEffect(() => {
    const fetchFilteredOffices = async () => {
      try {
        const baseURL = "http://localhost:3000/offices";
        const urlWithParams = buildURLWithParams(baseURL, filters, {
          page,
          limit,
        });
        const response = await axios.get(urlWithParams);
        setStoredOffices(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFilteredOffices();
  }, [filters, setStoredOffices]);
};

//fetch para obtener todos los oficinas
export const useFetchAllOffices = () => {
  const { setStoredOffices } = useOfficesRoomsStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/offices", {
          params: {
            page: 1,
            limit: 100,
          },
        });
        setStoredOffices(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [setStoredOffices]);
};
