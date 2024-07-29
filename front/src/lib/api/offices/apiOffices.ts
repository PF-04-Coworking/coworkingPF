import { axiosClient } from "../apiConfig";

const apiOffices = {
  getOffices: async () => {
    const response = await axiosClient.get("/offices", {
      params: {
        page: 1,
        limit: 100,
      },
    });
    return response.data;
  },

  createOffice: async (data: any) => {
    console.log(data);
    for (let [key, value] of data.entries()) {
      console.log(`${key}: ${value}`);
    }
    const response = await axiosClient.post("/offices", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  updateOffice: async (officeId: string, data: any) => {
    const response = await axiosClient.put(`/offices/${officeId}`, data);
    return response.data;
  },

  deleteOffice: async (officeId: string) => {
    const response = await axiosClient.delete(`/offices/${officeId}`);
    return response.data;
  },
};

export { apiOffices };
