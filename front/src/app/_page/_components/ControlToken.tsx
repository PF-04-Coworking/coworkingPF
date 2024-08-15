"use client";

import Link from "next/link";
import { useAuthStore } from "@/app/(auth)/stores/useAuthStore";
import { CircleUserRound } from "lucide-react";
import { Paragraph } from "@/components/common/Paragraph";
import { useEffect, useState } from "react";
import { useUser } from "@/hooks/useUser";
import { Button } from "@/components/common/Button";

const ControlToken = () => {
  const { userData } = useAuthStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const dashboardLink =
    userData?.role === "admin"
      ? "/dashboard/admin/account"
      : "/dashboard/user/account";

  if (!isMounted) return null;

  return (
    <>
      {userData?.name ? (
        <div className="items-center gap-x-4 hidden sm:flex">
          <Link href={dashboardLink} className="flex items-center gap-x-2">
            <Paragraph
              variant="primary"
              className="!text-primary font-semibold"
            >
              {userData?.name}
            </Paragraph>
            <CircleUserRound size={35} className="text-primary" />
          </Link>
        </div>
      ) : (
        <>
          <Link href="/login">
            <Button variant="outline" className="w-full">
              Iniciar sesión
            </Button>
          </Link>
          <Link href="/register">
            <Button variant="primary" className="w-full">
              Registrarse
            </Button>
          </Link>
        </>
      )}
    </>
  );
};

export { ControlToken };
