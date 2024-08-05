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
    <div className="flex-shrink-0">
      <Button
        variant="primary"
        className="ml-4"
        onClick={() => setIsModalOpen(true)}
      >
        Agregar oficina
      </Button>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="font-sans bg-background text-white border-secondaryDark max-h-[90%] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Añadir</DialogTitle>
            <DialogDescription className="text-secondary text-md pb-5">
              Añade los siguientes datos para agregar un nuevo espacio.
            </DialogDescription>
          </DialogHeader>
          <CreateOfficeForm />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export { CardAdd };
