"use client";

import React, { useState } from "react";
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
import { useOfficesStore } from "@/stores/useOfficesStore";
import { apiOffices } from "@/lib/api/offices/apiOffices";

interface IDialogButtonProps extends IButtonProps {}

const DialogButton = React.forwardRef<HTMLButtonElement, IDialogButtonProps>(
  ({ className, variant, ...props }, ref) => (
    <Button ref={ref} variant={variant} className={className} {...props}>
      {props.children}
    </Button>
  )
);

interface IProps {
  officeId: string;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

DialogButton.displayName = "DialogButton";

const DeleteOffice = ({ officeId, setIsModalOpen }: IProps) => {
  const [open, setOpen] = useState(false);
  const { authToken } = useAuthStore();
  const { removeStoredOffice } = useOfficesStore();

  const handleDeleteOffice = async () => {
    if (!authToken) return;
    const promise = apiOffices.deleteOffice(officeId, authToken);
    toast.promise(promise, {
      pending: "Cancelando...",
      success: "Reserva cancelada exitosamente",
      error: "Error",
    });
    await promise;
    removeStoredOffice(officeId);
    setOpen(false);
    setIsModalOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild className="w-1/2">
        <DialogButton variant="destructive">Eliminar</DialogButton>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-background text-white border-secondaryDark">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl">
            ¿Estás seguro?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-secondary text-md pb-5">
            La oficina será eliminada y no podrá recuperarse.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex justify-center gap-4 mx-auto">
          <AlertDialogCancel asChild>
            <DialogButton variant="outline">Mantener oficina</DialogButton>
          </AlertDialogCancel>
          <DialogButton variant="destructive" onClick={handleDeleteOffice}>
            Eliminar reserva
          </DialogButton>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export { DeleteOffice };
