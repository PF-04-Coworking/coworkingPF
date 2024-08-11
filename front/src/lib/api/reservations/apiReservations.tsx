import { IFullReservation } from "@/types/types";
import { axiosClient } from "../apiConfig";

const apiReservations = {
  getAllReservations: async (authToken: string, searchTerm: string) => {
    return await axiosClient.get("/reservations", {
      params: {
        search: searchTerm,
      },
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  },

  updateReservation: async (
    authToken: string,
    id: string,
    data: Partial<IFullReservation>
  ) => {
    return await axiosClient.put(`/reservations/${id}`, data, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  },
};

export { apiReservations };
