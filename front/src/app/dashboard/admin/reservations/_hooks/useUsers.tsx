import { useEffect, useState } from "react";
import { useAuthStore } from "@/app/(auth)/stores/useAuthStore";
import { IUserData } from "@/app/dashboard/types";
import { apiUsers } from "@/lib/api/users/apiUsers";
import { useUsersStore } from "../../account/_stores/useUsersStore";

const useUsers = ({ searchTerm }: { searchTerm: string }) => {
  const { users, setUsers } = useUsersStore();
  const { authToken } = useAuthStore();

  useEffect(() => {
    const getUsers = async () => {
      if (!authToken) return;
      const response = await apiUsers.getUsers(authToken, searchTerm);
      setUsers(response);
    };

    getUsers();
  }, [authToken, searchTerm, setUsers]);

  return { users };
};

export { useUsers };
