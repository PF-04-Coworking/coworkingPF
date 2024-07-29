"use client";

import { Button } from "@/components/common/Button";
import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "../../../components/common/alert-dialog";


const Logout = () => {
    const router = useRouter();
    const handleLogOut = () => {
      localStorage.removeItem("userSession");
      toast.info("Sesión cerrada");
      router.push("/");
    };
  return (
    <>
 



      <AlertDialog>
      <AlertDialogTrigger asChild>
      <Button variant="outline" className="flex gap-x-2">
        <LogOutIcon size={16} />
        Cerrar sesión
      </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-background text-white border-secondaryDark">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl">¿Estás seguro?</AlertDialogTitle>
          <AlertDialogDescription className="text-secondary text-md pb-5">
            Cerraras sesión y podrás volver a iniciar sesión en cualquier momento.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
            <AlertDialogCancel><Button variant="primary" className="w-full">Cancelar</Button></AlertDialogCancel>
          
          <Button variant="primary" onClick={handleLogOut} className="bg-red-500 hover:bg-red-700">Continuar</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

    </>
  );
};

export { Logout };
