"use client";
import { Paragraph } from "@/components/common/Paragraph";
import { CircleUserRound } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const ControlToken = () => {
  const [token, setToken] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("userSession");
    setToken(token);
  }, []);

  return (
    <>
      {token ? (
        <div className="items-center gap-x-4 hidden sm:flex">
            <Link href={"/dashboard/admin/account"} className="!text-primary font-medium">
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
