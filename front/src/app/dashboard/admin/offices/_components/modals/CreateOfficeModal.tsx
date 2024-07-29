"use client";
import { Button } from "@/components/common/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/common/dialog";
import { useState } from "react";
import { CreateOfficeForm } from "../CreateOfficeForm";

const CardAdd = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button
        variant="primary"
        className="ml-4"
        onClick={() => setIsModalOpen(true)}
      >
        Agregar oficina
      </Button>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="font-sans bg-background text-white border-secondaryDark">
          <DialogHeader>
            <DialogTitle>Añadir</DialogTitle>
            <DialogDescription className="text-secondary text-md pb-5">
              Añade los siguientes datos para agregar un nuevo espacio.
            </DialogDescription>
          </DialogHeader>
          <CreateOfficeForm />
        </DialogContent>
      </Dialog>
    </>
  );
};

export { CardAdd };
