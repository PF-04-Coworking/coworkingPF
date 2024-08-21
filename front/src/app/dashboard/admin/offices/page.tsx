"use client";

import { CardAdd } from "./_components/modals/CreateOfficeModal";
import { CardOffice } from "./_components/CardOffice";
import { TextInput } from "@/components/common/TextInput";
import { SearchIcon } from "lucide-react";
import { DashboardLayout } from "../../_components/dashboard-layout/DashboardLayout";
import { ADMIN_LINKS } from "../../user/links";
import { useState } from "react";
import { useOffices } from "@/hooks/useOffices";
import { IFilters } from "@/app/rooms/types";
import { useRedirectAdminHook } from "../../_hooks/useRedirectAdminHook";

const DashboardOffices = () => {
  const [filters] = useState<IFilters>({
    services: [],
    location: [],
  });
  const { offices } = useOffices({
    page: 1,
    limit: 100,
    ...filters,
  });
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const searchedOffices = offices.filter(
    (office) =>
      office.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      office.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useRedirectAdminHook();

  return (
    <DashboardLayout headerTitle="Gestionar oficinas" navLinks={ADMIN_LINKS}>
      <div className="flex justify-between">
        <div className="relative w-full">
          <TextInput
            type="search"
            placeholder="Buscar oficinas..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full py-2 focus:outline-none text-white"
          />
          <SearchIcon
            size={20}
            className="text-white absolute right-4 top-3.5"
          />
        </div>
        <CardAdd />
      </div>
      <div className="w-full 2xl:grid-cols-3 grid gap-10 md:grid-cols-2 grid-cols-1 pb-8">
        {searchedOffices.map((office, index) => (
          <CardOffice
            key={index}
            id={office.id}
            name={office.name}
            location={office.location}
            capacity={office.capacity}
            price={office.price}
            description={office.description}
            details={office.details}
            imgUrl={office.imgUrl}
            services={office.services}
            is_active={office.is_active}
          />
        ))}
      </div>
    </DashboardLayout>
  );
};

export default DashboardOffices;
