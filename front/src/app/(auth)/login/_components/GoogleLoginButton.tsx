"use client";

import { apiAuth } from "@/lib/api/auth/apiAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useAuthStore } from "../../stores/useAuthStore";
import { GoogleButton } from "../../_components/GoogleButton";
import { getHashParam } from "../../helpers/googleHelpers";

const GoogleLoginButton = () => {
  const router = useRouter();
  const { setAuthToken, setUserData } = useAuthStore();

  useEffect(() => {
    const accessToken = getHashParam("access_token");

    if (!accessToken) {
      return;
    }

    const handleLogin = async () => {
      const promise = apiAuth.googleLogin({ accessToken });
      toast.promise(promise, {
        pending: "Cargando...",
        success: "Sesión iniciada",
        error: "Credenciales incorrectas",
      });
      const response = await promise;
      const { token, user } = response;
      setAuthToken(token);
      setUserData(user);
      router.push("/rooms");
    };

    handleLogin();
  }, []);

  return (
    <GoogleButton redirectRoute="/login" text="Iniciar sesión con Google" />
  );
};

export { GoogleLoginButton };
