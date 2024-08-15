import { IUserData } from "@/app/dashboard/types";
import { axiosClient } from "../apiConfig";
import { IContactData } from "@/types/types";

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

  deactivateUser: async (userId: string, accessToken: string) => {
    return await axiosClient.put(
      `/user/deactivate/${userId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  },

  activateUser: async (userId: string, accessToken: string) => {
    console.log("activateUser", userId, accessToken);
    return await axiosClient.put(
      `/user/activate/${userId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  },

  contactMessage: async (formData: IContactData) => {
    return await axiosClient.post(`/user/contact/form`, formData);
  },
};

export { apiUsers };
