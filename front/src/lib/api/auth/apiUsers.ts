import { axiosClient } from "../apiConfig";
import { ILoginData, IRegisterData } from "../types";

const apiUsers = {
  login: async (data: ILoginData) => {
    const response = await axiosClient.post("/user/login", data);
    return response.data;
  },

  register: async (data: IRegisterData) => {
    const response = await axiosClient.post("/user/register", data);
    return response.data;
  },
};

export { apiUsers };
