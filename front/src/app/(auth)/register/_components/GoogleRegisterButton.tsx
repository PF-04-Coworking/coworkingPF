"use client";

import { apiAuth } from "@/lib/api/auth/apiAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuthStore } from "../../stores/useAuthStore";
import { GoogleButton } from "../../_components/GoogleButton";
import { getHashParam } from "../../helpers/googleHelpers";

const GoogleRegisterButton = () => {
  const router = useRouter();
  const { setAuthToken, setUserData } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const accessToken = getHashParam("access_token");

    if (!accessToken) {
      return;
    }

    const handleRegister = async () => {
      setIsLoading(true);
      const promise = apiAuth.googleRegister({ accessToken });
      toast.promise(promise, {
        pending: "Cargando...",
        success: "Registro correcto",
        error: "Ya existe un usuario con ese correo",
      });
      await promise;
      const { token, user } = await apiAuth.googleLogin({
        accessToken,
      });
      setAuthToken(token);
      setUserData(user);
      router.push("/rooms");
    };

    handleRegister();
  }, [router, setAuthToken, setUserData]);

  return (
    <GoogleButton
      redirectRoute="/register"
      text="Registrarse con Google"
      disabled={isLoading}
    />
  );
};

export { GoogleRegisterButton };
