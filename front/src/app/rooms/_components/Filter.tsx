"use client";

import { Button } from "@/components/common/Button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../../components/common/Sheet";
import { ChevronDownIcon } from "lucide-react";
import { Formik, Form } from "formik";
import { Checkbox } from "@/components/common/checkbox";
import { create } from "zustand";

interface IFilter {
  filters: {
    services: string[];
    location: string[];
  };
  setFilters: (filters: { services: string[]; location: string[] }) => void;
}

const useFilterStore = create<IFilter>((set) => ({
  filters: {
    services: [],
    location: [],
  },
  setFilters: (filters) => set({ filters }),
}));

const amenitiesOptions: string[] = [
  "Internet",
  "Cafe",
  "Gimnasio",
  "Estacionamiento",
  "Zona de descanso",
  "Sala de conferencias",
  "Acceso a transporte publico",
];

const locationOptions: string[] = ["México", "Perú", "Colombia", "Argentina"];

const Filter = ({ onFilter }: any) => {
  const { filters, setFilters } = useFilterStore();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div>
          <Button variant="primary">
            Mostrar filtros
            <ChevronDownIcon />
          </Button>
        </div>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="bg-background border-primary text-white font-sans"
      >
        <SheetHeader>
          <SheetTitle className="text-primary text-2xl text-center">
            Filtros
          </SheetTitle>
          <SheetDescription className="text-white text-md text-center">
            Selecciona los filtros que deseas aplicar para encontrar las mejores
            opciones.
          </SheetDescription>
        </SheetHeader>

        <Formik
          initialValues={filters}
          onSubmit={(values) => {
            setFilters(values);
            onFilter(values);
          }}
        >
          {({ values }) => (
            <Form className="p-4 pt-14">
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">
                  Servicios/Comodidades
                </h3>
                {amenitiesOptions.map((amenity) => (
                  <label key={amenity} className="flex gap-2 items-center mb-3">
                    <Checkbox
                      name="services"
                      value={amenity}
                      className="border-primary"
                      type="submit"
                    />
                    <div className="">{amenity}</div>
                  </label>
                ))}
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Países</h3>
                {locationOptions.map((location) => (
                  <label
                    key={location}
                    className="flex gap-2 items-center mb-3"
                  >
                    <Checkbox
                      name="location"
                      value={location}
                      className="border-primary"
                      type="submit"
                    />

                    <div>{location}</div>
                  </label>
                ))}
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button type="submit" variant="primary" className="w-full">
                    Aplicar filtros
                  </Button>
                </SheetClose>
              </SheetFooter>
            </Form>
          )}
        </Formik>
      </SheetContent>
    </Sheet>
  );
};

export default Filter;
