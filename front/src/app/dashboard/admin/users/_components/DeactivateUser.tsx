import React, { useState } from "react";
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
import { UserCheck, UserX } from "lucide-react";
import { Tooltip } from "@/components/common/Tooltip";
import { useAuthStore } from "@/app/(auth)/stores/useAuthStore";
import { apiUsers } from "@/lib/api/users/apiUsers";
import { toast } from "react-toastify";
import { useUsersStore } from "../../account/_stores/useUsersStore";

interface IProps {
  userId: string;
  is_active: boolean;
}

interface IDialogButtonProps extends IButtonProps {}

const DialogButton = React.forwardRef<HTMLButtonElement, IDialogButtonProps>(
  ({ className, variant, ...props }, ref) => (
    <Button ref={ref} variant={variant} className={className} {...props}>
      {props.children}
    </Button>
  )
);

DialogButton.displayName = "DialogButton";

const DeactivateUser = ({ userId, is_active }: IProps) => {
  const [open, setOpen] = useState(false);
  const { authToken } = useAuthStore();
  const { toggleActivateUser } = useUsersStore();

  const handleToggleActivateUser = async () => {
    if (!authToken) return;
    if (!is_active) {
      const promise = apiUsers.activateUser(userId, authToken);
      toast.promise(promise, {
        pending: "Activando...",
        success: "Usuario activado exitosamente",
        error: "Error",
      });
      await promise;
    } else {
      const promise = apiUsers.deactivateUser(userId, authToken);
      toast.promise(promise, {
        pending: "Desactivando...",
        success: "Usuario desactivado exitosamente",
        error: "Error",
      });
      await promise;
    }
    toggleActivateUser(userId);
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <DialogButton variant="outline">
          {is_active ? (
            <Tooltip text="Desactivar usuario">
              <UserX size={16} className="text-red-400" />
            </Tooltip>
          ) : (
            <Tooltip text="Activar usuario">
              <UserCheck size={16} />
            </Tooltip>
          )}
        </DialogButton>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-background text-white border-secondaryDark">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl">
            ¿Estás seguro?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-secondary text-md pb-5">
            {is_active
              ? "El usuario no podrá iniciar sesión si se desactiva."
              : "El usuario podrá iniciar sesión si se activa nuevamente."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mx-auto">
          <AlertDialogCancel asChild>
            <DialogButton variant="primary">Cancelar</DialogButton>
          </AlertDialogCancel>
          <DialogButton
            variant="destructive"
            onClick={handleToggleActivateUser}
          >
            <span>Continuar</span>
          </DialogButton>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export { DeactivateUser };
