import { IUserData } from "@/app/dashboard/types";
import { axiosClient } from "../apiConfig";

const apiUsers = {
  getUsers: async (accessToken: string, searchTerm: string) => {
    const response = await axiosClient.get("/user/all", {
      params: {
        search: searchTerm,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  },

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
