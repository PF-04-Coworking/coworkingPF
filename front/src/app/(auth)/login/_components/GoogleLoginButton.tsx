"use client";

import { apiAuth } from "@/lib/api/auth/apiAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useAuthStore } from "../../stores/useAuthStore";
import { GoogleButton } from "../../_components/GoogleButton";
import axios from "axios";
import { fetchGoogleUserInfo, getHashParam } from "../../helpers/googleHelpers";

const GoogleLoginButton = () => {
  const router = useRouter();
  const { setAuthToken, setUserData } = useAuthStore();

  useEffect(() => {
    const accessToken = getHashParam("access_token");

    if (!accessToken) {
      console.error("Access token not found");
      return;
    }

    const handleLogin = async () => {
      const googleUserInfo = await fetchGoogleUserInfo(accessToken);

      const promise = apiAuth.googleLogin({
        email: googleUserInfo.email,
      });
      toast.promise(promise, {
        pending: "Cargando...",
        success: "Sesión iniciada",
        error: "Credenciales incorrectas",
      });
      const response = await promise;
      const { token, userNoPassword } = response;

      setAuthToken(token);
      setUserData(userNoPassword);
      router.push("/rooms");
    };

    handleLogin();
  }, []);

  return <GoogleButton redirectRoute="/login" />;
};

export { GoogleLoginButton };
