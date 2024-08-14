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
import { useReservationsStore } from "../_stores/useReservationsStore";
import { apiReservations } from "@/lib/api/reservations/apiReservations";

interface IDialogButtonProps extends IButtonProps {}

const DialogButton = React.forwardRef<HTMLButtonElement, IDialogButtonProps>(
  ({ className, variant, ...props }, ref) => (
    <Button ref={ref} variant={variant} className={className} {...props}>
      {props.children}
    </Button>
  )
);

DialogButton.displayName = "DialogButton";

const CancelReservation = ({ reservationId }: { reservationId: string }) => {
  const [open, setOpen] = useState(false);
  const { authToken } = useAuthStore();
  const { cancelReservation } = useReservationsStore();

  const handleCancelReservation = async () => {
    if (!authToken) return;
    const promise = apiReservations.cancelReservation(authToken, reservationId);
    toast.promise(promise, {
      pending: "Cancelando...",
      success: "Reserva cancelada exitosamente",
      error: "Error",
    });
    await promise;
    cancelReservation(reservationId);
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild className="w-1/2">
        <DialogButton variant="destructive">Cancelar reserva</DialogButton>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-background text-white border-secondaryDark">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl">
            ¿Estás seguro?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-secondary text-md pb-5">
            La reserva será cancelada y no podrá volver a activarse.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex justify-center gap-4 mx-auto">
          <AlertDialogCancel asChild>
            <DialogButton variant="outline">Mantener activa</DialogButton>
          </AlertDialogCancel>
          <DialogButton variant="destructive" onClick={handleCancelReservation}>
            Cancelar reserva
          </DialogButton>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export { CancelReservation };
