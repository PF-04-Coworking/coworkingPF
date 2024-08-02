import { IUserData } from "@/app/dashboard/types";
import { axiosClient } from "../apiConfig";

const apiUsers = {
  getUserData: async (userId: string) => {
    const response = await axiosClient.get(`/user/${userId}`);
    return response.data;
  },

  updateUser: async (userId: string, userData: IUserData) => {
    const response = await axiosClient.put(`/user/${userId}`, userData);
    return response.data;
  },
};

export { apiUsers };
