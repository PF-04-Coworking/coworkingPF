import { useAuthStore } from "@/app/(auth)/stores/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const useRedirectUserHook = () => {
  const { userData } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!userData) router.push("/");
  }, [userData, router]);
};

export { useRedirectUserHook };
