"use client";

import { TextInput } from "@/components/common/TextInput";
import { Header } from "../_page/_components/HeaderSection";
import { SearchIcon } from "lucide-react";
import CardOffice from "@/components/dashboard/cardOffice";
import Sort from "./_components/Sort";
import { Paragraph } from "@/components/common/Paragraph";
import Filter from "./_components/Filter";
import { useState } from "react";
import { useOfficesRoomsStore } from "./_store/useStoreFilterOffice";
import { useFetchAllOffices } from "./hooks/useFetchAllOffices";
import { useFetchFilteredOffices } from "./hooks/useFetchFilteredOffices";
import { IFilters } from "./types";

const page = 1;
const limit = 100;

const Rooms = () => {
  const { offices } = useOfficesRoomsStore();
  const [sortOption, setSortOption] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<IFilters>({
    services: [],
    location: [],
  });

  useFetchFilteredOffices(filters, page, limit);
  useFetchAllOffices();

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
    <>
      <Header />

      <div className="font-sans max-w-[98.75rem] mx-auto py-20 pt-32 w-[88%] ">
        <div className="flex justify-between mb-4">
          <div className="lg:flex hidden ">
            <Paragraph variant="primary" className="font-semibold text-3xl">
              Encuentra tu espacio favorito
            </Paragraph>
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

        <div className="w-full lg:grid-cols-3 grid gap-10 md:grid-cols-2 grid-cols-1">
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
    </>
  );
};

export default Rooms;
