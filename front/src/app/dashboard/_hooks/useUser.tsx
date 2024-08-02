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
      console.log("authToken", authToken);
      if (!authToken) return;
      const decodedToken = jwtDecode<IJwtData>(authToken);
      const userData = await apiUsers.getUserData(decodedToken.id);
      setUserData(userData);
    };

    fetchUserData();
  }, []);

  return { userData };
};

export { useUser };
