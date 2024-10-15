import { useAuthStore } from "@/app/(auth)/stores/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const useRedirectAdminHook = () => {
  const { userData } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!userData || userData?.role === "user") router.push("/");
  }, [userData, router]);
};

export { useRedirectAdminHook };
