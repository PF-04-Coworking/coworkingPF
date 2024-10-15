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
  is_active: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

DialogButton.displayName = "DialogButton";

const DeactivateOffice = ({ officeId, is_active, setIsModalOpen }: IProps) => {
  const [open, setOpen] = useState(false);
  const { authToken } = useAuthStore();
  const { toggleActivateOffice } = useOfficesStore();

  const handleDeactivateOffice = async () => {
    if (!authToken) return;
    if (!is_active) {
      const promise = apiOffices.activateOffice(officeId, authToken);
      toast.promise(promise, {
        pending: "Activando...",
        success: "Oficina activada exitosamente",
        error: "Error",
      });
      await promise;
      toggleActivateOffice(officeId);
      setOpen(false);
    } else {
      const promise = apiOffices.deactivateOffice(officeId, authToken);
      toast.promise(promise, {
        pending: "Desactivando...",
        success: "Oficina desactivada exitosamente",
        error: "Error",
      });
      await promise;
      toggleActivateOffice(officeId);
      setOpen(false);
    }
    setIsModalOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild className="w-1/2">
        {is_active ? (
          <DialogButton variant="destructive">Desactivar</DialogButton>
        ) : (
          <DialogButton variant="outline">Activar</DialogButton>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-background text-white border-secondaryDark">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl">
            ¿Estás seguro?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-secondary text-md pb-5">
            {is_active ? (
              <span>
                Al desactivarse la oficina, esta no estará disponible para el
                público.
              </span>
            ) : (
              <span>
                Al activarse la oficina, esta estará disponible para el público
                nuevamente.
              </span>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex justify-center gap-4 mx-auto">
          <AlertDialogCancel asChild>
            {is_active ? (
              <DialogButton variant="outline">Mantener activa</DialogButton>
            ) : (
              <DialogButton variant="outline">Mantener inactiva</DialogButton>
            )}
          </AlertDialogCancel>
          {is_active ? (
            <DialogButton
              variant="destructive"
              onClick={handleDeactivateOffice}
            >
              Desactivar oficina
            </DialogButton>
          ) : (
            <DialogButton variant="primary" onClick={handleDeactivateOffice}>
              Activar oficina
            </DialogButton>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export { DeactivateOffice };
