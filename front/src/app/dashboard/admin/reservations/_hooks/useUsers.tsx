import { useEffect, useState } from "react";
import { useAuthStore } from "@/app/(auth)/stores/useAuthStore";
import { IUserData } from "@/app/dashboard/types";
import { apiUsers } from "@/lib/api/users/apiUsers";

const useUsers = ({ searchTerm }: { searchTerm: string }) => {
  const [users, setUsers] = useState<IUserData[]>([]);
  const { authToken } = useAuthStore();

  useEffect(() => {
    const getUsers = async () => {
      if (!authToken) return;
      const response = await apiUsers.getUsers(authToken, searchTerm);
      setUsers(response);
    };

    getUsers();
  }, [authToken]);

  return { users };
};

export { useUsers };
