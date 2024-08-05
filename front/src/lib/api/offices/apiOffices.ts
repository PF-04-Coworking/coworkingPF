import { IFilters } from "@/app/rooms/types";
import { axiosClient } from "../apiConfig";

const apiOffices = {
  getOffices: async (filters?: IFilters) => {
    const response = await axiosClient.get("/offices", {
      params: {
        page: 1,
        limit: 100,
        ...(filters && {
          services: filters.services.join(","),
          location: filters.location.join(","),
        }),
      },
    });
    return response.data;
  },

  createOffice: async (data: any, authToken: string) => {
    const response = await axiosClient.post("/offices", data, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  updateOffice: async (officeId: string, data: any, authToken: string) => {
    const response = await axiosClient.put(`/offices/${officeId}`, data, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  deleteOffice: async (officeId: string, authToken: string) => {
    const response = await axiosClient.delete(`/offices/${officeId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  },
};

export { apiOffices };
