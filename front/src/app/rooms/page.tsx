"use client";

import { TextInput } from "@/components/common/TextInput";
import { Header } from "../_page/_components/HeaderSection";
import { SearchIcon } from "lucide-react";
import CardOffice from "@/components/dashboard/cardOffice";
import Sort from "./_components/Sort";
import Filter from "./_components/Filter";
import { useState } from "react";
import { IFilters } from "./types";
import { Heading } from "@/components/common/Heading";
import { useOfficesStore } from "@/stores/useOfficesStore";
import { useOffices } from "@/hooks/useOffices";
import { FooterSection } from "@/components/FooterSection";

const Rooms = () => {
  const [sortOption, setSortOption] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<IFilters>({
    services: [],
    location: [],
  });
  const { offices } = useOffices({
    page: 1,
    limit: 100,
    ...filters,
  });

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
      case "Precio Alto":
        return parseInt(b.price) - parseInt(a.price);
      case "Precio Bajo":
        return parseInt(a.price) - parseInt(b.price);
      case "Capacidad Alta":
        return parseInt(b.capacity) - parseInt(a.capacity);
      case "Capacidad Baja":
        return parseInt(a.capacity) - parseInt(b.capacity);
      default:
        return 0;
    }
  });

  return (
    <div
      className="h-full min-h-screen bg-no-repeat bg-top bg-contain"
      style={{ backgroundImage: "url(/images/fondo-1.png)" }}
    >
      <Header />
      <div className="layout pt-32 pb-8">
        <div className="flex justify-between mb-4">
          <div className="lg:flex hidden ">
            <Heading level="3">Encuentra tu espacio favorito</Heading>
          </div>
          <div className="md:flex md:gap-5 md:flex-row flex-col gap-5 flex">
            <div className="flex gap-5 ">
              <Filter onFilter={handleFilter} />
              <Sort onSort={handleSort} />
            </div>
            <div className="relative">
              <TextInput
                type="search"
                placeholder="Buscar oficinas..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-[20rem] border-gradient py-2 focus:outline-none text-white text-[1.1rem]"
              />
              <SearchIcon
                size={20}
                className="text-white absolute right-4 top-2"
              />
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-8">
          {sortedOffices.map((office, index) => (
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
          ))}
        </div>
      </div>
      <FooterSection />
    </div>
  );
};

export default Rooms;
