import { axiosClient } from "../apiConfig";

const apiOffices = {
  getOffices: async () => {
    const response = await axiosClient.get("/offices");
    return response.data;
  },

  createOffice: async (data: any) => {
    const response = await axiosClient.post("/offices", data);
    return response.data;
  },
};

export { apiOffices };
