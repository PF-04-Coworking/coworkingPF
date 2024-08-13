"use client";

import React from "react";
import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/common/AlertDialog";
import { Button, IButtonProps } from "@/components/common/Button";
import { useAuthStore } from "@/app/(auth)/stores/useAuthStore";

interface IDialogButtonProps extends IButtonProps {}

const DialogButton = React.forwardRef<HTMLButtonElement, IDialogButtonProps>(
  ({ className, variant, ...props }, ref) => (
    <Button ref={ref} variant={variant} className={className} {...props}>
      {props.children}
    </Button>
  )
);

DialogButton.displayName = "DialogButton";

const Logout = () => {
  const router = useRouter();
  const { removeAuthToken, removeUserData } = useAuthStore();

  const handleLogOut = () => {
    removeAuthToken();
    removeUserData();
    toast.info("Sesión cerrada");
    router.push("/");
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DialogButton variant="outline" className="flex gap-x-2">
          <LogOutIcon size={16} />
          Cerrar sesión
        </DialogButton>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-background text-white border-secondaryDark">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl">
            ¿Estás seguro?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-secondary text-md pb-5">
            Cerraras sesión y podrás volver a iniciar sesión en cualquier
            momento.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mx-auto">
          <AlertDialogCancel asChild>
            <DialogButton variant="primary">Cancelar</DialogButton>
          </AlertDialogCancel>
          <DialogButton variant="destructive" onClick={handleLogOut}>
            <span>Continuar</span>
          </DialogButton>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export { Logout };
