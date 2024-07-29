import { axiosClient } from "../apiConfig";
import { ILoginData, IRegisterData } from "../types";

const apiUsers = {
  login: async (data: ILoginData) => {
    const response = await axiosClient.post("/login", data);
    return response.data;
  },

  register: async (data: IRegisterData) => {
    const response = await axiosClient.post("/register", data);
    return response.data;
  },
};

export { apiUsers };
