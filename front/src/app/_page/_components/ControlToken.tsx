"use client";

import Link from "next/link";
import { useAuthStore } from "@/app/(auth)/stores/useAuthStore";
import { CircleUserRound } from "lucide-react";
import { Paragraph } from "@/components/common/Paragraph";
import { useEffect, useState } from "react";
import { useUser } from "@/app/dashboard/_hooks/useUser";

const ControlToken = () => {
  const { userData } = useUser();
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
          <Link
            href="/login"
            className="inline-flex items-center justify-center font-medium rounded-md focus:outline-none px-4 py-2  text-sm border border-primary bg-transparent hover:text-primary text-white"
          >
            Iniciar Sesión
          </Link>

          <Link
            href="/register"
            className="inline-flex items-center justify-center font-medium rounded-md focus:outline-none px-4 py-2 text-sm border border-primary hover:border-primaryDark bg-primary text-white hover:bg-primaryDark  disabled:bg-opacity-30 border-opacity-30 disabled:cursor-not-allowed"
          >
            Registrarse
          </Link>
        </>
      )}
    </>
  );
};

export { ControlToken };
