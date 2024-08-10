import { axiosClient } from "../apiConfig";

const apiReservations = {
  getAllReservations: async (authToken: string) => {
    return await axiosClient.get("/reservations", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  },
};

export { apiReservations };
