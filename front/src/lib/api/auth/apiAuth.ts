import { axiosClient } from "../apiConfig";
import { ILoginData, IRegisterData } from "../types";

const apiAuth = {
  login: async (data: ILoginData) => {
    const response = await axiosClient.post("/user/login", data);
    return response.data;
  },

  register: async (data: IRegisterData) => {
    const response = await axiosClient.post("/user/register", data);
    return response.data;
  },

  googleRegister: async (data: Partial<IRegisterData>) => {
    const response = await axiosClient.post("/user/google/register", data);
    return response.data;
  },

  googleLogin: async (data: Partial<ILoginData>) => {
    const response = await axiosClient.post("/user/google/login", data);
    return response.data;
  },
};

export { apiAuth };
