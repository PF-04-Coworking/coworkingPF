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
import { FilterIcon } from "lucide-react";
import { Formik, Form } from "formik";
import { Checkbox } from "@/components/common/Checkbox";
import { servicesOptions } from "@/lib/constants/servicesOptions";
import { locationOptions } from "@/lib/constants/locationOptions";
import { useFilterStore } from "../_store/useFilterStore";
import { Paragraph } from "@/components/common/Paragraph";
import { Heading } from "@/components/common/Heading";
import { InputLabel } from "@/components/common/InputLabel";

const Filter = ({ onFilter }: any) => {
  const { filters, setFilters } = useFilterStore();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          Filtros
          <FilterIcon size={16} />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="bg-background border-background text-white p-8 space-y-8"
      >
        <SheetHeader className="space-y-4">
          <SheetTitle className="text-left">
            <Heading level="3">Filtros</Heading>
          </SheetTitle>
          <SheetDescription className="text-left text-md">
            <Paragraph variant="secondary">
              Selecciona los filtros que deseas aplicar para encontrar las
              mejores opciones.
            </Paragraph>
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
            <Form className="space-y-8">
              <InputLabel>Servicios / comodidades</InputLabel>
              <div className="space-y-4">
                {servicesOptions.map((service) => (
                  <label
                    key={service}
                    className="flex items-center gap-4 text-sm"
                  >
                    <Checkbox
                      name="services"
                      value={service}
                      className="border-primary"
                      type="submit"
                    />
                    {service}
                  </label>
                ))}
              </div>
              <InputLabel>Países</InputLabel>
              <div className="space-y-4">
                {locationOptions.map((location) => (
                  <label
                    key={location}
                    className="flex items-center gap-4 text-sm"
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

export { Filter };
