import { IUserData } from "@/app/dashboard/types";
import { axiosClient } from "../apiConfig";

const apiUsers = {
  getUserData: async (userId: string, accessToken: string) => {
    const response = await axiosClient.get(`/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  },

  updateUser: async (
    userId: string,
    userData: IUserData,
    accessToken: string
  ) => {
    const response = await axiosClient.put(`/user/${userId}`, userData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  },
};

export { apiUsers };
