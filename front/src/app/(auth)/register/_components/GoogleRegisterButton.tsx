"use client";

import { apiAuth } from "@/lib/api/auth/apiAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useAuthStore } from "../../stores/useAuthStore";
import { GoogleButton } from "../../_components/GoogleButton";
import { fetchGoogleUserInfo, getHashParam } from "../../helpers/googleHelpers";

const GoogleRegisterButton = () => {
  const router = useRouter();
  const { setAuthToken, setUserData } = useAuthStore();

  useEffect(() => {
    const accessToken = getHashParam("access_token");

    if (accessToken) {
      const promise = fetch(
        "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const handleRegister = async () => {
        const googleUserInfo = await fetchGoogleUserInfo(accessToken);
        const promise = apiAuth.googleRegister({
          name: googleUserInfo.given_name,
          lastname: googleUserInfo.family_name,
          email: googleUserInfo.email,
        });
        toast.promise(promise, {
          pending: "Cargando...",
          success: "Registro correcto",
          error: "Ya existe un usuario con ese correo",
        });
        const response = await promise;
        const { token, userNoPassword } = await apiAuth.googleLogin({
          email: response.email,
        });
        setAuthToken(token);
        setUserData(userNoPassword);
        router.push("/rooms");
      };

      handleRegister();
    }
  }, []);

  return <GoogleButton redirectRoute="/register" />;
};

export { GoogleRegisterButton };
