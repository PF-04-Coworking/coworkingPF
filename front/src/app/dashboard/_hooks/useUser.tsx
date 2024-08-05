import { useAuthStore } from "@/app/(auth)/stores/useAuthStore";
import { useEffect } from "react";
import { apiUsers } from "@/lib/api/users/apiUsers";
import { jwtDecode } from "jwt-decode";

interface IJwtData {
  id: string;
  email: string;
  exp: number;
  iat: number;
  role: string;
  sub: string;
}

const useUser = () => {
  const { authToken, userData, setUserData } = useAuthStore();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!authToken) return;
      const decodedToken = jwtDecode<IJwtData>(authToken);
      try {
        const userData = await apiUsers.getUserData(decodedToken.id, authToken);
        setUserData(userData);
      } catch (error) {
        console.log("error", error);
        return;
      }
    };

    fetchUserData();
  }, [authToken, setUserData]);

  return { userData };
};

export { useUser };
