"use client";

import { TextInput } from "@/components/common/TextInput";
import { Header } from "../_page/_components/HeaderSection";
import { SearchIcon } from "lucide-react";
import { Sort } from "./_components/Sort";
import { Filter } from "./_components/Filter";
import { useState } from "react";
import { IFilters } from "./types";
import { Heading } from "@/components/common/Heading";
import { useOffices } from "@/hooks/useOffices";
import { FooterSection } from "@/components/FooterSection";
import { sortOptions } from "@/lib/constants/sortOfficesOptions";
import { CardOffice } from "@/components/dashboard/CardOfficex";
import { useEffect } from "react";

const Rooms = () => {
  const [sortOption, setSortOption] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<IFilters>({
    services: [],
    location: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const { offices } = useOffices({
    page: 1,
    limit: 100,
    ...filters,
  });

  useEffect(() => {
    // Simula la carga de datos
    setIsLoading(true);
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Asumiendo que la carga toma 1 segundo, ajusta según sea necesario

    return () => clearTimeout(timeoutId);
  }, [offices]);

  const handleSort = (option: string) => {
    setSortOption(option);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleFilter = (filterValues: IFilters) => {
    setFilters(filterValues);
  };

  const filteredAndSearchedOffices = offices.filter((office) => {
    const name = office.name.toLowerCase();
    const description = office.description.toLowerCase();
    return (
      name.includes(searchTerm.toLowerCase()) ||
      description.includes(searchTerm.toLowerCase())
    );
  });

  const sortedOffices = [...filteredAndSearchedOffices].sort((a, b) => {
    switch (sortOption) {
      case "priceDesc":
        return parseInt(b.price) - parseInt(a.price);
      case "priceAsc":
        return parseInt(a.price) - parseInt(b.price);
      case "capacityDesc":
        return parseInt(b.capacity) - parseInt(a.capacity);
      case "capacityAsc":
        return parseInt(a.capacity) - parseInt(b.capacity);
      default:
        return 0;
    }
  });

  return (
    <div
      className="bg-no-repeat bg-cover h-[210vh]" 
      style={{ backgroundImage: "url(/images/fondo-1.png)" }}
    >
      <Header />
      <div className="layout pt-32 pb-8 space-y-12">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
          <Heading level="3">Encuentra tu espacio favorito</Heading>
          <div className="flex flex-col lg:flex-row gap- w-full lg:w-auto gap-4">
            <div className="flex gap-5 ">
              <Filter onFilter={handleFilter} />
              <Sort onSort={handleSort} sortOptions={sortOptions} />
            </div>
            <div className="relative">
              <TextInput
                type="search"
                placeholder="Buscar oficinas..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full min-w-72"
              />
              <SearchIcon
                size={20}
                className="text-white absolute right-4 top-3"
              />
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-8">
          {isLoading ? (
            <div className="flex-col gap-4 w-full flex items-center justify-center h-[50vh]">
              <div className="w-20 h-20 border-4 border-transparent text-primary text-4xl animate-spin flex items-center justify-center border-t-primary rounded-full">
                <div className="w-16 h-16 border-4 border-transparent text-primary text-2xl animate-spin flex items-center justify-center border-t-primary rounded-full"></div>
              </div>
            </div>
          ) : (
            sortedOffices.map((office, index) => (
              <CardOffice
                key={index}
                id={office.id}
                imgUrl={office.imgUrl}
                name={office.name}
                description={office.description}
                capacity={office.capacity}
                price={office.price}
                services={office.services}
                location={office.location}
              />
            ))
          )}
        </div>
      </div>
      <FooterSection />
    </div>
  );
};

export default Rooms;
