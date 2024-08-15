import { useAuthStore } from "@/app/(auth)/stores/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const useRedirectHook = () => {
  const { userData } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (userData?.role === "user") router.push("/");
  }, [userData, router]);
};

export { useRedirectHook };
