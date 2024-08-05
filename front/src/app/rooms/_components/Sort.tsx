"use client";
import { Button } from "@/components/common/Button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/common/popover";
import { ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { Command } from "@/components/common/command";

const Sort = ({ onSort }: { onSort: (option: string) => void }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const selectedFramework = value;

  const handleSort = (option: string) => {
    setValue(option);
    onSort(option);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div>
          <Button variant="primary">
            {selectedFramework
              ? `Ordenar por: ${selectedFramework}`
              : "Ordenar por:"}
            <ChevronsUpDown />
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-58 bg-background border-primary">
        <div className="flex flex-col gap-3">
          <Command>
            <div className="flex flex-col gap-3 bg-background">
              <Button
                variant="primary"
                value="next.js"
                onClick={() => handleSort("Precio Alto")}
              >
                Precio: Alto-Bajo
              </Button>
              <Button
                variant="primary"
                value="next.js"
                onClick={() => handleSort("Precio Bajo")}
              >
                Precio: Bajo-Alto
              </Button>
              <Button
                variant="primary"
                value="next.js"
                onClick={() => handleSort("Capacidad Alta")}
              >
                Capacidad: Alto-Bajo
              </Button>
              <Button
                variant="primary"
                value="next.js"
                onClick={() => handleSort("Capacidad Baja")}
              >
                Capacidad: Bajo-Alto
              </Button>
            </div>
          </Command>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Sort;
